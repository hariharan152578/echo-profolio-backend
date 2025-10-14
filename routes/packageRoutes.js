// backend/routes/packageRoutes.js
import express from "express";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

const router = express.Router();

router.get("/", getPackages);
router.post("/", createPackage);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);
router.get("/test", (req, res) => {
  res.json({ message: "Package route connected successfully!" });
});


export default router;
