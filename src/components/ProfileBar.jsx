import React, { useRef, useState, useEffect } from "react";
import "./ProfileBar.scss";
import { useAuth } from "../context/AuthProvider";
import api from "./api";
import { handleExternalLinks } from "../utils/externalLinks";
import { useNavigate } from "react-router-dom";

const ProfileBar = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();
  const [user, setUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
  }); // State for user data
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load user data from localStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/users/");
        setUser(
          Array.isArray(response.data) ? response.data[0] : response.data
        );
        console.log(user);
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
          <i className="bx bxs-down-arrow" />
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => navigate(`/user-profile/${user.id}`)}>
              My Profile
            </li>
            <li onClick={() => logout()}>Logout</li>
          </ul>
        )}
      </div>
      <hr />
      <ul className="right-navbar">
        <li
          onClick={() => {
            navigate("/announcements");
          }}
        >
          <i className="bx bxs-megaphone" />
          Announcements
        </li>
        <li
          onClick={() => {
            navigate("/careers");
          }}
        >
          <i className="bx bxs-award" />
          Careers
        </li>
        <li
          onClick={() => {
            handleExternalLinks(
              "https://muntinlupacity.gov.ph/barangays/brgy-putatan/"
            );
          }}
        >
          <i className="bx bxs-user-voice" />
          About Us
        </li>
      </ul>
      <div className="copyright">
        <div className="social">
          <i
            className="bx bxl-facebook-circle"
            onClick={() => {
              handleExternalLinks(
                "https://www.facebook.com/putatanmuntinlupa.official"
              );
            }}
          />
          <i className="bx bxl-instagram-alt disabled" />
          <i
            className="bx bxl-twitter"
            onClick={() => {
              handleExternalLinks("https://x.com/OFFICIALMUNTI/");
            }}
          />
        </div>
        <p>&copy; 2024 PLMun Students Capstone.</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};

export default ProfileBar;
