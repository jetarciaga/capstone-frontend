import { useState, useCallback, useEffect } from "react";
import "./Appointment.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Calendar from "./Calendar";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const MySwal = withReactContent(Swal);

const Appointment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: user ? user.id : null,
    date: new Date().toISOString().slice(0, 10),
    purpose: 1,
    timeslot: "",
    status: "pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("appointments/", formData);
      console.log("success:", response.data);

      MySwal.fire({
        icon: "success",
        title: "Schedule successfully created.",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        api.post("email/on_create", {
          recipient: user.email,
          reference_number: response.data.reference_no,
          user: user.firstname + " " + user.lastname,
          status: "pending",
          document: formData.purpose,
          time: formData.timeslot,
          date: formData.date,
          requirements,
        });
        navigate("/dashboard");
      });
    } catch (error) {
      console.error("error:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create appointment. Please try again.",
      });
    }
  };

  // const [appointmentDate, setAppointmentDate] = useState(new Date());
  // const setAppointmentFromCalendar = useCallback(
  //   (date) => setAppointmentDate(date).toISOString().slice(0, 10),
  //   []
  // );
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
    <div className="appointment">
      <h1>Schedule an Appointment</h1>
      <div className="appointment-container">
        <Calendar
          onValueChange={updateProperty}
          setTime={setTimeslotsFromDate}
        />
        <form className="schedule-form" onSubmit={handleSubmit}>
          <div className="input-group">
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
          </div>
          <div className="requirements">
            <p>Please prepare the following requirements: </p>
            <ul>
              {requirements &&
                requirements.map((value, index) => (
                  <li key={index}>{value.name}</li>
                ))}
            </ul>
          </div>
          <div className="input-group">
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
          </div>
          <button type="submit">Schedule Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
