import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "VitalDrop" })
    .then(() => {
      console.log("DB connection established");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default connectDB;
