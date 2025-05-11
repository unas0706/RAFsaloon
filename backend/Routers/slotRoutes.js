import express from "express";
import {
  getAvailableSlots,
  createSlot,
  bookSlot,
} from "../Controllers/slotcontroller.js";
import { isAuthenticated, isOwner } from "../Middlewares/authMiddleware.js";

const slotRouter = express.Router();

// Get available slots for a specific date - public route
slotRouter.get("/:date", getAvailableSlots);

// Create a new slot (Owner only) - requires authentication and ownership
slotRouter.post("/", isAuthenticated, createSlot);

// Book a slot - requires authentication
slotRouter.put("/:slotId/book", isAuthenticated, bookSlot);

export default slotRouter;
