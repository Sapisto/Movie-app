import mongoose, { ConnectOptions } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://abdulazeezalasa:XIk3YMGHSEYLcBiR@cluster0.yjgg8tv.mongodb.net/movieappdb";
const db = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};
export default db;
