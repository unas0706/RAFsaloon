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
import adminRouter from "./Routers/admin.router.js";

dotenv.config({ path: "./.env" });

if (!process.env.PORT) process.env.PORT = "5000";

const app = express();

//adding middlewares

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});

// Use routes
app.use("/api/owners", ownerAuthRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/franchise", franchiseRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

//return app
export default app;
