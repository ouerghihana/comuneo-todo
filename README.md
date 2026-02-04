# COMUNEO Todo App

A small full-stack Todo application built with React Router, TypeScript, and Appwrite.

This application allows users to authenticate and manage a hierarchical todo list (parent tasks and sub-tasks) with persistent storage.

This mini-project demonstrates frontend architecture, state management, API integration, data persistence, and DevOps awareness.

---
Live demo :  
https://comuneo-todo-vert.vercel.app

## Features

- User authentication (signup, login, logout)
- Create, delete, and toggle todos
- Support for parent tasks and sub-tasks
- Persistent data stored in Appwrite Database
- Clean separation of concerns (hooks, API layer, components)
- Minimal and responsive UI

---

## Tech Stack

- Frontend: React, React Router, TypeScript  
- Backend (BaaS): Appwrite  
- Styling: CSS  
- Build Tool: Vite  
- Testing: Vitest  
- Containerization: Docker  

---

## Project Structure

app/
components/        UI components  
hooks/             Custom React hooks  
lib/               Appwrite client and API logic  
routes/            Application routes  
styles/            CSS files  
types/             TypeScript types  
root.tsx           App root  
routes.ts          Route configuration  
test/              Test setup  

---

## Data Persistence

When a user logs in, their todo list is fetched from Appwrite Database using their user ID.

All create, update, and delete operations are persisted server-side and reflected immediately in the UI.

This demonstrates the complete data flow:

Client → API layer → Appwrite → Client UI

---

## Environment Variables

Create a .env file in the project root and define the following variables:

VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint  
VITE_APPWRITE_PROJECT_ID=your_project_id  
VITE_APPWRITE_DATABASE_ID=your_database_id  
VITE_APPWRITE_COLLECTION_ID=your_collection_id  

Note:  
These values must be replaced with your own Appwrite credentials locally.  

---

## Local Development

Install dependencies:

npm install

Start the development server:

npm run dev

The application will be available at:

http://localhost:5173

---

## Testing

Run tests with:

npm run test

---

## CI/CD Pipeline (Design Proposal)

This project includes a conceptual CI/CD pipeline design to demonstrate DevOps understanding.

Pipeline steps include:

- Install dependencies  
- Run linting  
- Execute automated tests  
- Build the application  
- Deploy to a cloud platform  

Tools and platforms that could be used:

- GitHub Actions for CI/CD automation  
- Node.js and npm for dependency management  
- Vite for production builds  

Deployment strategy:

The application can be deployed to platforms such as Vercel, Netlify, or Railway.

Environment variables (Appwrite credentials) are configured securely on the deployment platform.

This pipeline is a design proposal and reflects modern software delivery best practices.

---



## Author

Hana Ouerghi  
Full-Stack Developer
