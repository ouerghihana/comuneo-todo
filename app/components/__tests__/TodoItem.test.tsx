import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";

// Mock react-router to avoid Vite plugin crash
vi.mock("react-router-dom", () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
}));

import TodoItem from "../TodoItem";

test("renders todo title", () => {
  render(
    <TodoItem
      todo={{
        id: "1",
        title: "Go to the gym",
        completed: false,
        parentId: null,
      }}
      todos={[]}
      onAdd={() => {}}
      onToggle={() => {}}
      onDelete={() => {}}
    />
  );

  expect(screen.getByText("Go to the gym")).toBeInTheDocument();
});
