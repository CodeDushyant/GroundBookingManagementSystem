// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const adminId = user?.id;

  // Ground management state
  const [grounds, setGrounds] = useState([]);
  const [loadingGrounds, setLoadingGrounds] = useState(true);

  // Add ground form state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    sportType: "",
    price: "",
    image: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState("");

  // Delete state
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    if (adminId) {
      fetchAdminGrounds();
      fetchAdminBookings();
    }
  }, [adminId]);

  const fetchAdminGrounds = async () => {
    setLoadingGrounds(true);
    try {
      const response = await api.get("/grounds");
      // Filter grounds by owner (adminId)
      const adminGrounds = response.data.filter(
        (g) => g.owner === adminId || g.owner?._id === adminId,
      );
      setGrounds(adminGrounds);
    } catch (err) {
      console.error("Failed to fetch grounds:", err);
    } finally {
      setLoadingGrounds(false);
    }
  };

  const fetchAdminBookings = async () => {
    setLoadingBookings(true);
    setBookingsError("");
    try {
      const response = await api.get(`/bookings/admin/${adminId}`);
      setBookings(response.data);
    } catch (err) {
      setBookingsError("Failed to load bookings for your grounds.");
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
    setFormSuccess("");
  };

  const handleAddGround = async (e) => {
    e.preventDefault();

    // Validate
    if (
      !formData.name ||
      !formData.location ||
      !formData.sportType ||
      !formData.price
    ) {
      setFormError("Please fill in all required fields");
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setFormError("Price must be greater than 0");
      return;
    }

    setFormLoading(true);
    setFormError("");
    setFormSuccess("");

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        owner: adminId,
      };
      const response = await api.post("/grounds/add", payload);

      setFormSuccess(response.data.message || "Ground added successfully!");
      setFormData({
        name: "",
        location: "",
        sportType: "",
        price: "",
        image: "",
      });

      // Refresh ground list
      await fetchAdminGrounds();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add ground. Please try again.";
      setFormError(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteGround = async (groundId) => {
    if (!window.confirm("Are you sure you want to delete this ground?")) {
      return;
    }

    setDeleteLoading(groundId);
    try {
      await api.delete(`/grounds/${groundId}`);
      // Refresh the list
      await fetchAdminGrounds();
      // Also refresh bookings since grounds changed
      await fetchAdminBookings();
    } catch (err) {
      alert("Failed to delete ground. Please try again.");
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="admin-container">
        <div className="empty-state">
          <h3>Access Denied</h3>
          <p>You need admin privileges to view this page</p>
          <Link to="/" className="admin-action-btn">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p className="subtitle">Manage your grounds and view bookings</p>
      </div>

      {/* Add Ground Section */}
      <div className="admin-section">
        <div className="section-header">
          <h2>➕ Add New Ground</h2>
        </div>
        <div className="admin-card">
          {formError && <div className="error-message">{formError}</div>}
          {formSuccess && <div className="success-message">{formSuccess}</div>}

          <form onSubmit={handleAddGround} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Ground Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Football Arena"
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Etawah"
                  required
                  disabled={formLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sportType">Sport Type *</label>
                <input
                  type="text"
                  id="sportType"
                  name="sportType"
                  value={formData.sportType}
                  onChange={handleChange}
                  placeholder="e.g. Football, Cricket"
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (₹ per day) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 1000"
                  min="1"
                  step="1"
                  required
                  disabled={formLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL (optional)</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/ground-image.jpg"
                disabled={formLoading}
              />
              <span className="input-hint">
                Leave empty to use a default image
              </span>
            </div>

            <button
              type="submit"
              className="admin-submit-btn"
              disabled={formLoading}
            >
              {formLoading ? "Adding Ground..." : "Add Ground"}
            </button>
          </form>
        </div>
      </div>

      {/* My Grounds Section */}
      <div className="admin-section">
        <div className="section-header">
          <h2>🏟️ My Grounds</h2>
          <span className="section-count">{grounds.length} grounds</span>
        </div>

        {loadingGrounds ? (
          <div className="loading-spinner">Loading grounds...</div>
        ) : grounds.length === 0 ? (
          <div className="empty-state small">
            <p>You haven't added any grounds yet.</p>
          </div>
        ) : (
          <div className="admin-grounds-grid">
            {grounds.map((ground) => (
              <div key={ground._id} className="admin-ground-card">
                <div className="admin-ground-image-wrapper">
                  {ground.image ? (
                    <img
                      src={ground.image}
                      alt={ground.name}
                      className="admin-ground-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x160?text=Ground";
                      }}
                    />
                  ) : (
                    <div className="admin-ground-placeholder">
                      <span>🏟️</span>
                    </div>
                  )}
                  <span
                    className={`admin-ground-status ${ground.isBooked ? "booked" : "available"}`}
                  >
                    {ground.isBooked ? "Booked" : "Available"}
                  </span>
                </div>
                <div className="admin-ground-info">
                  <h4>{ground.name}</h4>
                  <p className="admin-ground-location">{ground.location}</p>
                  <p className="admin-ground-sport">{ground.sportType}</p>
                  <p className="admin-ground-price">₹{ground.price}/day</p>
                  <button
                    onClick={() => handleDeleteGround(ground._id)}
                    className="admin-delete-btn"
                    disabled={deleteLoading === ground._id}
                  >
                    {deleteLoading === ground._id ? "Deleting..." : "🗑️ Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bookings on Admin's Grounds */}
      <div className="admin-section">
        <div className="section-header">
          <h2>📊 Bookings on Your Grounds</h2>
          <span className="section-count">{bookings.length} bookings</span>
        </div>

        {loadingBookings ? (
          <div className="loading-spinner">Loading bookings...</div>
        ) : bookingsError ? (
          <div className="error-message">{bookingsError}</div>
        ) : bookings.length === 0 ? (
          <div className="empty-state small">
            <p>No bookings have been made on your grounds yet.</p>
          </div>
        ) : (
          <div className="admin-bookings-table-wrapper">
            <table className="admin-bookings-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Ground</th>
                  <th>Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id || index}>
                    <td>
                      <strong>{booking.user?.name || "Unknown"}</strong>
                    </td>
                    <td>{booking.user?.email || "N/A"}</td>
                    <td>{booking.ground?.name || "Unknown Ground"}</td>
                    <td>{formatDate(booking.bookingDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
