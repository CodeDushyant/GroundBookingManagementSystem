import "./LandingPage.css";

const sports = [
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Tennis",
  "Volleyball",
];

const features = [
  {
    title: "Instant Booking",
    desc: "Book your favorite ground in just a few clicks."
  },
  {
    title: "Verified Grounds",
    desc: "High-quality sports venues with trusted owners."
  },
  {
    title: "Secure Payments",
    desc: "Fast and secure online payment options."
  },
  {
    title: "Live Availability",
    desc: "Check real-time slot availability before booking."
  }
];

function LandingPage() {
  return (
    <div className="landing">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">GroundBook</h2>

        <ul className="nav-links">
          <li>Home</li>
          <li>Grounds</li>
          <li>Sports</li>
          <li>Contact</li>
        </ul>

        <button className="login-btn">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <h1>
            Book Your Favorite Sports Ground
          </h1>

          <p>
            Find nearby grounds, check available slots,
            and reserve instantly.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search by city or ground..."
            />

            <button>
              Search
            </button>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>Why Choose Us?</h2>

        <div className="feature-grid">

          {features.map((feature) => (

            <div className="feature-card" key={feature.title}>

              <h3>{feature.title}</h3>

              <p>{feature.desc}</p>

            </div>

          ))}

        </div>

      </section>

      {/* Sports */}

      <section className="sports">

        <h2>Popular Sports</h2>

        <div className="sports-grid">

          {sports.map((sport) => (

            <div
              key={sport}
              className="sport-card"
            >
              {sport}
            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>
          Ready to Play?
        </h2>

        <p>
          Book your ground now and never miss your game.
        </p>

        <button>
          Explore Grounds
        </button>

      </section>

      {/* Footer */}

      <footer>

        © 2026 GroundBook | All Rights Reserved

      </footer>

    </div>
  );
}

export default LandingPage;