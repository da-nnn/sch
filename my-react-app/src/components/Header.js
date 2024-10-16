// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Create and style this CSS file

function Header() {
  return (
    <header>
      <div className="menu">
        <h1>Scholarships Kenya</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
