// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/users/login", formData);

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/");
            } else {
                setError("Invalid response from server");
            }
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Login failed. Please check your credentials.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Login to your SportGrounds account</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                            autoComplete="current-password"
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="login-footer">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;