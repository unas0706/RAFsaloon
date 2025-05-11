import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./Middlewares/errorHandler.js";
import ownerAuthRoutes from "./Routers/ownerAuthRoutes.js";
import bookingRoutes from "./Routers/bookingRoutes.js";
import franchiseRoutes from "./Routers/franchiseRoutes.js";
import memberRoutes from "./Routers/memberRoutes.js";
import slotRoutes from "./Routers/slotRoutes.js";

// Load environment variables with fallback
try {
  dotenv.config({ path: "./.env" });
} catch (err) {
  console.log("No .env file found, using default values");
  process.env.PORT = process.env.PORT || 5000;
  process.env.MONGO_URL =
    process.env.MONGO_URL || "mongodb://localhost:27017/vitaldrop";
  process.env.JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";
  process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
}

const app = express();

//adding middlewares

app.use(cookieParser());
app.use(
  cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(express.json());

// Use routes
app.use("/api/owners", ownerAuthRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/franchise", franchiseRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/slots", slotRoutes);

app.use(errorHandler);

//return app
export default app;
