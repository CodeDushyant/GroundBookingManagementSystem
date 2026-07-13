import "./MyBookings.css";

const bookings = [
  {
    id: 1,
    ground: "Elite Football Arena",
    sport: "Football",
    location: "Chandigarh",
    date: "15 July 2026",
    time: "6:00 PM - 7:00 PM",
    amount: "₹800",
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    ground: "Champion Cricket Ground",
    sport: "Cricket",
    location: "Mohali",
    date: "08 July 2026",
    time: "8:00 AM - 10:00 AM",
    amount: "₹1200",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    ground: "Smash Badminton Club",
    sport: "Badminton",
    location: "Panchkula",
    date: "10 July 2026",
    time: "5:00 PM - 6:00 PM",
    amount: "₹500",
    status: "Cancelled",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
  },
];

function MyBookings() {
  return (
    <div className="booking-page">

      <div className="booking-header">
        <h1>📅 My Bookings</h1>
        <p>Manage your booked grounds and upcoming matches.</p>
      </div>

      <div className="booking-list">

        {bookings.map((booking) => (
          <div className="booking-card" key={booking.id}>

            <img
              src={booking.image}
              alt={booking.ground}
            />

            <div className="booking-details">

              <h2>{booking.ground}</h2>

              <p><strong>Sport:</strong> {booking.sport}</p>

              <p><strong>Location:</strong> {booking.location}</p>

              <p><strong>Date:</strong> {booking.date}</p>

              <p><strong>Time:</strong> {booking.time}</p>

              <p><strong>Amount:</strong> {booking.amount}</p>

            </div>

            <div className="booking-status">

              <span
                className={`status ${booking.status.toLowerCase()}`}
              >
                {booking.status}
              </span>

              <button className="details-btn">
                View Details
              </button>

              {booking.status === "Upcoming" && (
                <button className="cancel-btn">
                  Cancel Booking
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyBookings;