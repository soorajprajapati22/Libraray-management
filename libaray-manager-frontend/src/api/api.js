const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const isAuthRequest = url.startsWith('/auth/');
  const token = !isAuthRequest ? getToken() : null;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || (data?.errors
      ? Object.values(data.errors).join(', ')
      : 'Something went wrong');
    throw new Error(message);
  }

  return data;
}

export const authApi = {
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },
};

export const bookApi = {
  getAll: () => request('/books'),
  getById: (id) => request(`/books/${id}`),
  create: (book) =>
    request('/books', {
      method: 'POST',
      body: JSON.stringify(book),
    }),
  update: (id, book) =>
    request(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(book),
    }),
};
