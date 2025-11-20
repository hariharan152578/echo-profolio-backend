// backend/controllers/serviceController.js
import Service from "../models/Service.js";
import path from "path";
import fs from "fs";

// Get all services
export const getServices = async (req, res) => {
  try {
    // Ordered by ID asc so they appear in order of creation (or change to DESC)
    const services = await Service.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new service
export const createService = async (req, res) => {
  try {
    let icon_url = null;
    if (req.file) icon_url = `/uploads/${req.file.filename}`;

    const service = await Service.create({
      ...req.body,
      icon_url,
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    let icon_url = service.icon_url;

    // If a new file is uploaded, delete the old one and set the new path
    if (req.file) {
      if (icon_url) {
        const oldPath = path.join(process.cwd(), icon_url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      icon_url = `/uploads/${req.file.filename}`;
    }

    await service.update({ ...req.body, icon_url });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Delete associated image file
    if (service.icon_url) {
      const filePath = path.join(process.cwd(), service.icon_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await service.destroy();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};