import React, { useEffect, useState } from "react";
import api from "./api";
import { useAuth } from "../context/AuthProvider";
import "./Dashboard.scss";
import AppointmentDetails from "./AppointmentDetails";
import { convertDate, convertTime } from "../utils/scheduleHelpers";

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("date");

  const handleFilterSelection = (e) => {
    setSelectedFilter(e.target.value);
  };

  const fetchAppointments = () => {
    api
      .get("appointments/")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error(error));
  };

  const filterDate = (e) => {
    api
      .get(`appointments/?date=${e.target.value}`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error(error));
  };

  const filterReferenceNo = (e) => {
    api
      .get(`appointments/?reference_number=${e.target.value}`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error(error));
  };

  const fetchAllAppointments = (e) => {
    if (e) {
      e.target.value = "";
    }
    fetchAppointments();
  };

  useEffect(() => {
    if (user) {
      if (user.is_staff) {
        const today = new Date().toISOString().split("T")[0];
        document.getElementById("date").value = today;
        api
          .get(`appointments/?date=${today}`)
          .then((response) => setAppointments(response.data))
          .catch((err) => console.error(err));
      } else {
        document.getElementById("date").value = "";
        fetchAppointments();
      }
    }
  }, [user]);

  useEffect(() => {
    if (appointments.length > 0) {
      setSelectedAppointment(appointments[0]);
    }
  }, [appointments]);

  return (
    <div className="dashboard">
      <h1 style={{ alignSelf: "flex-start" }}>Featured Appointment</h1>
      <hr />
      <AppointmentDetails
        appointment={selectedAppointment}
        refreshAppointments={fetchAppointments}
      />
      <div className="appointment-header">
        <h1>List of Appointments ({appointments.length})</h1>
        <div className="filter-wrapper">
          <div className="filter-selection">
            <p>Filter by:</p>
            <select value={selectedFilter} onChange={handleFilterSelection}>
              <option value="reference_number">Reference Number</option>
              <option value="date">Date</option>
            </select>
          </div>

          <div className="filterResult">
            {selectedFilter === "reference_number" && (
              <label htmlFor="reference_number">
                <input
                  type="text"
                  id="reference_number"
                  onChange={filterReferenceNo}
                />
                <i className="bx bx-x" onClick={fetchAllAppointments} />
              </label>
            )}

            {selectedFilter === "date" && (
              <label htmlFor="date">
                <input type="date" id="date" onChange={filterDate} />
                <i className="bx bx-x" onClick={fetchAllAppointments} />
              </label>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="appointments-container">
        {[...appointments].map((value, index) => (
          <div key={index} onClick={() => setSelectedAppointment(value)}>
            <div className="schedule">
              <h2>{convertDate(value.date)}</h2>
              <h3>{convertTime(value.timeslot)}</h3>
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
