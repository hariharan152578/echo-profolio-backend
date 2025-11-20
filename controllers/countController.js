// import Count from "../models/Count.js";

// // Get all counts
// export const getCounts = async (req, res) => {
//   try {
//     const counts = await Count.findAll({ order: [["id", "ASC"]] });
//     res.status(200).json(counts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add a new count
// export const createCount = async (req, res) => {
//   try {
//     const count = await Count.create(req.body);
//     res.status(201).json(count);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a count
// export const updateCount = async (req, res) => {
//   try {
//     const count = await Count.findByPk(req.params.id);
//     if (!count) return res.status(404).json({ message: "Count not found" });

//     await count.update(req.body);
//     res.status(200).json(count);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a count
// export const deleteCount = async (req, res) => {
//   try {
//     const count = await Count.findByPk(req.params.id);
//     if (!count) return res.status(404).json({ message: "Count not found" });

//     await count.destroy();
//     res.status(200).json({ message: "Count deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Count from "../models/Count.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = 'uploads/count-icons/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'count-icon-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all counts
export const getCounts = async (req, res) => {
  try {
    const counts = await Count.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new count with file upload
export const createCount = async (req, res) => {
  try {
    upload.single('icon')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const countData = {
        content: req.body.content,
        prefix: req.body.prefix || '',
        suffix: req.body.suffix || '',
        limit_value: parseInt(req.body.limit_value)
      };

      // If file was uploaded, store the file path
      if (req.file) {
        countData.icon = `/uploads/count-icons/${req.file.filename}`;
      }

      const count = await Count.create(countData);
      res.status(201).json(count);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a count with file upload
export const updateCount = async (req, res) => {
  try {
    upload.single('icon')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const count = await Count.findByPk(req.params.id);
      if (!count) return res.status(404).json({ message: "Count not found" });

      const updateData = {
        content: req.body.content,
        prefix: req.body.prefix || '',
        suffix: req.body.suffix || '',
        limit_value: parseInt(req.body.limit_value)
      };

      // If file was uploaded, update the icon path
      if (req.file) {
        updateData.icon = `/uploads/count-icons/${req.file.filename}`;
      }

      await count.update(updateData);
      res.status(200).json(count);
    });
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