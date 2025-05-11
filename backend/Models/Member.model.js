import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    joinDate: { type: String, required: true }, // Format: "YYYY-MM-DD"
    visits: { type: Number, default: 0 }, // Total number of salon visits
    membership: {
      type: String,
      enum: ["Standard", "Premium", "VIP"],
      default: "Standard",
    },
    subscription: {
      type: String,
      enum: ["Monthly", "Yearly", "None"],
      default: "None",
    },
    subscriptionEnd: { type: String }, // Optional ISO date
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
export default Member;
