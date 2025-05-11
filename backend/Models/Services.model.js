const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, default: 60 }, // In minutes
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
