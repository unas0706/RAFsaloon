import mongoose from "mongoose";
// Define the Slot schema

const slotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // Date of the slot
    startTime: { type: String, required: true }, // Slot start time (e.g. '10:00 AM')
    endTime: { type: String, required: true }, // Slot end time (e.g. '11:00 AM')
    isBooked: { type: Boolean, default: false }, // Slot status, true if booked
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
    }, // Franchise that owns the slot
  },
  { timestamps: true }
);

// Create and export the Slot model
const Slot = mongoose.model("Slot", slotSchema);
export default Slot;
