import express from "express";
import {
  createBooking,
  getBookings,
  getBookingsByUser,
} from "../Controllers/bookingController.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";

const bookingRouter = express.Router();

// Create a new booking - requires authentication
bookingRouter.post("/", createBooking);

// Get all bookings - requires authentication
bookingRouter.get("/", isAuthenticated, getBookings);

// Get bookings by user ID - requires authentication
bookingRouter.get("/user/:userId", isAuthenticated, getBookingsByUser);

export default bookingRouter;
