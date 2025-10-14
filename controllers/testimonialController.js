// backend/controllers/testimonialController.js
import Testimonial from "../models/Testimonial.js";
import path from "path";
import fs from "fs";

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [["id", "DESC"]] });
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a testimonial
export const createTestimonial = async (req, res) => {
  try {
    let avatar_url = null;
    if (req.file) avatar_url = `/uploads/${req.file.filename}`;

    const testimonial = await Testimonial.create({
      ...req.body,
      avatar_url,
    });

    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });

    let avatar_url = testimonial.avatar_url;
    if (req.file) {
      if (avatar_url) {
        const oldPath = path.join(process.cwd(), avatar_url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      avatar_url = `/uploads/${req.file.filename}`;
    }

    await testimonial.update({ ...req.body, avatar_url });
    res.status(200).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });

    if (testimonial.avatar_url) {
      const filePath = path.join(process.cwd(), testimonial.avatar_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await testimonial.destroy();
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
