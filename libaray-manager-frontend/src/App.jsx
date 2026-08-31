import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CatalogLayout from './components/CatalogLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AddBook from './pages/AddBook';
import BookList from './pages/BookList';
import CatalogHome from './pages/CatalogHome';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateBook from './pages/UpdateBook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/catalog" element={<CatalogLayout />}>
            <Route index element={<CatalogHome />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="book-list" element={<BookList />} />
            <Route path="update-book" element={<UpdateBook />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
