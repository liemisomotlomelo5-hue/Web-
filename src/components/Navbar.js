import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#333', color: '#fff', padding: '10px 20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: '1.2rem' }}>📚 Community Library</h2>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/books" style={{ color: '#fff', textDecoration: 'none' }}>Books</Link>
      <Link to="/transactions" style={{ color: '#fff', textDecoration: 'none' }}>Transactions</Link>
      <Link to="/users" style={{ color: '#fff', textDecoration: 'none' }}>Users</Link>
      <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
    </nav>
  );
}

export default Navbar;