import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL is not configured");
  }

  try {
    await mongoose.connect(mongoUrl, {
      dbName: "VitalDrop",
      serverSelectionTimeoutMS: 5000,
    });
    console.log("DB connection established");
  } catch (err) {
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  }
};

export default connectDB;
