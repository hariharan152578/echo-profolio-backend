import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Count = sequelize.define("Count", {
  icon: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prefix: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  suffix: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  limit_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "counts",
  timestamps: true,
});

export default Count;
