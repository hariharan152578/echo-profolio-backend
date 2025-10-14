// backend/models/Package.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Package = sequelize.define("Package", {
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "Package name/title",
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: "Package description or header",
  },
  points: {
    type: DataTypes.JSON, // Store array of points
    allowNull: false,
    comment: "Array of features/points for the package",
  },
  price: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "Package price",
  },
  buttonText: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "Text for the button",
  },
}, {
  tableName: "packages",
  timestamps: true,
});

export default Package;
