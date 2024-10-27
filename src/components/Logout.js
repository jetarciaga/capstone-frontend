import React from "react";
import { useAuth } from "../context/AuthProvider";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
