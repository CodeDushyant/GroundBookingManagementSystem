// src/components/GroundDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./GroundDetails.css";

const GroundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetchGroundDetails();
  }, [id]);

  const fetchGroundDetails = async () => {
    setLoading(true);
    setError("");
    try {
      // Since there's no single ground endpoint, we fetch all and filter
      const response = await api.get("/grounds");
      const found = response.data.find((g) => g._id === id);
      if (found) {
        setGround(found);
      } else {
        setError("Ground not found");
      }
    } catch (err) {
      setError("Failed to load ground details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingDate) {
      setBookingError("Please select a booking date");
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    setBookingError("");
    setBookingSuccess("");

    try {
      const payload = {
        userId: user.id,
        groundId: id,
        bookingDate: bookingDate,
      };
      const response = await api.post("/bookings/book", payload);
      setBookingSuccess(response.data.message || "Ground booked successfully!");

      // Refresh ground details to update availability
      await fetchGroundDetails();

      // Reset form
      setBookingDate("");

      // Navigate to my bookings after a delay
      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Booking failed. Please try again.";
      setBookingError(message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading ground details...</div>;
  }

  if (error || !ground) {
    return (
      <div className="details-error">
        <div className="error-message">{error || "Ground not found"}</div>
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="details-container">
      <Link to="/" className="back-link">
        ← Back to Grounds
      </Link>

      <div className="details-card">
        <div className="details-image-wrapper">
          {ground.image ? (
            <img
              src={ground.image}
              alt={ground.name}
              className="details-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x400?text=Sports+Ground";
              }}
            />
          ) : (
            <div className="details-image-placeholder">
              <span>🏟️</span>
            </div>
          )}
          <span className="details-sport-tag">{ground.sportType}</span>
        </div>

        <div className="details-content">
          <div className="details-header">
            <h1 className="details-name">{ground.name}</h1>
            <span
              className={`details-status ${ground.isBooked ? "booked" : "available"}`}
            >
              {ground.isBooked ? "🔴 Currently Booked" : "🟢 Available"}
            </span>
          </div>

          <p className="details-location">📍 {ground.location}</p>

          <div className="details-price-box">
            <span className="details-price-label">Price</span>
            <span className="details-price">₹{ground.price}</span>
            <span className="details-price-period">per day</span>
          </div>

          {ground.isBooked && (
            <div className="details-booked-notice">
              ⚠️ This ground is currently booked. You can still view details but
              booking is not available at this time.
            </div>
          )}

          <div className="booking-section">
            <h3>Book This Ground</h3>
            <form onSubmit={handleBooking} className="booking-form">
              <div className="booking-form-group">
                <label htmlFor="bookingDate">Select Date</label>
                <input
                  type="date"
                  id="bookingDate"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  disabled={bookingLoading || ground.isBooked}
                />
              </div>

              {bookingError && (
                <div className="error-message">{bookingError}</div>
              )}
              {bookingSuccess && (
                <div className="success-message">{bookingSuccess}</div>
              )}

              <button
                type="submit"
                className="booking-submit-btn"
                disabled={bookingLoading || ground.isBooked}
              >
                {bookingLoading
                  ? "Processing..."
                  : ground.isBooked
                    ? "Not Available"
                    : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundDetails;
