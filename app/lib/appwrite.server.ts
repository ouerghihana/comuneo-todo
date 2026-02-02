//appwrite.server.ts
import { Client, Account } from "appwrite";

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;

// Validate required server environment variables
if (!endpoint || !projectId) {
  throw new Error("Missing Appwrite server environment variables");
}

// Create an Appwrite Account instance for server-side usage
export function getServerAccount(cookie?: string) {
  const client = new Client()
    .setEndpoint(endpoint as string)
    .setProject(projectId as string);

// Attach user session if available (SSR / API routes)

  if (cookie) {
    client.setSession(cookie);
  }

  return new Account(client);
}


