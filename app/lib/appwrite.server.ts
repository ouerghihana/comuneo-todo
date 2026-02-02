import { Client, Account } from "appwrite";

// Read Appwrite configuration from environment variables
const endpoint = process.env.VITE_APPWRITE_ENDPOINT;
const projectId = process.env.VITE_APPWRITE_PROJECT_ID;

// Ensure required environment variables exist
if (!endpoint || !projectId) {
  throw new Error("Missing Appwrite environment variables");
}

// Create and return an Appwrite Account instance for server usage
export function getServerAccount(cookie?: string) {
  // Initialize Appwrite client
  const client = new Client()
    .setEndpoint(endpoint as string)
    .setProject(projectId as string);

  // Attach session cookie if provided (for authenticated requests)
  if (cookie) {
    client.setSession(cookie);
  }

  // Return Account API instance
  return new Account(client);
}
