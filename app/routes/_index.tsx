import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import TodoItem from "~/components/TodoItem";
import { useTodos } from "~/hooks/useTodos";
import { useAuth } from "~/hooks/useAuth";
import { account } from "~/lib/appwrite.client";

import "~/styles/todos.css";

export default function HomePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Check Appwrite session on page load
  useEffect(() => {
    console.log("[HOME] checking session...");

    const timer = setTimeout(() => {
      account
        .get()
        .then((me) => {
          console.log("[HOME] session OK", me);
          setUserId(me.$id);
          setReady(true);
        })
        .catch((err) => {
          console.error("[HOME] NO SESSION", err);
          setReady(true);
          navigate("/login", { replace: true });
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Todos depend on authenticated user
  const {
    todos,
    title,
    setTitle,
    add,
    toggle,
    remove,
  } = useTodos(userId);

  // While session is unknown, render nothing
  if (!ready) return null;
  if (!userId) return null;

  return (
    <div className="todo-page">
      <div className="todo-container">
        <header className="todo-header">
          <h1>Todos</h1>
          <button className="todo-logout" onClick={logout}>
            Logout
          </button>
        </header>

        <hr className="todo-divider" />

        <div className="new-todo">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New todo"
            onKeyDown={(e) => e.key === "Enter" && add(title, null)}
          />
          <button
            className="new-todo-add"
            onClick={() => add(title, null)}
          >
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos
            .filter((t) => t.parentId === null)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                todos={todos}
                onAdd={add}
                onToggle={toggle}
                onDelete={remove}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
