import mongoose from "mongoose";

const Connectdb = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DataBase is connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URL}`);
  } catch (error) {
    console.error("Database connection is failed: ", error.message);
  }
};

export default Connectdb;
