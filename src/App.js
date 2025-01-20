import "./App.scss";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileBar from "./components/ProfileBar";
import Residents from "./components/Residents";

import PrivateRoute from "./routes/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Appointment from "./components/Appointment";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const auth = useAuth();

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
        <Route
          path="/residents"
          element={
            <PrivateRoute>
              <Residents />
            </PrivateRoute>
          }
        />

        <Route
          path="/user-profile/:id"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route path="/reset/password/:uid/:token" element={<ResetPassword />} />
      </Routes>

      {auth.isAuthenticated && <ProfileBar />}
    </main>
  );
};

export default App;
