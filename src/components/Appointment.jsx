import { useState, useCallback } from "react";
import "./Appointment.scss";
import Calendar from "./Calendar";

const Appointment = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const setAppointmentFromCalendar = useCallback(
    (date) => setAppointmentDate(date),
    []
  );
  return (
    <div className="appointment-container">
      <Calendar setDate={setAppointmentDate} />
      <form onSubmit={handleSubmit}>
        <input type="date" value={appointmentDate.toISOString().slice(0, 10)} />
      </form>
      {/* <p>{appointmentDate.toISOString().slice(0, 10)}</p> */}
    </div>
  );
};

export default Appointment;
