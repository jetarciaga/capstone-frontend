import React, { useEffect, useState } from "react";
import api from "./api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./AppointmentDetails.scss";
import { convertDate, convertTime } from "../utils/scheduleHelpers";
import { sortHistoryByTimestamp } from "../utils/statHistoryHelper";
import { useAuth } from "../context/AuthProvider";

const MySwal = withReactContent(Swal);

const AppointmentDetails = ({ appointment, refreshAppointments }) => {
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

  const updateStatus = async () => {
    const mapping = {
      pending: "ongoing",
      ongoing: "done",
    };

    try {
      const result = await MySwal.fire({
        title: "Update appointment status?",
        text: "Appointment will proceed to next step",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });
      if (result.isConfirmed) {
        const response = await api.patch(`appointments/${appointment.id}/`, {
          status: mapping[appointment.status],
        });
        const email = await api.post("email/on_update", {
          recipient: appointmentUser.email,
          user: user.firstname + " " + user.lastname,
          status: mapping[appointment.status],
          document: appointment.purpose,
          time: appointment.timeslot,
          date: appointment.date,
          requirements,
        });
        console.log("success:", response.data);

        refreshAppointments();
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      await MySwal.fire(
        "Error",
        "There was a problem updating the appointment",
        "error"
      );
    }
  };

  const cancelAppointment = async () => {
    try {
      const result = await MySwal.fire({
        title: "Cancel this appointment?",
        text: "You won't be able to revet this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (result.isConfirmed) {
        const response = await api.patch(`appointments/${appointment.id}/`, {
          status: "cancelled",
        });
        console.log("success:", response.data);
        const email = await api.post("email/on_cancel", {
          recipient: appointmentUser.email,
          user: user.firstname + " " + user.lastname,
          status: "cancelled",
          document: appointment.purpose,
          time: appointment.timeslot,
          date: appointment.date,
          requirements,
        });
        refreshAppointments();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      await MySwal.fire(
        "Error",
        "There was a problem cancelling the appointment",
        "error"
      );
    }
  };

  const disableOlderDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(date);
    console.log(inputDate < today ? "disabled" : "");
    return inputDate < today ? "disabled" : "";
  };

  if (!appointment) {
    return <h1 style={{ textAlign: "center" }}>No appointments for today!</h1>;
  }

  return (
    <div className="appointment-details">
      <div className="appointment-status">
        <div className="status">
          {user.is_staff &&
            appointment.status !== "cancelled" &&
            appointment.status !== "done" && (
              <div
                className={`update-button ${disableOlderDate(
                  appointment.date
                )}`}
                onClick={
                  disableOlderDate(appointment.date)
                    ? () => {}
                    : cancelAppointment
                }
              >
                <i className="bx bxs-x-square cancel-appointment" />
                <span className="tooltip cancel">Cancel this appointment</span>
              </div>
            )}
          <h1>{appointment.status.toUpperCase()}</h1>
          {/* <p>{JSON.stringify(user)}</p> */}
          {user.is_staff &&
            appointment.status !== "cancelled" &&
            appointment.status !== "done" && (
              <div
                className={`update-button ${disableOlderDate(
                  appointment.date
                )}`}
                onClick={
                  disableOlderDate(appointment.date) ? () => {} : updateStatus
                }
              >
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
