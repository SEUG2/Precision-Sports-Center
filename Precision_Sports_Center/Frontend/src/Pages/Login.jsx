import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login attempt:", formData);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="login-page bg-background min-h-screen">
      <div className="login-wrap">
        <div className="login-box">
          <div className="auth-card">
            <div className="card-header">
              <div className="auth-avatar">P</div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-sub">Sign in to your Precision Sports account.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <div className="input-wrap">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="auth-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="helper-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="primary-btn">
                Sign In
              </button>

              <div className="form-divider">
                <span>Or continue with</span>
              </div>

              <div className="social-grid">
                <button type="button" className="social-btn">
                  <FontAwesomeIcon icon={faGoogle} />
                  Google
                </button>
                <button type="button" className="social-btn">
                  <FontAwesomeIcon icon={faFacebookF} />
                  Facebook
                </button>
              </div>

              <p className="signup-hint">
                Don&apos;t have an account? <Link to="/register">Sign up here</Link>
              </p>
            </form>
          </div>

          <p className="terms-copy">
            By signing in, you agree to our <Link to="/terms">Terms</Link> and
            <Link to="/privacy"> Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}