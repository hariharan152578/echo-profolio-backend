// backend/models/Service.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Service = sequelize.define("Service", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "Service Title (e.g. Grow Your Business)",
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "Description of the service",
  },
  Details: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "Detailed description of the service",
  },
  icon_url: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Path to the uploaded icon/image",
  },
  link_url: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "#",
    comment: "The navigation link (e.g., /contact or #)",
  },
}, {
  tableName: "services",
  timestamps: true,
});

export default Service;