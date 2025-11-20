
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { Op } from "sequelize"; // Import Op for 'not' operator

// ✅ Admin login controller
export const loginAdmin = async (req, res) => {
// ... existing code ...
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Create new admin
export const createAdmin = async (req, res) => {
// ... existing code ...
  try {
    const { name, mobile, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      mobile,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Admins
export const getAllAdmins = async (req, res) => {
// ... existing code ...
  try {
    // Find all admins, but only select these safe fields
    const admins = await Admin.findAll({
      attributes: ["id", "name", "email", "mobile"],
      order: [["name", "ASC"]], // Optional: sort them by name
    });

    res.json(admins);
  } catch (error) {
    console.error("Get all admins error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ ADD THIS FUNCTION: Update an Admin
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, password } = req.body;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if email is being changed to one that already exists
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({
        where: { email, id: { [Op.ne]: id } }, // [Op.ne] means 'not equal'
      });
      if (existingAdmin) {
        return res.status(400).json({ message: "Email already in use" });
      }
      admin.email = email;
    }

    // Update fields
    if (name) admin.name = name;
    if (mobile) admin.mobile = mobile;

    // Optionally update password if provided
    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();

    res.json({
      message: "Admin updated successfully",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
      },
    });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ ADD THIS FUNCTION: Delete an Admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Safety check: prevent deleting the default main admin
    if (admin.email === "admin@example.com") {
      return res
        .status(403)
        .json({ message: "Cannot delete the main admin account" });
    }

    await admin.destroy();
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete admin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};