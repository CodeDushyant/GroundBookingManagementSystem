import "./AdminDashboard.css";

const recentBookings = [
  {
    id: "#BK1021",
    user: "Dushyant Singh",
    ground: "Elite Football Arena",
    date: "15 July 2026",
    amount: "₹800",
    status: "Confirmed",
  },
  {
    id: "#BK1022",
    user: "Rahul Sharma",
    ground: "Champion Cricket Ground",
    date: "14 July 2026",
    amount: "₹1200",
    status: "Pending",
  },
  {
    id: "#BK1023",
    user: "Aman Verma",
    ground: "Smash Badminton Club",
    date: "13 July 2026",
    amount: "₹500",
    status: "Cancelled",
  },
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <h2>GroundBook</h2>

        <ul>
          <li className="active">📊 Dashboard</li>
          <li>👥 Users</li>
          <li>🏟 Grounds</li>
          <li>🏢 Ground Owners</li>
          <li>📅 Bookings</li>
          <li>💳 Payments</li>
          <li>⭐ Reviews</li>
          <li>⚙ Settings</li>
          <li>🚪 Logout</li>
        </ul>

      </aside>

      {/* Main */}

      <main className="main-content">

        <div className="header">

          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, Administrator 👋</p>
          </div>

          <button>Add New Ground</button>

        </div>

        {/* Statistics */}

        <div className="stats">

          <div className="card">
            <h2>1,248</h2>
            <p>Total Users</p>
          </div>

          <div className="card">
            <h2>186</h2>
            <p>Ground Owners</p>
          </div>

          <div className="card">
            <h2>325</h2>
            <p>Total Grounds</p>
          </div>

          <div className="card">
            <h2>₹5.8L</h2>
            <p>Revenue</p>
          </div>

        </div>

        {/* Booking Table */}

        <div className="table-section">

          <h2>Recent Bookings</h2>

          <table>

            <thead>

              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Ground</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {recentBookings.map((booking) => (

                <tr key={booking.id}>

                  <td>{booking.id}</td>
                  <td>{booking.user}</td>
                  <td>{booking.ground}</td>
                  <td>{booking.date}</td>
                  <td>{booking.amount}</td>

                  <td>
                    <span
                      className={`status ${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;