import express from "express";
import {
  addSubscriber,
  getSubscribers,
  deleteSubscriber,
  sendCustomMail,
} from "../controllers/subscribeController.js";

const router = express.Router();

router.post("/subscribe", addSubscriber); // user subscribes
router.get("/subscribers", getSubscribers); // admin view all
router.delete("/subscriber/:id", deleteSubscriber); // admin delete
router.post("/send", sendCustomMail); // admin broadcast mail

export default router;
