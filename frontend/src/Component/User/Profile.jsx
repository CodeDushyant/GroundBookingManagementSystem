import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">

          <img
            src="https://i.pravatar.cc/200"
            alt="Profile"
          />

          <h2>Dushyant Singh</h2>

          <p>Sports Enthusiast</p>

          <button>Edit Profile</button>

        </div>

        <div className="profile-details">

          <h3>Personal Information</h3>

          <div className="detail-grid">

            <div className="detail-box">
              <label>Full Name</label>
              <input
                type="text"
                value="Dushyant Singh"
                readOnly
              />
            </div>

            <div className="detail-box">
              <label>Email</label>
              <input
                type="email"
                value="dushyant@gmail.com"
                readOnly
              />
            </div>

            <div className="detail-box">
              <label>Phone Number</label>
              <input
                type="text"
                value="+91 9876543210"
                readOnly
              />
            </div>

            <div className="detail-box">
              <label>City</label>
              <input
                type="text"
                value="Chandigarh"
                readOnly
              />
            </div>

            <div className="detail-box full">
              <label>Address</label>
              <textarea
                rows="3"
                readOnly
                value="Sector 34, Chandigarh"
              />
            </div>

          </div>

          <div className="stats">

            <div className="stat-card">
              <h2>18</h2>
              <p>Total Bookings</p>
            </div>

            <div className="stat-card">
              <h2>₹12,400</h2>
              <p>Total Spent</p>
            </div>

            <div className="stat-card">
              <h2>4.9 ⭐</h2>
              <p>Average Rating</p>
            </div>

          </div>

          <div className="action-buttons">

            <button className="green-btn">
              Change Password
            </button>

            <button className="red-btn">
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;