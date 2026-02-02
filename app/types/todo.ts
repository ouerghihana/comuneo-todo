// Core Todo model used across the application
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  parentId: string | null;
};

