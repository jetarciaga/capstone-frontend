import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import api from "./api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState({ msg: "", style: {} });

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

  const handleResetPassword = async () => {
    try {
      await api.post("auth/users/reset_password/", { email: resetEmail });
      setResetMessage({
        msg: "Password reset email sent. Check your inbox.",
        color: "green",
      });
    } catch (error) {
      setResetMessage({
        msg: "Failed to send reset email. Please try again.",
        color: "red",
      });
    }
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
          <p
            className="forgot-password"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Forgot password?
          </p>
          <hr />
          <button id="sign-up" onClick={handleClick}>
            Sign up
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Forgot Password</h2>
            <p>Enter your email address to receive a password reset link:</p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {resetMessage && (
              <p
                style={{ color: resetMessage.color }}
                className="reset-message"
              >
                {resetMessage.msg}
              </p>
            )}
            <div className="modal-actions">
              <button onClick={handleResetPassword}>Send Reset Link</button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setResetMessage("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
