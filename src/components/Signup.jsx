import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    email: "",
    password: "",
    password2: "",
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
        "http://localhost:8000/auth/users/",
        formData
      );
      MySwal.fire({
        icon: "success",
        title: "User created successfully!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/");
      });
      console.log("Signup success:", response.data);
    } catch (error) {
      console.log("Signup error:", error.response);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create user. Please try again.",
      });
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
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First name"
          />
          <input
            className="full-width"
            type="text"
            name="lastname"
            value={formData.lastname}
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
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Confirm password"
        />
        <button type="submit">Create Account</button>
        <Link to="/" className="account-login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
