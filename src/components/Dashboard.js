import React, { useEffect, useState } from "react";
import api from "./api";
import { useAuth } from "../context/AuthProvider";
import "./Dashboard.scss";
import AppointmentDetails from "./AppointmentDetails";
import { convertDate } from "../utils/scheduleHelpers";

const Dashboard = () => {
  const { accessToken } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  useEffect(() => {
    if (appointments.length > 0) {
      setSelectedAppointment(appointments[0]);
    }
  }, [appointments]);

  return (
    <div className="dashboard">
      <h1 style={{ alignSelf: "flex-start" }}>Featured Appointment</h1>
      <hr />
      <AppointmentDetails appointment={selectedAppointment} />
      <h1>List of Appointments</h1>
      <hr />
      <div className="appointments-container">
        {[...appointments].map((value, index) => (
          <div key={index} onClick={() => setSelectedAppointment(value)}>
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
