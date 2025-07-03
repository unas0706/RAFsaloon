import express from "express";
import {
  registerOwner,
  loginOwner,
  logoutOwner,
  me,
  changePassword,
  sendOTP,
  resetPassword,
} from "../Controllers/ownerAuthController.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";

const ownerAuthRoutes = express.Router();

// Register a new franchise owner
ownerAuthRoutes.post("/register", registerOwner);

// Login a franchise owner
ownerAuthRoutes.post("/login", loginOwner);

// Logout a franchise owner
ownerAuthRoutes.get("/logout", isAuthenticated, logoutOwner);
ownerAuthRoutes.get("/me", isAuthenticated, me);
ownerAuthRoutes.post("/changepass", isAuthenticated, changePassword);
ownerAuthRoutes.post("/sendOTP", sendOTP);
ownerAuthRoutes.post("/reset-password", resetPassword);

export default ownerAuthRoutes;
