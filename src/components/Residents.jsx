import React from "react";
import "./Residents.scss";
import { useEffect, useState } from "react";
import api from "./api";
import { convertDate } from "../utils/scheduleHelpers";

const Residents = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("users/?all=true");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="residents-container">
      <h1>List of Registered Residents</h1>
      <div className="user-table">
        <div className="header row">
          <p>User</p>
          <p>Email</p>
          <p>Birthday</p>
          <p>Date Joined</p>
        </div>
        {users.map((user, index) => (
          <div className="row" key={index}>
            <p>{user.firstname + " " + user.lastname}</p>
            <p>{user.email}</p>
            <p>{convertDate(user.birthday)}</p>
            <p>{convertDate(user.date_joined)}</p>
          </div>
        ))}
      </div>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstname + " " + user.lastname}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Residents;
