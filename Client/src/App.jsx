import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import EmailVerify from "./pages/EmailVerify";
import Welcome from "./pages/welcome";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/EmailVerify" element={<EmailVerify />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
