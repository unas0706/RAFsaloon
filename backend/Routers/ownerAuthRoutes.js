import express from "express";
import {
  registerOwner,
  loginOwner,
  logoutOwner,
  me,
  changePassword,
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

export default ownerAuthRoutes;
