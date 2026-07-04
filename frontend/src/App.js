import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, postsRes] = await Promise.all([
        axios.get(`${API_URL}/api/users`),
        axios.get(`${API_URL}/api/posts`)
      ]);
      setUsers(usersRes.data);
      setPosts(postsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from backend');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sample Full-Stack Application</h1>
        <p>React Frontend + Express Backend</p>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
      </div>

      <div className="content">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && activeTab === 'users' && (
          <div className="data-container">
            <h2>Users ({users.length})</h2>
            <div className="grid">
              {users.map(user => (
                <div key={user.id} className="card">
                  <h3>{user.name}</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <span className={`badge ${user.role.toLowerCase()}`}>{user.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && activeTab === 'posts' && (
          <div className="data-container">
            <h2>Posts ({posts.length})</h2>
            <div className="grid">
              {posts.map(post => (
                <div key={post.id} className="card">
                  <h3>{post.title}</h3>
                  <p className="content-preview">{post.content.substring(0, 100)}...</p>
                  <p><strong>Author:</strong> {post.author}</p>
                  <p><strong>Date:</strong> {post.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className="refresh-btn" onClick={fetchData}>
        Refresh Data
      </button>
    </div>
  );
}

export default App;
