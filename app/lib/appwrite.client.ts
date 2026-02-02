import { Client, Databases, Account } from "appwrite";

// Appwrite environment configuration
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Ensure required env variables are defined
if (!endpoint || !projectId || !databaseId || !collectionId) {
  throw new Error("Missing Appwrite CLIENT environment variables");
}

// Appwrite client setup
const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

// Reusable Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = databaseId;
export const COLLECTION_ID = collectionId;
