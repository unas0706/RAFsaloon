import express from "express";
import {
  addFranchiseWithOwner,
  FranchiseNames,
  getAllFranchises,
  getFranchise,
  updateFranchise,
} from "../Controllers/franchiseController.js";
import { isAuthenticated, isOwner } from "../Middlewares/authMiddleware.js";

const franchiseRouter = express.Router();


franchiseRouter.get("/getFranchiseNames", FranchiseNames);

franchiseRouter.get("/allfranchises", getAllFranchises);

// Get franchise details - requires authentication
franchiseRouter.get("/:franchiseId", isAuthenticated, getFranchise);

// Update franchise details - requires authentication and ownership
franchiseRouter.patch("/:franchiseId", isAuthenticated, updateFranchise);

franchiseRouter.post("/addFranchise", isOwner, addFranchiseWithOwner);

export default franchiseRouter;
