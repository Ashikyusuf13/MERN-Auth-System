import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 flex justify-center items-center px-4">
      {/* Logo - always on top left */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-30 absolute left-5 top-2 hover:cursor-pointer z-10"
      />

      <div className="flex flex-col items-center bg-slate-900 p-6 sm:p-8 rounded-lg shadow-lg text-indigo-300 max-w-5xl w-full text-center z-0 mt-25 sm:mt-25">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
          Welcome to Complete MERN Authentication Webpage
        </h1>

        <p className="text-base sm:text-xl text-indigo-100 leading-relaxed">
          This MERN stack authentication system provides a secure and efficient
          solution for user registration, login, and session management using
          JSON Web Tokens (JWT). Passwords are robustly hashed with bcryptjs to
          ensure data security. The system incorporates email verification and
          password reset workflows through one-time passwords (OTPs) sent via
          Nodemailer, enhancing user account protection. Built on Express.js and
          MongoDB, the backend ensures reliable and scalable user data
          management. Middleware such as cookie-parser and CORS are implemented
          to securely handle cookies and cross-origin requests, adhering to
          modern web security standards.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
