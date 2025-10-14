// backend/controllers/packageController.js
import Package from "../models/Package.js";

// Get all packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a package
export const createPackage = async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a package
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    await pkg.update(req.body);
    res.status(200).json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a package
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    await pkg.destroy();
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
