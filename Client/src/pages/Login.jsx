import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendurl, setIsLoggedin, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const [state, setState] = useState("sign up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "sign up") {
        const { data } = await axios.post(backendurl + "/user/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(error.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/user/auth/login", {
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gradient-to-br from-blue-500 to-transparent pt-15">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-30 absolute left-5 sm:top-4 -top-7.5 hover:cursor-pointer"
      />
      <div className="bg-slate-900  p-10 w-fit text-center mb-5 sm:-96 shadow-lg text-indigo-300 rounded-lg text-sm ">
        <h1 className="text-4xl ">
          {state === "sign up" ? "Create Account" : "Login"}
        </h1>
        <h3 className="text-gray-400">
          {state === "sign up" ? "Create Your Account" : "Login Your Account"}
        </h3>
        <form onSubmit={handleSubmit}>
          {state === "sign up" && (
            <div className="flex flex-col mb-4 border border-blue-200 rounded-full p-2 mt-5">
              <img className="w-4 h-4 absolute" src={assets.person_icon} />
              <input
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Username"
                className="px-7 outline-none "
              />
            </div>
          )}

          <div className="flex flex-col mb-4 border border-blue-200 rounded-full p-2 mt-5">
            <img src={assets.mail_icon} alt="" className="w-4 h-4 absolute" />
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Id"
              className="px-7 outline-none"
            />
          </div>

          <div className="flex flex-col mb-4 border border-blue-200 rounded-full p-2 mt-5 relative">
            <img
              src={assets.lock_icon}
              alt=""
              className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="px-7 outline-none w-full"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                // Eye-off SVG (hide password)
                <svg
                  xmlns="https://png.pngtree.com/png-clipart/20220602/original/pngtree-closed-eye-icon-color-flat-png-image_7872276.png"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#2563eb"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                // Eye SVG (show password)
                <svg
                  xmlns="https://static.vecteezy.com/system/resources/thumbnails/014/569/578/small_2x/eye-icon-simple-flat-eye-design-vision-care-concept-wear-glasses-for-a-clear-vision-png.png"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#2563eb"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </span>
          </div>
          {state === "sign up" ? null : (
            <p
              onClick={() => navigate("/ResetPassword")}
              className="text-blue-700 mt-2 mb-3 flex justify-start cursor-pointer hover:text-indigo-300"
            >
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            className="w-full  bg-gradient-to-r from-blue-400 to-blue-900
           p-3 rounded-full text-xl text-indigo-100 hover:cursor-pointer hover:bg-gradient-to-tr"
          >
            {state === "sign up" ? "Sign Up" : "Login"}
          </button>

          {state === "sign up" ? (
            <p className="mt-3">
              Already have an account?{" "}
              <span
                onClick={() => setState("")}
                className=" text-blue-700 hover:text-indigo-200 hover:cursor-pointer "
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="mt-3">
              Don't have an account?{" "}
              <span
                onClick={() => setState("sign up")}
                className="text-blue-700 hover:text-indigo-200 hover:cursor-pointer"
              >
                Sign up here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
