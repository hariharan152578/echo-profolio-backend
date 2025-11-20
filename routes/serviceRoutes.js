// backend/routes/serviceRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

// Multer configuration (Same as testimonials)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join("uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getServices);
// Note: the form field name for the image should be "icon"
router.post("/", upload.single("icon"), createService); 
router.put("/:id", upload.single("icon"), updateService);
router.delete("/:id", deleteService);

export default router;