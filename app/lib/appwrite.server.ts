// src/lib/appwrite.server.ts

import { Client, Account } from "appwrite";

/**
 * This function creates an Appwrite Account instance
 * that WORKS ON THE SERVER (Vercel, loaders, etc.)
 *
 * IMPORTANT:
 * - It receives the HTTP request
 * - It extracts the cookie from the request
 * - It attaches the session to Appwrite
 */
export function getServerAccount(request: Request) {
  // Read Appwrite config from environment variables
  const endpoint = process.env.VITE_APPWRITE_ENDPOINT!;
  const projectId = process.env.VITE_APPWRITE_PROJECT_ID!;

  // Create Appwrite client
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

  // VERY IMPORTANT:
  // Read cookies from the incoming request
  const cookie = request.headers.get("cookie");

  // If a session cookie exists, attach it to Appwrite
  if (cookie) {
    client.setSession(cookie);
  }

  // Return the Account API
  return new Account(client);
}
