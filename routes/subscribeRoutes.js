// import express from "express";
// import {
//   addSubscriber,
//   getSubscribers,
//   deleteSubscriber,
//   sendCustomMail,
// } from "../controllers/subscribeController.js";

// const router = express.Router();

// router.post("/subscribe", addSubscriber); // user subscribes
// router.get("/subscribers", getSubscribers); // admin view all
// router.delete("/subscriber/:id", deleteSubscriber); // admin delete
// router.post("/send", sendCustomMail); // admin broadcast mail

// export default router;


import express from "express";
import multer from "multer"; // 1. Import multer
import {
  addSubscriber,
  getSubscribers,
  deleteSubscriber,
  sendCustomMail,
} from "../controllers/subscribeController.js";

// 2. Configure multer for memory storage (to handle file buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/subscribe", addSubscriber); // user subscribes
router.get("/subscribers", getSubscribers); // admin view all
router.delete("/subscriber/:id", deleteSubscriber); // admin delete

// 3. Apply multer middleware to the /send route
// This tells multer to look for a single file in a form field named 'attachment'
router.post("/send", upload.single("attachment"), sendCustomMail);

export default router;