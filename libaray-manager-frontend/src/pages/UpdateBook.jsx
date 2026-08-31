import { useState } from 'react';
import { bookApi } from '../api/api';

function UpdateBook() {
  const [form, setForm] = useState({
    id: '',
    title: '',
    author: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoadBook = async () => {
    if (!form.id) return;
    setError('');
    try {
      const response = await bookApi.getById(form.id);
      const book = response.data;
      setForm({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description || '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await bookApi.update(form.id, {
        title: form.title,
        author: form.author,
        description: form.description,
      });
      setMessage('Book updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-card">
      <h2>Update Book</h2>
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Book ID:
          <div className="input-with-btn">
            <input
              type="number"
              name="id"
              value={form.id}
              onChange={handleChange}
              required
            />
            <button type="button" className="btn-load" onClick={handleLoadBook}>
              Load
            </button>
          </div>
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </label>
        <button type="submit" className="btn-green" disabled={loading}>
          {loading ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
