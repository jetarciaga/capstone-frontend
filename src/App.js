import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";

import PrivateRoute from "./routes/PrivateRoute";
import { Route, Routes, Navigate } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Calendar from "./components/Calendar";
import Appointment from "./components/Appointment";
import api from "./components/api";

const App = () => {
  const auth = useAuth();
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // const fetchUser = async (user) => {
  //   setLoading(true);
  //   try {
  //     const response = await api.get("users/");
  //     localStorage.setItem("user", user);
  //     // setUser(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <main className="App">
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
    </main>
  );
};

export default App;
