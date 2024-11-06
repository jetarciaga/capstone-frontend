import { useState, useCallback, useEffect } from "react";
import "./Appointment.scss";
import Calendar from "./Calendar";
import api from "./api";

const Appointment = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const setAppointmentFromCalendar = useCallback(
    (date) => setAppointmentDate(date),
    []
  );
  const [timeslots, setTimeslots] = useState([]);
  const setTimeslotsFromDate = useCallback(
    (timeslots) => setTimeslots(timeslots.available_slots),
    []
  );

  return (
    <div className="appointment-container">
      <Calendar setDate={setAppointmentDate} setTime={setTimeslotsFromDate} />
      <form onSubmit={handleSubmit}>
        <input type="date" value={appointmentDate.toISOString().slice(0, 10)} />
        <label for="time">Choose available time:</label>
        <select id="time" name="time">
          <option value="" disabled>
            Choose time
          </option>
          {[...timeslots].map((time, index) => (
            <option key={index}>{time}</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Appointment;
