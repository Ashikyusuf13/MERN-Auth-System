import { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();
  const { userData, backendurl, setIsLoggedin, setUserData } =
    useContext(AppContent);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendurl + "/user/auth/logout");

      if (data.success) {
        await setIsLoggedin(false);
        await setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const verifyEmail = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendurl + "/user/auth/send-verify-otp"
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/EmailVerify");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-between items-center w-full absolute top-0 p-4">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        className="w-28 sm:w-30 hover:cursor-pointer"
      />

      {userData ? (
        <div
          className="font-bold w-10 h-10 flex justify-center items-center  text-white
         bg-gray-800 rounded-full mr-6 p-4 relative group"
          ref={dropdownRef}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          style={{ cursor: "pointer" }}
        >
          <div onClick={() => setShowDropdown((prev) => !prev)}>
            {userData.name[0].toUpperCase()}
          </div>

          {showDropdown && (
            <div className="hidden group-hover:block absolute top-8 right-0 bg-gray-800 w-30 text-indigo-300 rounded-lg z-10  ">
              <li className="list-none m-0 p-2 gap-2 cursor-pointer ">
                {!userData.isAccountverified && (
                  <ul
                    onClick={verifyEmail}
                    className="cursor-pointer px-1 py-2 hover:text-gray-300"
                  >
                    Verify Email
                  </ul>
                )}
                <ul
                  onClick={Logout}
                  className="cursor-pointer px-1 py-2 hover:text-gray-300 pr-10"
                >
                  Logout
                </ul>
              </li>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center border border-gray-800 rounded-full px-6 py-2 hover:bg-gray-400 gap-2 transition-all mr-4 cursor-pointer "
        >
          Login <img className="aspect-square" src={assets.arrow_icon} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
