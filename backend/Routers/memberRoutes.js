import express from "express";

import {
  addMember,
  getMembers,
  updateMember,
} from "../Controllers/memberController.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";

const memberRouter = express.Router();

// Add a new member - requires authentication
memberRouter.post("/", isAuthenticated, addMember);

// Get all members - requires authentication
memberRouter.get("/", isAuthenticated, getMembers);

// Update member details - requires authentication
memberRouter.patch("/:memberId", isAuthenticated, updateMember);

export default memberRouter;
