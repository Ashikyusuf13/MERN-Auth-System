import express from "express";
import {
  isAuthenticated,
  Login,
  Logout,
  Register,
  resendotp,
  resetpassword,
  sendVerifyOtp,
  verifyemail,
} from "../Controller/userauth.js";
import userauth from "../Middleware/usermiddleware.js";

const authrouter = express.Router();

authrouter.post("/register", Register);
authrouter.post("/login", Login);
authrouter.post("/logout", Logout);
authrouter.post("/send-verify-otp", userauth, sendVerifyOtp);
authrouter.post("/verify-account", userauth, verifyemail);
authrouter.get("/is-auth", userauth, isAuthenticated);
authrouter.post("/send-Reset-otp", resendotp);
authrouter.post("/reset-password", resetpassword);

export default authrouter;
