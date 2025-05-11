import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Define the FranchiseOwner schema

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Franchise",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔐 Password hashing before saving
ownerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Compare password method
ownerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🪪 JWT Token generation method
ownerSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Export the FranchiseOwner model
const FranchiseOwner = mongoose.model("FranchiseOwner", ownerSchema);

export default FranchiseOwner;
