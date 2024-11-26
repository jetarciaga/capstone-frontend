import React, { useEffect, useState } from "react";
import api from "./api";
import "./AppointmentDetails.scss";
import { convertDate, convertTime } from "../utils/scheduleHelpers";
import { sortHistoryByTimestamp } from "../utils/statHistoryHelper";
import { useAuth } from "../context/AuthProvider";

const AppointmentDetails = ({ appointment }) => {
  const { user } = useAuth();
  const [requirements, setRequirements] = useState(null);
  const [appointmentUser, setAppointmentUser] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  useEffect(() => {
    if (appointment) {
      api
        .get(`users/${appointment.user}/`)
        .then((response) => setAppointmentUser(response.data))
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
        <div className="status">
          {user.is_staff && (
            <div className="update-button">
              <i className="bx bxs-x-square cancel-appointment" />
              <span className="tooltip cancel">Cancel this appointment</span>
            </div>
          )}
          <h1>{appointment.status.toUpperCase()}</h1>
          {/* <p>{JSON.stringify(user)}</p> */}
          {user.is_staff && (
            <div className="update-button">
              <i className={`bx bxs-right-arrow-square next-status`} />
              <span className="tooltip next">Update to next status</span>
            </div>
          )}
        </div>
        <p onClick={toggleHistory}>
          {showHistory ? "<< go back" : "see history..."}
        </p>
      </div>
      {showHistory ? (
        <div className="status-history">
          {appointment.status_history &&
          appointment.status_history.length > 0 ? (
            sortHistoryByTimestamp(appointment.status_history).map(
              (value, index) => (
                <div className="history-detail" key={index}>
                  <p className="stat">Status {value.status.toUpperCase()}</p>
                  <span>|</span>
                  <p>Timestamp {value.timestamp}</p>
                </div>
              )
            )
          ) : (
            <h2>No history yet.</h2>
          )}
        </div>
      ) : (
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
              <p>
                {appointmentUser.firstname + " " + appointmentUser.lastname}
              </p>
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
      )}
    </div>
  );
};

export default AppointmentDetails;
