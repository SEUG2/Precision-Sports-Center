// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data?.user) {
        alert("Registration successful! Please check your email to confirm your account.");
        navigate("/login");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-header">
        <h1>Welcome to Precision Sports Center. Great step towards fitness!</h1>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create account</h2>

        {error && (
          <div className="error-message" style={{ color: "#dc2626", marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#fef2f2", borderRadius: "0.5rem", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required disabled={isLoading} />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required disabled={isLoading} />
        </label>

        <label className="password-row">
          Password
          <div className="password-field">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              disabled={isLoading}
            />
            <button
              type="button"
              className="toggle-pw"
              onClick={() => setShowPassword((s) => !s)}
              aria-label="Toggle password visibility"
              disabled={isLoading}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
