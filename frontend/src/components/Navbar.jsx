import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Artisan Market
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/products" className="navbar-link">
                Products
              </Link>
              <Link to="/cart" className="navbar-link cart-link">
                Cart
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </Link>
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
              <div className="navbar-user">
                <span className="user-name">
                  {user?.name || user?.email || 'User'}
                </span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
