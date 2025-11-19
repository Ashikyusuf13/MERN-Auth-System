import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const { userData } = useContext(AppContent);
  return (
    <div className="flex flex-col items-center mt-20 text-center pt-8 md:pt-0">
      <img
        className="w-46 h-46 rounded-full border border-sky-400 p-2 hover:border-sky-800 "
        src={assets.robot_img}
        alt=""
      />
      <h1 className="text-xl font-bold text-gray-800 mt-4">
        Hey {userData ? userData.name : "Developer"} !
        <img className="w-8  inline" src={assets.hand_wave} />
      </h1>
      <h1 className="text-5xl mb-5 ">Welcome to our app</h1>
      <p className="flex justify-center text-centerf mb-8 ">
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button
        onClick={() => navigate("/welcome")}
        className="px-6 cursor-pointer py-2 border border-gray-900 hover:bg-blue-400 hover:text-white transition500 rounded-full"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
