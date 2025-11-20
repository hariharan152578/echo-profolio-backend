import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subscribe = sequelize.define("Subscribe", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // ✅ ADDED: New field to store the subscription category
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'General', // Default for newsletter form signups
    comment: "e.g., General, Basic, Pro, or custom package name"
  },
  subscribedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "subscribes",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email'],
      name: 'unique_subscribe_email_constraint'
    }
  ]
});

export default Subscribe;