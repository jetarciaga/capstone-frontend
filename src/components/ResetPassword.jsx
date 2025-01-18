import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import "./ResetPassword.scss";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match.");
      setSuccess("");
      return;
    }

    try {
      const response = await api.post("auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: password,
      });
      setSuccess("Password reset successful!");
      setError("");
      console.log("Password reset successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error(
        error.response?.data?.detail ||
          "Error resetting password. Please try again."
      );
      setError(error.response.data.new_password[0]);
      console.error(error.response.data.new_password[0]);
      //   setError(error.response.data);
      console.error("Error resetting password:", error.response.data);
    }
  };
  return (
    <div className="bg-wrapper">
      <div className="reset-password-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleReset}>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleReset}>Reset Password</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
