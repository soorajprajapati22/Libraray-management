import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../api/api';

function CatalogLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/catalog';
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <div className="catalog-header-top">
          <h1>Welcome to the Library Catalog</h1>
          <div className="catalog-user-actions">
            {username && <span className="catalog-username">Hello, {username}</span>}
            <button type="button" className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <nav className="catalog-nav">
          <Link to="/catalog/add-book">Add New Book</Link>
          <Link to="/catalog/book-list">Book List</Link>
          <Link to="/catalog/update-book">Update Book</Link>
        </nav>
        {isHome && (
          <p className="catalog-intro">
            Explore our catalog and manage your books effectively. Use the navigation
            links to perform various actions.
          </p>
        )}
      </header>
      <main className="catalog-content">
        <Outlet />
      </main>
    </div>
  );
}

export default CatalogLayout;
