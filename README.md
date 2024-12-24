# Task Management Application

A modern task management application built with Next.js, TypeScript, and PostgreSQL, featuring a beautiful UI powered by shadcn/ui components.

## Features

- 🔐 User Authentication

  - Email/password authentication
  - Protected routes and API endpoints
  - Secure JWT token handling

- ✨ Task Management

  - Create, read, update, and delete tasks
  - Status tracking (Todo, In Progress, Done)
  - Task filtering by status
  - Rich task details with timestamps

- 📊 Dashboard

  - Task statistics overview
  - Status-based task counts
  - Visual status indicators
  - Responsive grid layout

- 🎨 Modern UI
  - Clean and intuitive interface
  - Responsive design
  - Beautiful components with shadcn/ui
  - Loading states and error handling

## Tech Stack

- **Frontend**

  - Next.js 13
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - date-fns for date formatting
  - Lucide React for icons

- **Backend**
  - NestJS
  - TypeORM
  - PostgreSQL
  - JWT Authentication
  - Class Validator
  - Swagger API Documentation

## Prerequisites

- Node.js 16.x or later
- PostgreSQL 12.x or later
- npm or yarn package manager

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/fouratrachid/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. Set up PostgreSQL:

   - Create a new PostgreSQL database:
     ```sql
     CREATE DATABASE task_management;
     ```
   - The tables will be automatically created by TypeORM when you start the backend

4. Configure environment variables:

   Create `.env` file in the backend directory:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=task_management
   NODE_ENV=development
   ```

5. Start the development servers:

   Frontend:

   ```bash
   cd frontend
   npm run dev
   ```

   Backend:

   ```bash
   cd backend
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── frontened/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API client functions
│   │   ├── components/        # React components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── providers/        # Context providers
│   │   ├── types/            # TypeScript types
│   │   └── page.tsx          # Main page component
│   └── components/          # shadcn/ui components
├── backend/              # NestJS backend
│   ├── src/
│   │   ├── auth/        # Authentication module
│   │   ├── tasks/       # Tasks module
│   │   └── main.ts      # Application entry
└   └
```

## API Documentation

The backend API documentation is available at [http://localhost:3001/api](http://localhost:3001/api) when running the development server. This documentation is generated using Swagger/OpenAPI.

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users**

  - id (UUID, Primary Key)
  - email (String, Unique)
  - password (String, Hashed)

- **tasks**
  - id (UUID, Primary Key)
  - title (String)
  - description (String)
  - status (Enum: TODO, IN_PROGRESS, DONE)
  - userId (UUID, Foreign Key)
  - createdAt (Timestamp)
  - updatedAt (Timestamp)

## Development

- Run tests:

  ```bash
  # Frontend tests
  cd frontend
  npm test

  # Backend tests
  cd backend
  npm test
  ```

- Lint code:
  ```bash
  npm run lint
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
