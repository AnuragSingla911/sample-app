const request = require('supertest');
const app = require('./server');

describe('GET /api/users', () => {
  it('returns all 5 seeded users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(5);
    expect(res.body[0]).toMatchObject({ id: 1, name: 'John Doe', role: 'Admin' });
  });
});

describe('GET /api/users/:id', () => {
  it('returns a single user by id', async () => {
    const res = await request(app).get('/api/users/2');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 2, name: 'Jane Smith' });
  });

  it('returns 404 for an unknown user', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'User not found' });
  });
});

describe('POST /api/users', () => {
  it('creates a user and returns 201 with the new record', async () => {
    const payload = { name: 'New User', email: 'new@example.com', role: 'User' };
    const res = await request(app).post('/api/users').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(payload);
    expect(typeof res.body.id).toBe('number');
  });
});

describe('GET /api/posts', () => {
  it('returns all 5 seeded posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(5);
    expect(res.body[0]).toMatchObject({ id: 1, title: 'Getting Started with Express' });
  });
});

describe('GET /api/posts/:id', () => {
  it('returns a single post by id', async () => {
    const res = await request(app).get('/api/posts/3');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 3, title: 'Understanding REST APIs' });
  });

  it('returns 404 for an unknown post', async () => {
    const res = await request(app).get('/api/posts/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Post not found' });
  });
});

describe('POST /api/posts', () => {
  it('creates a post, returns 201 and auto-populates the date', async () => {
    const payload = { title: 'Test Post', content: 'Body', author: 'Tester' };
    const res = await request(app).post('/api/posts').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(payload);
    expect(res.body.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
