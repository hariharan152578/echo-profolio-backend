// import { config } from "dotenv";
// config();
// import express from "express";
// import cors from "cors";
// import sequelize from "./config/db.js";
// import bcrypt from "bcryptjs";

// // Import routes
// import countRoutes from "./routes/countRoutes.js";
// import testimonialRoutes from "./routes/testimonialRoutes.js";
// import packroutes from "./routes/packageRoutes.js";
// import Subscribe from "./routes/subscribeRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// // Import Admin model
// import Admin from "./models/Admin.js";

// const app = express();
// app.use(express.json());

// // ✅ Enable CORS (allow frontend)
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend (Vite default)
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // ✅ Database connection
// sequelize
//   .authenticate()
//   .then(() => console.log("✅ Sequelize connected to MySQL database!"))
//   .catch((err) => console.error("❌ Unable to connect to MySQL:", err));

// // ✅ Sync models and create default admin
// sequelize
//   .sync({ alter: true })
//   .then(async () => {
//     console.log("✅ Models synced!");

//     const adminEmail = "admin@example.com";
//     const existingAdmin = await Admin.findOne({ where: { email: adminEmail } });

//     if (!existingAdmin) {
//       // ✅ Always hash the default admin password manually
//       const hashedPassword = await bcrypt.hash("Admin@123", 10);

//       await Admin.create({
//         name: "Main Admin",
//         mobile: "9999999999",
//         email: adminEmail,
//         password: "Admin@123",
//       });

//       console.log(
//         "✅ Default admin created → Email: admin@example.com | Password: Admin@123"
//       );
//     } else {
//       console.log("ℹ️ Default admin already exists.");
//     }
//   })
//   .catch((err) => console.error("❌ Sync error:", err));

// // ✅ Routes
// app.use("/api/counts", countRoutes);
// app.use("/api/testimonials", testimonialRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/packages", packroutes);
// app.use("/api/mail", Subscribe);
// app.use("/api/admin", adminRoutes);

// // ✅ Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`🚀 Server running on port ${port}`));


import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import bcrypt from "bcryptjs";

// Import routes
import countRoutes from "./routes/countRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import packroutes from "./routes/packageRoutes.js";
import Subscribe from "./routes/subscribeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

// Import Admin model
import Admin from "./models/Admin.js";

const app = express();
app.use(express.json());

// ✅ Enable CORS (allow frontend)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend (Vite default)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Database connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Sequelize connected to MySQL database!"))
  .catch((err) => console.error("❌ Unable to connect to MySQL:", err));

// ✅ Sync models and create default admin if not exists
sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("✅ Models synced!");

    const adminEmail = "admin@example.com";
    const existingAdmin = await Admin.findOne({ where: { email: adminEmail } });

    if (!existingAdmin) {
      // ✅ Hash default admin password
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      await Admin.create({
        name: "Main Admin",
        mobile: "9999999999",
        email: adminEmail,
        password: hashedPassword,
      });

      console.log(
        "✅ Default admin created → Email: admin@example.com | Password: Admin@123"
      );
    } else {
      console.log("ℹ️ Default admin already exists.");
    }
  })
  .catch((err) => console.error("❌ Sync error:", err));

// ✅ Routes
app.use("/api/counts", countRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/packages", packroutes);
app.use("/api/mail", Subscribe);
app.use("/api/admin", adminRoutes);
// + Register Project Routes
app.use("/api/projects", projectRoutes);

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
