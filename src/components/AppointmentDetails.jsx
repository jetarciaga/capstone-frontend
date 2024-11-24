import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import "./AppointmentDetails.scss";
import { convertDate, convertTime } from "../utils/scheduleHelpers";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [requirements, setRequirements] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    api
      .get(`appointments/${id}/`)
      .then((response) => {
        setAppointment(response.data);
      })
      .catch((error) => console.error("Error fetching appointment:", error));
  }, [id]);

  useEffect(() => {
    if (appointment) {
      api
        .get(`users/${appointment.user}/`)
        .then((response) => setUser(response.data))
        .catch((error) => console.error(error));

      api
        .get(`requirements/${appointment.purpose}/`)
        .then((response) => setRequirements(response.data))
        .catch((error) => console.error(error));
    }
  }, [appointment]);

  console.log("here", JSON.stringify(appointment));

  if (!appointment) {
    return <p>Loading...</p>;
  }
  return (
    <div className="appointment-details">
      <div className="appointment-status">
        <h1>{appointment.status.toUpperCase()}</h1>
        <p>see history...</p>
      </div>

      <div className="appointment-information">
        <div className="row">
          <div className="info-group">
            <h2>Purpose</h2>
            <p>{appointment.purpose_name}</p>
          </div>
          <div className="info-group">
            <h2>Date</h2>
            <p>{convertDate(appointment.date)}</p>
          </div>
        </div>

        <div className="row">
          <div className="info-group">
            <h2>Requested By</h2>
            <p>{user.firstname + " " + user.lastname}</p>
          </div>
          <div className="info-group">
            <h2>Time</h2>
            <p>{convertTime(appointment.timeslot)}</p>
          </div>
        </div>

        <div className="requirements">
          <div>
            <h2>Requirements</h2>
            <ul>
              {requirements &&
                requirements.map((value, index) => (
                  <li key={index}>{value.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;