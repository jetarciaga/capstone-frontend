import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-wrapper">
      <div className="login-container">
        <div className="message">
          <h2>Take advantage of the lively district of Putatan Muntinlupa</h2>
          <h3>-avail online services and make your requests effortlessly</h3>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="title">
            <h1>
              Barangay <span style={{ fontWeight: 900 }}>Putatan</span>
            </h1>
            <h2>E-Serbisyo Appointment System</h2>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Login</button>
          <a href="www.google.com" className="forgot-password">
            Forgot password?
          </a>
          <hr />
          <button id="sign-up" onClick={handleClick}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
