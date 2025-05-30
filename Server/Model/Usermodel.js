import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyotp: { type: String, default: "" },
  verifyotpExperyAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetotp: { type: String, default: "" },
  resetotpExperyAt: { type: Number, default: 0 },
});

const usermodel = mongoose.models.user || mongoose.model("user", userschema);

export default usermodel;
