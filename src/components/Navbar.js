import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import api from "./api";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { accessToken, user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/users/");
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

  return (
    <nav>
      <h2>Barangay Putatan E-Serbisyo Online Appointment System</h2>
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
        {user && user.is_staff && (
          <li
            onClick={() => {
              navigate("/residents");
            }}
          >
            <i className="bx bxs-user-account" />
            <span>Resident's Record</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
