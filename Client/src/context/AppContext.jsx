import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendurl = "https://mern-auth-system-po18.onrender.com";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  /* const getAuthstate = async () => {
    try {
      const { data } = await axios.get(backendurl + "/user/auth/is-auth");

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }; */

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(backendurl + "/user/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/data");
      data.success ? setUserData(data.user) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /* useEffect(() => {
    getAuthstate();
  }, []); */

  const value = {
    backendurl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
