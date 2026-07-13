import { useState } from "react";
import "./Signup.css";

function Signup() {
  const [role, setRole] = useState("USER");

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h1>GroundBook</h1>
        <p>Create your account</p>

        {/* Role Selection */}

        <div className="role-selector">

          <button
            className={role === "USER" ? "active" : ""}
            onClick={() => setRole("USER")}
          >
            Player
          </button>

          <button
            className={role === "OWNER" ? "active" : ""}
            onClick={() => setRole("OWNER")}
          >
            Ground Owner
          </button>

        </div>

        <form>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
            />
          </div>

          {/* Owner Fields */}

          {role === "OWNER" && (
            <>
              <div className="input-group">
                <label>Business Name</label>
                <input
                  type="text"
                  placeholder="Enter business name"
                />
              </div>

              <div className="input-group">
                <label>Business Address</label>
                <textarea
                  rows="3"
                  placeholder="Enter business address"
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <button className="signup-btn">
            Sign Up as {role === "USER" ? "Player" : "Ground Owner"}
          </button>

        </form>

        <div className="login-link">
          Already have an account?
          <span> Login</span>
        </div>

      </div>
    </div>
  );
}

export default Signup;