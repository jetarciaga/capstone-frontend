import React, { useRef, useState, useEffect } from "react";
import "./ProfileBar.scss";
import { useAuth } from "../context/AuthProvider";
import api from "./api";

const ProfileBar = () => {
  const { logout, accessToken } = useAuth();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
  }); // State for user data
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load user data from localStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("users/");
        setUser(
          Array.isArray(response.data) ? response.data[0] : response.data
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-container" ref={dropdownRef}>
      <div className="user-group">
        <i
          className="bx bxs-user-circle"
          style={{ fontSize: "4em", color: "#aeaeae" }}
        ></i>
        <div className="user-details">
          <h2>{user.firstname + " " + user.lastname}</h2>
          <p>{user.is_staff ? "Admin" : "Resident"}</p>
        </div>
        <button onClick={() => setIsOpen((prevState) => !prevState)}>
          <i className="bx bxs-chevron-down" />
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            <li>Settings</li>
            <li onClick={() => logout()}>Logout</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileBar;
