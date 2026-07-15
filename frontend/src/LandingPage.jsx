import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-left">
          <h1>
            Book Your Favorite Sports Ground <span>Anytime, Anywhere.</span>
          </h1>
          <p>
            Find nearby football, cricket, badminton, tennis and basketball
            grounds in seconds. Easy booking with secure payments.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://raw.githubusercontent.com/CodeDushyant/ImagesForDemo/refs/heads/main/photo-1517466787929-bc90951d0974.jpeg"
            alt="Ground"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-bar">
        <div className="stat-item">
          <h3>500+</h3>
          <p>Grounds</p>
        </div>
        <div className="stat-item">
          <h3>10k+</h3>
          <p>Happy Players</p>
        </div>
        <div className="stat-item">
          <h3>4.8/5</h3>
          <p>Platform Rating</p>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="card">
            <h3>⚡ Instant Booking</h3>
            <p>Book grounds in less than one minute.</p>
          </div>
          <div className="card">
            <h3>💳 Secure Payment</h3>
            <p>Safe online payment with booking confirmation.</p>
          </div>
          <div className="card">
            <h3>📍 Nearby Grounds</h3>
            <p>Discover sports venues near your location.</p>
          </div>
          <div className="card">
            <h3>⭐ Top Rated</h3>
            <p>Only verified and highly rated sports grounds.</p>
          </div>
        </div>
      </section>

      {/* Grounds */}
      <section className="grounds" id="grounds">
        <h2>Popular Grounds</h2>
        <div className="ground-grid">
          <div className="ground-card">
            <img
              src="https://raw.githubusercontent.com/CodeDushyant/ImagesForDemo/refs/heads/main/photo-1522778119026-d647f0596c20.jpeg"
              alt="Football"
            />
            <div className="card-info">
              <h3>Football Arena</h3>
              <p>₹700 / hour</p>
            </div>
          </div>
          <div className="ground-card">
            <img
              src="https://raw.githubusercontent.com/CodeDushyant/ImagesForDemo/refs/heads/main/photo-1546519638-68e109498ffc.jpeg"
              alt="Basketball"
            />
            <div className="card-info">
              <h3>Basketball Court</h3>
              <p>₹500 / hour</p>
            </div>
          </div>
          <div className="ground-card">
            <img
              src="https://raw.githubusercontent.com/CodeDushyant/ImagesForDemo/refs/heads/main/photo-1750716413756-b66624b64ce4.avif"
              alt="Cricket"
            />
            <div className="card-info">
              <h3>Cricket Stadium</h3>
              <p>₹1200 / hour</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <h3>GroundBook</h3>
        <p>© 2026 All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
