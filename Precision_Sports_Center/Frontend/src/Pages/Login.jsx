import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "@/lib/supabaseClient";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data?.user) {
        navigate("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Failed to sign in with Google.");
      console.error("Google sign-in error:", err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
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
              {error && (
                <div className="error-message" style={{ color: "#dc2626", marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#fef2f2", borderRadius: "0.5rem", fontSize: "0.875rem" }}>
                  {error}
                </div>
              )}

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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="helper-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="primary-btn" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              <div className="form-divider">
                <span>Or continue with</span>
              </div>

              <div className="social-grid">
                <button type="button" className="social-btn" onClick={handleGoogleSignIn} disabled={isLoading}>
                  <FontAwesomeIcon icon={faGoogle} />
                  Google
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