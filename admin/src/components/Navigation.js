import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  return user ? (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          RAF Saloon Admin
        </Link>
        <div className="nav-links">
          <Link to="/franchises">Franchises</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  ) : null;
};

export default Navigation; 