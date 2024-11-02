import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import api from "./api";
import "./Navbar.scss";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("users/");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <p> Loading...</p>;
  console.log(data);

  return (
    <nav>
      <div className="left-side">sample</div>
      <div id="logo">
        <h2>Barangay Putatan Online Appointment System</h2>
      </div>
      <div className="profile" onClick={toggleDropdown}>
        <button>
          {data instanceof Array ? (
            <p style={{ fontSize: "0.6em", textTransform: "uppercase" }}>
              Admin
            </p>
          ) : (
            data.firstname.charAt(0) + data.lastname.charAt(0)
          )}
        </button>

        {isOpen && (
          <ul className="dropdown-menu">
            <li>Settings</li>
            <li onClick={() => logout()}>Logout</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
