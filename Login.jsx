import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded demo creds
    const OK_EMAIL = "test@example.com";
    const OK_PASS = "12345";

    if (email === OK_EMAIL && password === OK_PASS) {
      setIsLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue exploring</p>

        {error && <div className="login-error">{error}</div>}

        <label className="login-label">
          Email
          <input
            type="email"
            className="login-input"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="login-label">
          Password
          <input
            type="password"
            className="login-input"
            placeholder="12345"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}
