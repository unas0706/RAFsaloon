import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
  },
  { _id: false }
);

const statsSchema = new mongoose.Schema(
  {
    totalBookings: { type: Number, default: 0 },
    activeMembers: { type: Number, default: 0 },
    monthlyRevenue: { type: Number, default: 0 },
    customerRating: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  { _id: false }
);

const franchiseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    contact: { type: String },
    address: { type: String },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Pending", "Inactive"],
    },
    established: { type: String },
    stats: statsSchema,
  },
  { timestamps: true }
);

const Franchise = mongoose.model("Franchise", franchiseSchema);
export default Franchise;
