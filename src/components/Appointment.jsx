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

  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("documents/");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error retrieving documents", error);
      }
    };
    fetchDocuments();
  }, []);

  const [selectedDocument, setSelectedDocument] = useState([]);
  const handleSelectedDocument = async (event) => {
    setSelectedDocument(event.target.value);
  };

  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    api
      .get(`requirements/${selectedDocument}/`)
      .then((response) => setRequirements(response.data))
      .catch((error) => console.error(error));
  }, [selectedDocument]);

  return (
    <div className="appointment-container">
      <Calendar setDate={setAppointmentDate} setTime={setTimeslotsFromDate} />
      <form className="schedule-form" onSubmit={handleSubmit}>
        <label htmlFor="document">Choose Document:</label>
        <select id="document" name="document" onChange={handleSelectedDocument}>
          <option value="" disabled>
            Choose Document
          </option>
          {[...documents].map((document, index) => (
            <option key={index} value={document.name} details={document}>
              {document.name}
            </option>
          ))}
        </select>
        <div className="requirements">
          <ul>
            {requirements &&
              requirements.map((value, index) => (
                <li key={index}>{value.name}</li>
              ))}
          </ul>
        </div>
        <input
          type="date"
          value={appointmentDate.toISOString().slice(0, 10)}
          onChange={() => {}}
        />
        <label htmlFor="time">Choose available time:</label>
        <select id="time" name="time">
          <option value="" disabled>
            Choose time
          </option>
          {[...timeslots].map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Appointment;
