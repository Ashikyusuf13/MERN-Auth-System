import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const { backendurl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [newpassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otpa, setOtpa] = useState(0);
  const [isOtpsubmited, setIsOtpSubmited] = useState(false);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "Sending request to:",
        backendurl + "/user/auth/send-verify-otp"
      );

      const { data } = await axios.post(
        backendurl + "/user/auth/send-Reset-otp",
        { email }
      );
      console.log("Response data:", data);

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otparray = otp.map((e) => e);
    setOtpa(otparray.join(""));
    setIsOtpSubmited(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendurl + "/user/auth/reset-password",
        {
          email: email,
          otp: otpa,
          newpassword: newpassword,
        }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  text-center bg-gradient-to-br from-blue-300 to-purple-500 ">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        className="w-30  top-3 left-7 absolute hover:cursor-pointer"
      />

      {/* Reset Password Form */}
      {!isEmailSent && (
        <form onSubmit={(e) => onSubmitEmail(e)}>
          <div className=" bg-slate-900  p-10 w-fit text-center mb-5 sm:-96 shadow-lg text-indigo-300 rounded-lg text-sm ">
            <h1 className="text-2xl text-indigo-100 mb-2 font-bold">
              Reset Password
            </h1>
            <p className="mb-2 ">Enter your registered email address</p>

            <div className="flex border border-indigo-100 rounded-full mt-2 mb-2 p-2 items-center">
              <img className="absolute " src={assets.mail_icon} />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="outline-none px-5"
                placeholder="Email Id"
              />
            </div>

            <button className="w-full bg-gradient-to-tr from-blue-400 to-violet-800 hover:bg-gradient-to-br hover:cursor-pointer rounded-full p-3 mt-3 text-xl text-indigo-100">
              Submit
            </button>
          </div>
        </form>
      )}

      {/* OTP Form */}

      {isEmailSent && !isOtpsubmited && (
        <form onSubmit={onSubmitOtp}>
          <div className="bg-slate-900 p-10 w-fit text-center mb-5 sm:-96 shadow-lg text-indigo-300 rounded-lg text-sm">
            <h1 className="text-2xl text-blue-100">Reset Password OTP</h1>
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
      )}

      {/* New Password Form */}

      {isOtpsubmited && isEmailSent && (
        <form onSubmit={onSubmitNewPassword}>
          <div className=" bg-slate-900  p-10 w-fit text-center mb-5 sm:-96 shadow-lg text-indigo-300 rounded-lg text-sm ">
            <h1 className="text-2xl text-indigo-100 mb-2 font-bold">
              New Password
            </h1>
            <p className="mb-2 ">Enter your new passwords</p>

            <div className="flex border border-indigo-100 rounded-full mt-2 mb-2 p-2 items-center">
              <img className="absolute " src={assets.lock_icon} />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newpassword}
                type="password"
                className="outline-none px-5"
                placeholder="New Password"
              />
            </div>

            <button className="w-full bg-gradient-to-tr from-blue-400 to-violet-800 hover:bg-gradient-to-br hover:cursor-pointer rounded-full p-3 mt-3 text-xl text-indigo-100">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
