// src/components/Register.jsx
import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real submit logic (API)
    alert(`Register (demo)\n\nName: ${form.name}\nEmail: ${form.email}`);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create account</h2>

        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
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
              minLength={6}
            />
            <button
              type="button"
              className="toggle-pw"
              onClick={() => setShowPassword((s) => !s)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <button type="submit" className="btn-submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
