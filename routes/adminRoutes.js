// import express from "express";
// import { loginAdmin, createAdmin,getAllAdmins } from "../controllers/adminController.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/login", loginAdmin);
// router.post("/create", verifyToken, createAdmin); // only authenticated main admin can create new admins
// router.get("/", verifyToken, getAllAdmins);
// export default router;
import express from "express";
import {
  loginAdmin,
  createAdmin,
  getAllAdmins,
  updateAdmin, // 1. Import updateAdmin
  deleteAdmin, // 2. Import deleteAdmin
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Existing routes
router.post("/login", loginAdmin);
router.post("/create", verifyToken, createAdmin);
router.get("/", verifyToken, getAllAdmins);

// 3. Add the new routes for editing and deleting
router.put("/:id", verifyToken, updateAdmin);
router.delete("/:id", verifyToken, deleteAdmin);

export default router;