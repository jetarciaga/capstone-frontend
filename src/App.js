import "./App.css";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";

import PrivateRoute from "./routes/PrivateRoute";
import { Route, Routes, Navigate } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";

const App = () => {
  const auth = useAuth();
  const [userData, setUserData] = useState(null);

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
      </Routes>
    </main>
  );
};

export default App;
