# Sample Full-Stack App

A simple full-stack application with a React frontend and Express.js backend, featuring mock data for users and posts.

## Project Structure

```
sample-app/
├── backend/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js
        └── App.css
```

## Features

- **Backend**: Express.js REST API with CORS enabled
- **Frontend**: React application with modern UI
- **Mock Data**: Pre-populated users and posts
- **API Endpoints**:
  - `GET /api/users` - Get all users
  - `GET /api/users/:id` - Get user by ID
  - `GET /api/posts` - Get all posts
  - `GET /api/posts/:id` - Get post by ID
  - `POST /api/users` - Create new user
  - `POST /api/posts` - Create new post

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   
   The frontend will run on `http://localhost:3000`

## Usage

1. Make sure both the backend and frontend servers are running
2. Open your browser and navigate to `http://localhost:3000`
3. You'll see a tabbed interface displaying:
   - **Users Tab**: Shows a list of mock users with their roles
   - **Posts Tab**: Shows a list of mock blog posts
4. Click the "Refresh Data" button to re-fetch data from the backend

## API Examples

### Get all users
```bash
curl http://localhost:5000/api/users
```

### Get all posts
```bash
curl http://localhost:5000/api/posts
```

### Create a new user
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "New User", "email": "new@example.com", "role": "User"}'
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React, Axios
- **Styling**: CSS3 with modern features
