require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Moderator' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' }
];

const posts = [
  { id: 1, title: 'Getting Started with Express', content: 'Express is a minimal Node.js web framework...', author: 'John Doe', date: '2024-01-15' },
  { id: 2, title: 'React Best Practices', content: 'Learn the best practices for building React applications...', author: 'Jane Smith', date: '2024-01-16' },
  { id: 3, title: 'Understanding REST APIs', content: 'REST APIs are the backbone of modern web services...', author: 'Bob Johnson', date: '2024-01-17' },
  { id: 4, title: 'CSS Grid vs Flexbox', content: 'When to use CSS Grid and when to use Flexbox...', author: 'Alice Williams', date: '2024-01-18' },
  { id: 5, title: 'JavaScript ES6+ Features', content: 'Explore the modern JavaScript features you should know...', author: 'Charlie Brown', date: '2024-01-19' }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Sample App API' });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Get post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Create new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Create new post
app.post('/api/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    date: new Date().toISOString().split('T')[0],
    ...req.body
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Start server (skip when imported, e.g. by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
