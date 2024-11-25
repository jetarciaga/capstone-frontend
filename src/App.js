import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import ProfileBar from "./components/ProfileBar";

import PrivateRoute from "./routes/PrivateRoute";
import { Route, Routes, Navigate } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Calendar from "./components/Calendar";
import Appointment from "./components/Appointment";
import api from "./components/api";
import AppointmentDetails from "./components/AppointmentDetails";

const App = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <main
      className="App"
      style={{
        display: "flex",
        flexDirection: auth.isAuthenticated ? "row" : "column",
        columnGap: "2em",
        justifyContent: "space-between",
      }}
    >
      {auth.isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/appointment"
          element={
            <PrivateRoute>
              <Appointment />
            </PrivateRoute>
          }
        />
      </Routes>
      {auth.isAuthenticated && <ProfileBar />}
    </main>
  );
};

export default App;
