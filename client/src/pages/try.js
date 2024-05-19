import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import "../styles/try.css";

const TryPage = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <span className="logo">Ecommerce</span>
        </Link>
      </div>
      <div className="navbar-right">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <FaSearch className="search-icon" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/category">Category</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default TryPage;
