// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./Home.css";

const Home = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSport, setFilterSport] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetchGrounds();
  }, []);

  // src/components/Home.jsx (sirf updated section)
  const fetchGrounds = async () => {
    setLoading(true);
    setError("");
    try {
      // Logic: Agar admin hai, toh sirf uske grounds fetch karo
      const endpoint =
        user?.role === "admin" ? `grounds/admin/${user.id}` : "/grounds";

      const response = await api.get(endpoint);
      setGrounds(response.data);
    } catch (err) {
      setError("Failed to load grounds. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique sport types for filter
  const sportTypes = [...new Set(grounds.map((g) => g.sportType))];

  const filteredGrounds = grounds.filter((ground) => {
    const matchesSearch =
      ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ground.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = filterSport ? ground.sportType === filterSport : true;
    return matchesSearch && matchesSport;
  });

  if (loading) {
    return <div className="loading-spinner">Loading grounds...</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        {user && user.role === "user" && (
          <div>
            <h1>🏟️ Available Grounds</h1>
            <p className="subtitle">Find and book the perfect sports ground</p>
          </div>
        )}
        {user && user.role === "admin" && (
          <Link to="/admin-dashboard" className="admin-quick-link">
            ⚙️ Manage Grounds
          </Link>
        )}
      </div>

      {user.role === "user" && (
        <div className="filter-bar">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="🔍 Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-wrapper">
            <select
              value={filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
              className="filter-select"
            >
              <option value="">All Sports</option>
              {sportTypes.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {filteredGrounds.length === 0 ? (
        <div className="empty-state">
          <h3>No grounds found</h3>
          <p>
            {searchTerm || filterSport
              ? "Try adjusting your search or filters"
              : "No grounds available at the moment"}
          </p>
        </div>
      ) : (
        <div className="grounds-grid">
          {filteredGrounds.map((ground) => (
            <div key={ground._id} className="ground-card">
              <div className="ground-image-wrapper">
                {ground.image ? (
                  <img src={ground.image} className="ground-image" />
                ) : (
                  <div className="ground-image-placeholder">
                    <span>🏟️</span>
                  </div>
                )}
                <span className="sport-tag">{ground.sportType}</span>
              </div>
              <div className="ground-info">
                <h3 className="ground-name">{ground.name}</h3>
                <p className="ground-location">📍 {ground.location}</p>
                <div className="ground-meta">
                  <span className="ground-price">₹{ground.price}/day</span>
                  <span
                    className={`ground-status ${ground.isBooked ? "booked" : "available"}`}
                  >
                    {ground.isBooked ? "🔴 Booked" : "🟢 Available"}
                  </span>
                </div>
                <Link to={`/ground/${ground._id}`} className="book-now-btn">
                  {ground.isBooked ? "View Details" : "Book Now"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
