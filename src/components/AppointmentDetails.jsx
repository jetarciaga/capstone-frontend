import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import "./AppointmentDetails.scss";
import { convertDate, convertTime } from "../utils/scheduleHelpers";

const AppointmentDetails = ({ appointment }) => {
  const [requirements, setRequirements] = useState(null);
  const [user, setUser] = useState("");

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
        <ul>
          <li className="info-group">
            <h2>Purpose</h2>
            <span>:</span>
            <p>{appointment.purpose_name}</p>
          </li>
          <li className="info-group">
            <h2>Date</h2>
            <span>:</span>
            <p>{convertDate(appointment.date)}</p>
          </li>
          <li className="info-group">
            <h2>Time</h2>
            <span>:</span>
            <p>{convertTime(appointment.timeslot)}</p>
          </li>
          <li className="info-group">
            <h2>Requested By</h2>
            <span>:</span>
            <p>{user.firstname + " " + user.lastname}</p>
          </li>
        </ul>
        <hr />
        <div className="requirements">
          <h2>Requirements</h2>
          <span>:</span>
          <ul>
            {requirements &&
              requirements.map((value, index) => (
                <li key={index}> {value.name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
