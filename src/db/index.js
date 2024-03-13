import mongoose from "mongoose";
import { DB_name } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
    console.log(`MongoDB connected!! DB Host: ${(await connectionInstance).connection.host}`)
  } catch (error) {
    console.log("ERR:MongoDB connection error", error);
    process.exit(1)
  }
};



export default connectDB
