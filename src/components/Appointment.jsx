import { useState, useCallback, useEffect } from "react";
import "./Appointment.scss";
import Calendar from "./Calendar";
import api from "./api";

const Appointment = () => {
  const [formData, setFormData] = useState({
    user: JSON.parse(localStorage.getItem("user")).id,
    date: new Date().toISOString().slice(0, 10),
    purpose: 10,
    timeslot: "",
    status: "pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const setAppointmentFromCalendar = useCallback(
    (date) => setAppointmentDate(date).toISOString().slice(0, 10),
    []
  );
  const [timeslots, setTimeslots] = useState([]);
  const setTimeslotsFromDate = useCallback(
    (timeslots) => setTimeslots(timeslots.available_slots),
    []
  );

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("documents/");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [requirements, setRequirements] = useState([]);
  useEffect(() => {
    api
      .get(`requirements/${formData.purpose}/`)
      .then((response) => setRequirements(response.data))
      .catch((error) => console.error(error));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "purpose") {
      console.log(e.target.value);
      api
        .get(`requirements/${e.target.value}/`)
        .then((response) => setRequirements(response.data))
        .catch((error) => console.log(error));
    }
  };

  const updateProperty = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <div className="appointment-container">
      <Calendar onValueChange={updateProperty} setTime={setTimeslotsFromDate} />
      <form className="schedule-form" onSubmit={handleSubmit}>
        <label htmlFor="document">Choose Document:</label>
        <select id="purpose" name="purpose" onChange={handleChange}>
          <option value="" disabled>
            Choose Document
          </option>
          {[...documents].map((document, index) => (
            <option key={index} value={document.id}>
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
        {/* <input
          type="date"
          value={appointmentDate.toISOString().slice(0, 10)}
          onChange={() => {}}
        /> */}
        <label htmlFor="timeslot">Choose available time:</label>
        <select id="timeslot" name="timeslot" onChange={handleChange}>
          <option value="" disabled>
            Choose time
          </option>
          {[...timeslots].map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
};

export default Appointment;
