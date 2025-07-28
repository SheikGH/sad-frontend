import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './menu1.css';

const Header = () => {
    const token = localStorage.getItem('accessToken');
    let username = '';

    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            username = decoded.user_id || 'User';
        } catch (e) {
            console.error('Token parse error:', e);
        }
    }

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
            <nav className="navbar custom-navbar">
                <div className="navbar-left">
                    <Link to="/" className="logo-link">
                        <h1 className="logo-text">Super Admin Dashboard</h1>
                    </Link>

                    <div className="nav-links">
                        <Link to="/" className="active">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/admin">Admin</Link>
                        <Link to="/page/:products">DynamicPage</Link>
                        <button onClick={toggleMenu} className="icon-btn">&#9776;</button>
                    </div>
                </div>

                <div className="navbar-right">
                    <span className="welcome-msg">Welcome, <strong>{username}</strong></span>
                    <Link className="btn btn-outline-danger logout-btn" to="/logout">Logout</Link>
                </div>
            </nav>
        </Fragment>
    );
};

export default Header;
