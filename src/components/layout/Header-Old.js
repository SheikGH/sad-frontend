import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import './menu.css';

// Optional: If you need Font Awesome in React, install it via npm
// OR use link in public/index.html (see note below)

const Header = () => {

  const toggleMenu = () => {
    const menu = document.getElementById("myTopnav");
    if (menu.className === "topnav") {
      menu.className += " responsive";
    } else {
      menu.className = "topnav";
    }
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 navbar-brand d-flex justify-content-between align-items-center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ color: 'lightgreen', fontSize: '30px', margin: 0 }}>
              Super Admin Dashboard
            </h1>
          </Link>
        </div>

        <div className="topnav" id="myTopnav">
          <Link to="/" className="active">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/page/:products">DynamicPage</Link>
          <button
            onClick={toggleMenu}
            className="icon"
            style={{ fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            &#9776;
          </button>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
