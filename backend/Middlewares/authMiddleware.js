import jwt from "jsonwebtoken";
import FranchiseOwner from "../Models/Owner.model.js";
import Admin from "../Models/Admin.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const owner = await FranchiseOwner.findById(decoded.id).populate(
      "franchise"
    );
    if (!owner) {
      return res.status(401).json({ message: "User not found" });
    }

    // Add user to request object
    req.owner = owner;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized", error: err.message });
  }
};

// Middleware to check if user is owner of the franchise
export const isOwner = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "User not found" });
    }

    // Add user to request object
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized", error: err.message });
  }
};
