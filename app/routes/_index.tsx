import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import TodoItem from "~/components/TodoItem";
import { useTodos } from "~/hooks/useTodos";
import { useAuth } from "~/hooks/useAuth";
import { account } from "~/lib/appwrite.client";

import "~/styles/todos.css";

type AppwriteUser = {
  $id: string;
  name?: string;
  email?: string;
};

export default function HomePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [checking, setChecking] = useState(true);

  // Check Appwrite session ONCE on page load
  useEffect(() => {
    console.log("[HOME] checking session...");

    account
      .get()
      .then((me: any) => {
        console.log("[HOME] session OK", me);
        setUser({ $id: me.$id, name: me.name, email: me.email });
        setChecking(false);
      })
      .catch((err: any) => {
        console.error("[HOME] NO SESSION", err);
        setChecking(false);
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  // Todos depend on authenticated user
  const { todos, title, setTitle, add, toggle, remove } = useTodos(user?.$id ?? null);

  // While checking auth, render nothing
  if (checking) return null;
  if (!user) return null;

  return (
    <div className="todo-page">
      <div className="todo-container">
        <header className="todo-header">
          <div>
            <h1>Todos</h1>
            {/* Optional: useful for debugging / UX */}
            <div style={{ opacity: 0.7, fontSize: 12 }}>
              {user.email ? user.email : user.$id}
            </div>
          </div>

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
          <button className="new-todo-add" onClick={() => add(title, null)}>
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
