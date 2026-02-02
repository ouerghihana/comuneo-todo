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

  // Check active session and get user id
  // IMPORTANT:
  // In production (Vercel), account.get() may return 401 even if login worked,
  // because cookies behave differently.
  // So we try ONCE, and if it fails we DO NOT loop forever.
  useEffect(() => {
    let cancelled = false;

    account
      .get()
      .then((me) => {
        if (!cancelled) {
          setUserId(me.$id);
        }
      })
      .catch(() => {
        // If no session, redirect to login
        if (!cancelled) {
          navigate("/login", { replace: true });
        }
      });

    return () => {
      cancelled = true;
    };
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

  // Wait for session to be ready
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
            onKeyDown={(e) =>
              e.key === "Enter" && add(title, null)
            }
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
