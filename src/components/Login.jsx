import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="title">
          <h1>
            Barangay <span style={{ fontWeight: 900 }}>Putatan</span>
          </h1>
          <h2>Online Appointment System</h2>
        </div>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <a href="#" className="forgot-password">
          Forgot password?
        </a>
        <hr />
        <a role="button" id="sign-up">
          Sign up
        </a>
      </form>
    </div>
  );
};

export default Login;
