import { useEffect, useState } from "react";
import {
  loadTodos,
  createTodo,
  deleteTodo,
  updateTodoCompleted,
} from "~/lib/todos.api";
import type { Todo } from "~/types/todo";

export function useTodos(userId: string | null) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  /* Load todos when user becomes available */
  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    loadTodos(userId)
      .then((data) => {
        if (!cancelled) {
          setTodos(data);
        }
      })
      .catch(() => {
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  /* Add a new todo */
  async function add(title: string, parentId: string | null) {
    if (!userId) return;
    if (!title.trim()) return;

    try {
      await createTodo(userId, title, parentId);

      // Reload todos to stay in sync with backend
      const data = await loadTodos(userId);
      setTodos(data);
      setTitle("");
    } catch (err) {
    
    }
  }

  /* Toggle completed state (optimistic UI + rollback) */
  async function toggle(id: string) {
    const current = todos.find((t) => t.id === id);
    if (!current) return;

    const nextCompleted = !current.completed;

    // optimistic UI update
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: nextCompleted } : t
      )
    );

    try {
      await updateTodoCompleted(id, nextCompleted);
    } catch (err) {
      // rollback on failure
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: current.completed } : t
        )
      );
    }
  }

  /* Delete a todo */
  async function remove(id: string) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
    }
  }

  return {
    todos,
    title,
    setTitle,
    add,
    toggle,
    remove,
  };
}
