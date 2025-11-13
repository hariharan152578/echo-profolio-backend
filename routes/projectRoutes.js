import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Multer configuration (Reuse logic or keep separate)
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
router.get("/", getProjects);
// "image" is the key expected in the form-data from frontend
router.post("/", upload.single("image"), createProject); 
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

export default router;