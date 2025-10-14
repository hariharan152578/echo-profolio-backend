// backend/routes/testimonialRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

// Multer configuration
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
router.get("/", getTestimonials);
router.post("/", upload.single("avatar"), createTestimonial); // "avatar" is form-data field
router.put("/:id", upload.single("avatar"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
