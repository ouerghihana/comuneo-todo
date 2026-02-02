import { useState } from "react";
import type { Todo } from "~/types/todo";

type Props = {
  todo: Todo;
  todos: Todo[];
  onAdd: (title: string, parentId: string | null) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({
  todo,
  todos,
  onAdd,
  onToggle,
  onDelete,
}: Props) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const children = todos.filter((t) => t.parentId === todo.id);

  function submit() {
    if (!title.trim()) return;
    onAdd(title, todo.id);
    setTitle("");
    setOpen(false);
  }

  return (
    <li className={`todo-item ${todo.completed ? "done" : ""}`}>
      <div className="todo-row">
        <div className="todo-left">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />

          <span className="todo-title">
            {todo.title}
          </span>
        </div>

        <div className="todo-actions">
          <button
            className="todo-plus"
            onClick={() => setOpen((v) => !v)}
            disabled={todo.completed}
          >
            +
          </button>

          <button
            className="todo-delete"
            onClick={() => onDelete(todo.id)}
          >
            ✕
          </button>
        </div>
      </div>

      {open && !todo.completed && (
        <div className="todo-sub-input">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sub task"
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>
      )}

      {children.length > 0 && (
        <ul className="todo-list">
          {children.map((child) => (
            <TodoItem
              key={child.id}
              todo={child}
              todos={todos}
              onAdd={onAdd}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
