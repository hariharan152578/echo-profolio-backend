import express from "express";
import {
  getCounts,
  createCount,
  updateCount,
  deleteCount,
} from "../controllers/countController.js";

const router = express.Router();

router.get("/", getCounts);
router.post("/", createCount);
router.put("/:id", updateCount);
router.delete("/:id", deleteCount);

export default router;
