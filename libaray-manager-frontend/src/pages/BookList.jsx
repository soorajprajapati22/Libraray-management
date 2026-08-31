import { useEffect, useState } from 'react';
import { bookApi } from '../api/api';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookApi
      .getAll()
      .then((response) => setBooks(response.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="content-card book-list-card">
      <h2>Book List</h2>
      {loading && <p>Loading books...</p>}
      {error && <p className="error-msg">{error}</p>}
      {!loading && !error && books.length === 0 && <p>No books found.</p>}
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>
              <strong>Book ID:</strong> {book.id}
            </p>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            {book.description && <p className="book-desc">{book.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
