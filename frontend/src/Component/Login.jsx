import { useState } from "react";
import "./Login.css";

function Login() {
  const [role, setRole] = useState("USER");

  const handleSubmit = (e) => {
    e.preventDefault();

    // API Call
    console.log({
      role,
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>GroundBook</h1>
        <p>Welcome Back!</p>

        {/* Role Selection */}

        <div className="role-selector">

          <button
            type="button"
            className={role === "USER" ? "active" : ""}
            onClick={() => setRole("USER")}
          >
            Player
          </button>

          <button
            type="button"
            className={role === "OWNER" ? "active" : ""}
            onClick={() => setRole("OWNER")}
          >
            Ground Owner
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="options">

            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="/">Forgot Password?</a>

          </div>

          <button className="login-btn2">
            Login as {role === "USER" ? "Player" : "Ground Owner"}
          </button>

        </form>

        <div className="signup-link">
          Don't have an account?
          <span> Sign Up</span>
        </div>

      </div>
    </div>
  );
}

export default Login;