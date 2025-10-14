import Count from "../models/Count.js";

// Get all counts
export const getCounts = async (req, res) => {
  try {
    const counts = await Count.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new count
export const createCount = async (req, res) => {
  try {
    const count = await Count.create(req.body);
    res.status(201).json(count);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a count
export const updateCount = async (req, res) => {
  try {
    const count = await Count.findByPk(req.params.id);
    if (!count) return res.status(404).json({ message: "Count not found" });

    await count.update(req.body);
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a count
export const deleteCount = async (req, res) => {
  try {
    const count = await Count.findByPk(req.params.id);
    if (!count) return res.status(404).json({ message: "Count not found" });

    await count.destroy();
    res.status(200).json({ message: "Count deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
