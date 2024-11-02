import React, { useEffect, useState } from "react";
import api from "./api";
import { useAuth } from "../context/AuthProvider";
import Appointment from "./Appointment";
import Calendar from "./Calendar";

const Dashboard = () => {
  const { accessToken } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("users/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Appointment />
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
};

export default Dashboard;
