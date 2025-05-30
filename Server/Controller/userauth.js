import usermodel from "../Model/Usermodel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import transport from "../config/nodemailer.js";
import {EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE, WELCOME_TEMPLATE}  from "../config/emailTemplates.js";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Please enter the valid information",
    });
  }

  try {
    const existinguser = await usermodel.findOne({ email });

    if (existinguser) {
      return res.json({ success: false, message: "user already exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new usermodel({ name, email, password: hashedpassword });
    await user.save();

    const token = Jwt.sign({ id: user._id }, process.env.SECRETKEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_KEY === "production",
      sameSite: process.env.NODE_KEY === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //send the welcome mail
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome To Ashik Webpage",
      //text: `Welcome to Ashik Webpage. Your Account has been Created with email id: ${email}`,
      html:WELCOME_TEMPLATE.replace("{{email}}",user.email)
    };
    await transport.sendMail(mailOption);

    return res.json({
      success: true,
      message: "you Registred and Email send Successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Enter the valid info" });
  }

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invlid Password" });
    }

    const token = Jwt.sign({ id: user._id }, process.env.SECRETKEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_KEY === "production",
      sameSite: process.env.NODE_KEY === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Logged" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.SECRETKEY === "production",
      sameSite: process.env.SECRETKEY === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Log out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await usermodel.findById(userId);

    if (user.isAisAccountVerified) {
      return res.json({ success: false, message: "User Already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyotp = otp;
    user.verifyotpExperyAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verfication OTP",
      //text: `Your otp is ${otp}. Verify your Account by using this otp. `,
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        };

    await transport.sendMail(mailOption);

    return res.json({
      success: true,
      message: "Verfication otp is send on your Email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyemail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "OTP Incorrect" });
  }

  try {
    const user = await usermodel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (user.verifyotp == "" || user.verifyotp !== otp) {
      return res.json({ success: false, message: "Invalid Message" });
    }

    if (user.verifyotpExperyAt < Date.now()) {
      return res.json({ success: false, message: "OTP id Experied" });
    }

    user.isAccountVerified = true;
    user.verifyotp = "";
    user.verifyotpExperyAt = 0;

    await user.save();

    return res.json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const isAuthenticated = (req, res) => {
  try {
    return res.json({
      success: true,
      message: "User Authenticated Successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: "User is Not Authenticated" });
  }
};

export const resendotp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Enter Email" });
  }

  try {
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

   const notp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetotp = notp;
    user.resetotpExperyAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      //text: `Your OTP for resetting your password is ${notp} , use this OTP for proceed with resetting your Password.`,
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}",notp).replace("{{email}}",user.email)
    };

    await transport.sendMail(mailOption);
    return res.json({ success: true, message: "OTP is Send to you email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const resetpassword = async (req, res) => {
  const { email, otp, newpassword } = req.body;
  if (!email || !otp || !newpassword) {
    return res.json({
      success: false,
      message: "Invalid email,otp,newpassword",
    });
  }

  try {
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (user.resetotp == "" || user.resetotp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetotpExperyAt < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }

    const hashedpassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedpassword;
    user.resetotp = "";
    user.resetotpExperyAt = 0;

    await user.save();

    return res.json({ success: true, message: "Password Reset successfully" });
  } catch (error) {
    return res.json({ return: false, message: error.message });
  }
};
