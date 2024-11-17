import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import api from "./api";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  if (loading) return <p> Loading...</p>;
  console.log(data);

  return (
    <nav>
      <h2>Barangay Putatan Online Appointment System</h2>
      <ul>
        <li
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <i className="bx bxs-home-alt-2" />
          <span>Home</span>
        </li>
        <li
          onClick={() => {
            navigate("/appointment");
          }}
        >
          <i className="bx bxs-calendar" />
          <span>Schedule Appointment</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
