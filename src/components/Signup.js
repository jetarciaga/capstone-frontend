import React, { useState } from "react";
import axios from "axios";
import "./Signup.scss";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/users",
        formData
      );
      console.log("Signup success:", response.data);
    } catch (error) {
      console.log("Signup error:", error.response);
    } finally {
      console.log("pass");
    }
  };

  return (
    <div className="signup-container">
      <h1>
        Barangay <span style={{ fontWeight: 900 }}>Putatan</span>
      </h1>
      <h2>Online Appointment System</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="title">
          <h3>Create Account</h3>
        </div>
        <div className="input-group">
          <input
            className="full-width"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          <input
            className="full-width"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
        <div className="input-group">
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <div className="birthday">
            <label htmlFor="birthday">Birthday</label>
            <input
              id="birthday"
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              placeholder="Birthday"
            />
          </div>
        </div>
        <div className="password-group full-width">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
        </div>
        <div className="button-container">
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
