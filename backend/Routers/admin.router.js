import express from "express";
import { isOwner } from "../Middlewares/authMiddleware.js";
import {
  admin,
  adminChangePassword,
  EditAdmin,
  getFranchises,
  loginAdmin,
  logoutAdmin,
} from "../Controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/logout", isOwner, logoutAdmin);
adminRouter.get("/getAdmin", isOwner, admin);
adminRouter.post("/changePasswrod", isOwner, adminChangePassword, EditAdmin);
adminRouter.post("/edit", isOwner, EditAdmin);
adminRouter.get("/franchises", isOwner, getFranchises);

export default adminRouter;
