import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
    date: { type: String, required: true }, // ISO date (e.g., "2025-05-03")
    time: { type: String, required: true }, // Time (e.g., "10:00 AM")
    service: { type: String, required: true },
    status: {
      type: String,
      enum: ["confirmed", "completed", "cancelled"],
      default: "confirmed",
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
