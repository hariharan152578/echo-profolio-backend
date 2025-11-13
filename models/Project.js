import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: "Project Title",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "Detailed description of the project",
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Path to project thumbnail image",
  },
  alt_text: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Alt text for accessibility",
  },
  // --- NEW FIELD ADDED HERE ---
  live_url: {
    type: DataTypes.STRING, // Stores the website link
    allowNull: true,        // Optional, in case a project isn't live yet
    validate: {
      isUrl: true           // simple validation to ensure it's a link
    },
    comment: "Direct link to the live project",
  },
}, {
  tableName: "projects",
  timestamps: true,
});

export default Project;