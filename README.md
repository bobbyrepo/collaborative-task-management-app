# Real-Time Collaborative Task Management App

## Introduction

The Real-Time Collaborative Task Management App is a full-stack web application designed to manage tasks collaboratively and provide real-time updates on task progress. It includes features like basic CRUD operations, role-based access, authentication, a responsive user interface, and real-time functionality.

## Features

The Real-Time Collaborative Task Management App offers the following features:

- **Basic CRUD Operations:**
  - Users can create, read, update, and delete tasks.

- **Role-Based Access:**
  - Admin users can manage tasks of all users.
  - Regular users can only manage their own tasks.

- **Authentication Check:**
  - Users need to log in to access the app.
  - JWT-based authentication for secure access.

- **Responsive UI:**
  - The app is designed to be responsive and adapt to various screen sizes.

- **Real-Time Functionality:**
  - Real-time updates when tasks are created, updated, or deleted.
  - Real-time notifications when a user completes a task.

## Technologies Used

The project utilizes the following technologies:

- Backend:
  - Node.js with Express for RESTful APIs
  - Socket.io for real-time functionality
  - JWT (JSON Web Tokens) for user authentication

- Database:
  - MongoDB for storing tasks and user data

- Frontend:
  - HTML, CSS (with a framework like Bootstrap)
  - JavaScript
  - React for building the user interface
  - Redux for state management
  - React-icons for icons

## Usage

To use the Warehouse Management App:

1. Run `git clone https://github.com/bobbyrepo/collaborative-task-management-app` to clone the repository to your local machine.
2. Run `npm install` to install the project dependencies.
3. Run `npm start` to start the development server.
4. Open your browser and visit `http://localhost:3000`.



