import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import './Navbar.css';

function Navbar() {
  const { items } = usePortfolio();
  const location = useLocation();

  // Helper to highlight active link
  function isActive(path) {
    return location.pathname === path ? 'active' : '';
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">💜 FinTech Platform</div>
      <div className="navbar-links">
        <Link className={isActive('/')} to="/">Home</Link>
        <Link className={isActive('/products')} to="/products">Products</Link>
        <Link className={isActive('/profile')} to="/profile">My Profile</Link>
        <Link className={isActive('/recommendations')} to="/recommendations">Recommendations</Link>
        <Link className={isActive('/portfolio')} to="/portfolio">
          Portfolio {items.length > 0 && <span className="badge">{items.length}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
