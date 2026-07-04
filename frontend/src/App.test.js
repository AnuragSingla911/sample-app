import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];
const posts = [
  { id: 1, title: 'Getting Started with Express', content: 'Express is a minimal Node.js web framework...', author: 'John Doe', date: '2024-01-15' },
];

function mockSuccess() {
  axios.get.mockImplementation((url) => {
    if (url.endsWith('/api/users')) return Promise.resolve({ data: users });
    if (url.endsWith('/api/posts')) return Promise.resolve({ data: posts });
    return Promise.reject(new Error(`unexpected url ${url}`));
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

test('fetches from the configured API_URL base on mount', async () => {
  mockSuccess();
  render(<App />);
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

  // API_URL defaults to http://localhost:5000 (process.env.REACT_APP_API_URL is unset in tests)
  const calledUrls = axios.get.mock.calls.map((c) => c[0]);
  expect(calledUrls).toContain('http://localhost:5000/api/users');
  expect(calledUrls).toContain('http://localhost:5000/api/posts');
});

test('renders user cards on successful load and switches to posts', async () => {
  mockSuccess();
  render(<App />);

  expect(await screen.findByText('Users (2)')).toBeInTheDocument();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  expect(screen.queryByText('Failed to fetch data from backend')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Posts' }));
  expect(await screen.findByText('Posts (1)')).toBeInTheDocument();
  expect(screen.getByText('Getting Started with Express')).toBeInTheDocument();
});

test('shows an error banner when the backend request fails', async () => {
  axios.get.mockRejectedValue(new Error('network down'));
  render(<App />);

  expect(await screen.findByText('Failed to fetch data from backend')).toBeInTheDocument();
});
