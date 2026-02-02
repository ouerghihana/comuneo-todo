import { databases } from "~/lib/appwrite.client";
import { DATABASE_ID, COLLECTION_ID } from "~/lib/appwrite.client";
import { Query } from "appwrite";

/*
  Fetch all todos for a specific user
*/
export async function loadTodos(userId: string) {
  const res = await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID,
    [Query.equal("userId", userId)]
  );

  return res.documents.map((doc: any) => ({
    id: doc.$id,
    title: doc.data,
    parentId: doc.parentId ?? null,
    completed: doc.completed ?? false,
  }));
}

/*
  Create a new todo (optionally with a parent)
  IMPORTANT: permissions are required for update/delete later
*/
export async function createTodo(
  userId: string,
  title: string,
  parentId: string | null
) {
  const payload: any = {
    userId,
    data: title,
    completed: false,
  };

  if (parentId !== null) {
    payload.parentId = parentId;
  }

  return databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    "unique()",
    payload,
    [
      `read("user:${userId}")`,
      `update("user:${userId}")`,
      `delete("user:${userId}")`,
    ]
  );
}

/*
  Update completed state of a todo
*/
export async function updateTodoCompleted(
  id: string,
  completed: boolean
) {
  return databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    id,
    {
      completed,
    }
  );
}

/*
  Delete a todo by document ID
*/
export async function deleteTodo(id: string) {
  return databases.deleteDocument(
    DATABASE_ID,
    COLLECTION_ID,
    id
  );
}
