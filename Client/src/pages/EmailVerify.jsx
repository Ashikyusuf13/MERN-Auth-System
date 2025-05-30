import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendurl, userData, getUserData, isLoggedin } =
    useContext(AppContent);

  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill(""));

  // Handle input change
  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Move to next input if value entered
    if (value && idx < 5) {
      document.getElementById(`otp-input-${idx + 1}`).focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    // Move to previous input if backspace pressed
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-input-${idx - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpval = otp.join("");
    try {
      const { data } = await axios.post(
        backendurl + "/user/auth/verify-account",
        {
          userId: userData._id, // send userId and otp as required by backend
          otp: otpval,
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountverified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-38 absolute left-5 top-5 hover:cursor-pointer"
      />
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-900 p-10 w-fit text-center mb-5 sm:-96 shadow-lg text-indigo-300 rounded-lg text-sm">
          <h1 className="text-2xl text-blue-100">Email verify OTP</h1>
          <p>Enter the 6-digit code sent to your email id.</p>
          <div className="flex justify-center gap-2 mt-6 mb-4">
            {otp.map((digit, idx) => (
              <input
                onKeyDown={(e) => handleKeyDown(e, idx)}
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                className="w-10 h-12 text-center text-2xl rounded border border-blue-400 focus:outline-none focus:border-blue-700 bg-slate-800 text-indigo-100"
              />
            ))}
          </div>
          <button className="bg-gradient-to-br mt-2 from-violet-500 to-violet-950 w-full p-2 rounded-full text-xl text-indigo-100 hover:cursor-pointer hover:bg-gradient-to-tl">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerify;
