import { useState } from "react";
import "./Calendar.scss";
import api from "./api";

const Calendar = ({ onValueChange, setDate, setTime }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const isCurrentDay = (day) => {
    return (
      day + 1 === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
    );
  };

  const isSelectedDay = (day) => {
    return (
      selectedDate &&
      day + 1 === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const handleDayClick = async (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today) {
      setSelectedDate(clickedDate);
      onValueChange(
        "date",
        new Date(currentYear, currentMonth, day + 1).toISOString().slice(0, 10)
      );

      try {
        const response = await api.post("api/timeslots/", {
          selected_date: new Date(currentYear, currentMonth, day + 1)
            .toISOString()
            .slice(0, 10),
        });
        const data = response.data;
        // console.log(data.available_slots[0]);
        setTime(data);
        onValueChange("timeslot", [...data.available_slots][0]);
      } catch (error) {
        console.error("Error posting data", error);
      }
    }
  };

  return (
    <div className="calendar">
      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[currentMonth]},</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={prevMonth} />
          <i className="bx bx-chevron-right" onClick={nextMonth} />
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={`${isCurrentDay(day) ? "current-day" : ""} ${
              isSelectedDay(day) ? "selected-day" : ""
            } ${
              new Date(currentYear, currentMonth, day + 2) < new Date()
                ? "disabled-day"
                : ""
            }`}
            onClick={() => handleDayClick(day + 1)}
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
