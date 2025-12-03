import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const { cart, getCartTotal } = useCart();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="profile-subtitle">Manage your account information</p>
      </div>

      <div className="profile-content">
        {/* User Information Card */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Account Information</h2>
            <button
              className="btn-edit"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="profile-info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <p>{user.firstName} {user.lastName}</p>
            </div>

            <div className="info-item">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>

            <div className="info-item">
              <label>Role</label>
              <p className="role-badge">{user.role}</p>
            </div>

            <div className="info-item">
              <label>Member Since</label>
              <p>{new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</p>
            </div>

            {user.phone && (
              <div className="info-item">
                <label>Phone Number</label>
                <p>{user.phone}</p>
              </div>
            )}

            {user.address && (
              <div className="info-item full-width">
                <label>Address</label>
                <p>
                  {user.address.street}<br />
                  {user.address.city}, {user.address.state} {user.address.zipCode}<br />
                  {user.address.country}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shopping Summary Card */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Shopping Summary</h2>
          </div>

          <div className="shopping-stats">
            <div className="stat-item">
              <div className="stat-icon">🛒</div>
              <div className="stat-content">
                <h3>{cart.length}</h3>
                <p>Items in Cart</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>${getCartTotal().toFixed(2)}</h3>
                <p>Cart Total</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">✨</div>
              <div className="stat-content">
                <h3>{user.isVerified ? 'Verified' : 'Pending'}</h3>
                <p>Account Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions">
            <button className="action-btn">
              <span className="action-icon">📦</span>
              <span>View Orders</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">❤️</span>
              <span>Wishlist</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">🔔</span>
              <span>Notifications</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
