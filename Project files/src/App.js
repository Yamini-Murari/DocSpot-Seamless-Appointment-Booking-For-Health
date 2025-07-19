import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";

function App() {
  // Check if the user is logged in by verifying the token in localStorage
  const userLoggedIn = !!localStorage.getItem("authToken"); // Assuming you're storing JWT token in localStorage

  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />

            {/* If user is already logged in, redirect to user home */}
            <Route path="/login" element={userLoggedIn ? <Navigate to="/userhome" /> : <Login />} />

            <Route path="/register" element={<Register />} />

            {/* Protect routes that require the user to be logged in */}
            {userLoggedIn ? (
              <>
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/userhome" element={<UserHome />} />
                <Route path="/userhome/userappointments/:doctorId" element={<UserAppointments />} />
              </>
            ) : (
              // If not logged in, protect these routes and require login
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3">© 2023 Copyright: MediCareBook</div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
