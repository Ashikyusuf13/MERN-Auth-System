import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import Connectdb from "./config/mongodb.js";
import dotenv from "dotenv";
import authrouter from "./Router/authrouter.js";
import userRouter from "./Router/userRouter.js"

const app = express();
dotenv.config();
await Connectdb();
const PORT = process.env.PORT || 3500;

const allowpages=["http://localhost:5173"]

app.use(express.json());
app.use(cookieparser());
app.use(cors({origin:allowpages, credentials: true }));

app.use("/user/auth", authrouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
