// src/components/MyBookings.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Admin ke liye /bookings (sabki), User ke liye /bookings/user/:id (sirf apni)
        const endpoint =
          user.role === "admin"
            ? `/bookings/admin/${user.id}`
            : `/bookings/user/${user.id}`;

        const response = await api.get(endpoint);
        setBookings(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id, user?.role]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="loading-spinner">Loading your bookings...</div>;
  }

  if (!user) {
    return (
      <div className="bookings-container">
        <div className="empty-state">
          <h3>Please Login</h3>
          <p>You need to be logged in to view your bookings.</p>
          <Link to="/login" className="bookings-action-btn">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h1>{user.role === "admin" ? "📋 All Bookings" : "📋 My Bookings"}</h1>
        <p className="subtitle">
          {bookings.length > 0
            ? `Total ${bookings.length} booking${bookings.length > 1 ? "s" : ""} found`
            : "No bookings found"}
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No Bookings Found</h3>
          <p>Start exploring grounds and book your favorite spot!</p>
          <Link to="/" className="bookings-action-btn">
            Browse Grounds
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <div className="booking-item-content">
                <div className="booking-ground-info">
                  <h3 className="booking-ground-name">
                    {booking.ground?.name || "Unknown Ground"}
                  </h3>
                  <p className="booking-ground-location">
                    📍 {booking.ground?.location || "Location not available"}
                  </p>
                </div>

                <div className="booking-details">
                  <div className="booking-detail-item">
                    <span className="detail-label">Sport</span>
                    <span className="detail-value">
                      {booking.ground?.sportType || "N/A"}
                    </span>
                  </div>
                  <div className="booking-detail-item">
                    <span className="detail-label">Price</span>
                    <span className="detail-value price">
                      ₹{booking.ground?.price || "N/A"}
                    </span>
                  </div>
                  <div className="booking-detail-item">
                    <span className="detail-label">Booking Date</span>
                    <span className="detail-value date">
                      📅 {formatDate(booking.bookingDate)}
                    </span>
                  </div>
                  <div className="booking-detail-item">
                    <span className="detail-label">Status</span>
                    <span className="booking-status confirmed">
                      ✅ Confirmed
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to={`/ground/${booking.ground?._id}`}
                className="booking-view-ground"
              >
                View Ground →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
