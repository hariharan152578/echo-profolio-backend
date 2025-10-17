import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import sequelize from "./config/db.js"; // Assuming this file exists
import countRoutes from "./routes/countRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js"; // New Import
import packroutes from "./routes/packageRoutes.js";
import Subscribe from "./routes/subscribeRoutes.js"


const app = express();
app.use(express.json());

// ✅ Enable CORS (allow frontend)
app.use(cors({
  origin: "http://localhost:5173", // frontend URL (Vite default)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Database connection
sequelize.authenticate()
  .then(() => console.log("✅ Sequelize connected to MySQL database!"))
  .catch(err => console.error("❌ Unable to connect to MySQL:", err));


sequelize.sync({ alter: true }) // 'alter: true' will automatically make necessary changes to the database
  .then(() => console.log("✅ Models synced!"))
  .catch(err => console.error("❌ Sync error:", err));

// ✅ Routes
app.use("/api/counts", countRoutes);
app.use("/api/testimonials", testimonialRoutes); // New Route
app.use('/uploads', express.static('uploads'));
app.use("/api/packages",packroutes);
app.use("/api/mail",Subscribe)

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));