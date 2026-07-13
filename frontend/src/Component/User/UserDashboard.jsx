import "./UserDashboard.css";

const grounds = [
  {
    id: 1,
    name: "Elite Football Arena",
    sport: "Football",
    location: "Chandigarh",
    price: "₹800/hr",
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Champion Cricket Ground",
    sport: "Cricket",
    location: "Mohali",
    price: "₹1200/hr",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Smash Badminton Club",
    sport: "Badminton",
    location: "Panchkula",
    price: "₹500/hr",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
  },
];

function UserDashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <h2>GroundBook</h2>

        <ul>
          <li className="active">🏠 Dashboard</li>
          <li>📅 My Bookings</li>
          <li>❤️ Favorites</li>
          <li>👤 Profile</li>
          <li>⚙ Settings</li>
          <li>🚪 Logout</li>
        </ul>

      </aside>

      {/* Main Content */}

      <main className="main-content">

        {/* Header */}

        <header className="header">

          <div>
            <h1>Welcome, Dushyant 👋</h1>
            <p>Book your favorite sports ground.</p>
          </div>

          <button>+ Book Ground</button>

        </header>

        {/* Search */}

        <section className="search-section">

          <input
            type="text"
            placeholder="Search ground, city, sport..."
          />

          <select>
            <option>All Sports</option>
            <option>Football</option>
            <option>Cricket</option>
            <option>Badminton</option>
            <option>Tennis</option>
          </select>

          <button>Search</button>

        </section>

        {/* Statistics */}

        <section className="stats">

          <div className="stat-card">
            <h2>12</h2>
            <p>Total Bookings</p>
          </div>

          <div className="stat-card">
            <h2>3</h2>
            <p>Upcoming Matches</p>
          </div>

          <div className="stat-card">
            <h2>₹8,500</h2>
            <p>Total Spent</p>
          </div>

        </section>

        {/* Grounds */}

        <section>

          <h2 className="section-title">
            Popular Grounds
          </h2>

          <div className="grounds">

            {grounds.map((ground) => (

              <div className="ground-card" key={ground.id}>

                <img
                  src={ground.image}
                  alt={ground.name}
                />

                <div className="ground-info">

                  <h3>{ground.name}</h3>

                  <p>🏅 {ground.sport}</p>

                  <p>📍 {ground.location}</p>

                  <h4>{ground.price}</h4>

                  <button>
                    Book Now
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default UserDashboard;