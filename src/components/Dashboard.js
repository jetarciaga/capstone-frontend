import React, { useEffect, useState } from "react";
import api from "./api";
import { useAuth } from "../context/AuthProvider";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";
import AppointmentDetails from "./AppointmentDetails";
import { convertDate } from "../utils/scheduleHelpers";

const Dashboard = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("users/");
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  useEffect(() => {
    api
      .get("appointments/")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <AppointmentDetails />
      <div className="appointments-container">
        {[...appointments].map((value, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${value.id}/`);
            }}
          >
            <div className="schedule">
              <h2>{convertDate(value.date)}</h2>
              <h3>{value.timeslot.slice(0, -3)}</h3>
            </div>
            <h1>{value.purpose_name}</h1>
            <div className="status">
              <span>Status</span>
              <h2>{value.status.toUpperCase()}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
