import express from "express";
import { loginAdmin, createAdmin } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/create", verifyToken, createAdmin); // only authenticated main admin can create new admins

export default router;
