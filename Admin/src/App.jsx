import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";
import Login from "./Components/Login/Login";  // Login page import pannunga
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "http://localhost:5001";

 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Logout function (optional)
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <ToastContainer />
      {/* Only show Navbar if logged in */}
      {isLoggedIn && <Navbar onLogout={handleLogout} />}

      <hr />

      <div className="admin-content">
        {/* Show Sidebar only if logged in */}
        {isLoggedIn && <Sidebar />}

        <Routes>
          {/* Login page route */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/list" />  // Already logged in, go dashboard
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </>
          ) : (
            // If not logged in, redirect any dashboard route to login
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
