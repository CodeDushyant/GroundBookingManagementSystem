// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚽</span>
          <span className="brand-text">SportGrounds</span>
        </Link>

        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/my-bookings" className="nav-link">
                {user.role === "admin" ? "Bookings" : "My Bookings"}
              </Link>
              {user.role === "admin" && (
                <Link to="/admin-dashboard" className="nav-link admin-link">
                  Manage Ground
                </Link>
              )}
              <div className="nav-user">
                <span className="user-name">👋 {user.name}</span>
                <span className="user-role badge">{user.role}</span>
              </div>
              <button onClick={handleLogout} className="nav-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link nav-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
