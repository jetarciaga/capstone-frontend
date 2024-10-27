import React from "react";
import "./Appointment.scss";

const Appointment = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Set an Appointment</h2>
      <select name="purpose-dropdown" id="purpose-dropdown">
        <option value="">Select appointment document</option>
        <option value="Barangay Clearance">Barangay Clearance</option>
        <option value="Barangay ID">Barangay ID</option>
      </select>
      <div className="date-time">
        <input type="date" id="appointment-date" name="appointment-date" />

        <select name="time-dropdown" id="time-dropdown">
          <option value="">Select a time</option>
          <option value="9:00">9:00 AM</option>
        </select>
      </div>
      <button>Set appointment</button>
    </form>
  );
};

export default Appointment;
