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

  /* Load todos when user is available */
  useEffect(() => {
    if (!userId) return;


    loadTodos(userId)
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
      });
  }, [userId]);

  /* Add a new todo */
  async function add(title: string, parentId: string | null) {
    if (!userId || !title.trim()) return;


    try {
      await createTodo(userId, title, parentId);

      const data = await loadTodos(userId);

      setTodos(data);
      setTitle("");
    } catch (err) {
    }
  }

  /* Toggle completed state (UI + Appwrite) */
 async function toggle(id: string) {
  const current = todos.find(t => t.id === id);
  if (!current) return;

  const nextCompleted = !current.completed;

  

  // Update UI immediately
  setTodos(prev =>
    prev.map(t =>
      t.id === id ? { ...t, completed: nextCompleted } : t
    )
  );

  // Persist to Appwrite
  try {
    const res = await updateTodoCompleted(id, nextCompleted);
  } catch (err) {
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
