import jwt from "jsonwebtoken";
import FranchiseOwner from "../Models/Owner.model.js";
import Admin from "../Models/Admin.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token payload
    const owner = await FranchiseOwner.findById(decoded.id).populate(
      "franchise"
    );

    if (!owner) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.owner = owner;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Not authorized", error: err.message });
  }
};

// Middleware to check if user is owner of the franchise
export const isOwner = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for token in header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get admin from DB using ID in token payload
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach admin to request
    req.admin = admin;

    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized", error: err.message });
  }
};
