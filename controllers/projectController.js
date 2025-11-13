import Project from "../models/Project.js";
import path from "path";
import fs from "fs";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    // Ordered by newest first
    const projects = await Project.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a project
export const createProject = async (req, res) => {
  try {
    let image_url = null;
    if (req.file) image_url = `/uploads/${req.file.filename}`;

    const project = await Project.create({
      ...req.body,
      image_url,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    let image_url = project.image_url;
    if (req.file) {
      // Delete old image if it exists
      if (image_url) {
        const oldPath = path.join(process.cwd(), image_url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image_url = `/uploads/${req.file.filename}`;
    }

    await project.update({ ...req.body, image_url });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Delete associated image
    if (project.image_url) {
      const filePath = path.join(process.cwd(), project.image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await project.destroy();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};