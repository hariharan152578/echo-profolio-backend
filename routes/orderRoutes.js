// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// import {
//   createOrder,
//   getAllOrders,
//   updateOrderStatus,
//   deleteOrder,
// } from "../controllers/orderController.js";

// const router = express.Router();

// // --- Multer Configuration for Screenshots ---
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // We'll store screenshots in their own folder
//     const uploadPath = path.join("uploads", "screenshots");
    
//     // Ensure the directory exists
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // --- Order Routes ---

// // POST /api/orders
// // Create a new order. 'screenshot' must match the FormData key from the frontend.
// router.post("/", upload.single("screenshot"), createOrder);

// // GET /api/orders
// // Get all orders (for an admin dashboard)
// router.get("/", getAllOrders);

// // PUT /api/orders/:id/status
// // Update an order's status (e.g., to 'Verified')
// router.put("/:id/status", updateOrderStatus);

// // DELETE /api/orders/:id
// // Delete an order
// router.delete("/:id", deleteOrder);

// export default router;


import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// POST /api/orders
// Create a new order (Just JSON data now, no file upload)
router.post("/", createOrder);

// GET /api/orders
// Get all orders (for admin dashboard)
router.get("/", getAllOrders);

// PUT /api/orders/:id/status
// Update an order's status
router.put("/:id/status", updateOrderStatus);

// DELETE /api/orders/:id
// Delete an order
router.delete("/:id", deleteOrder);

export default router;