import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Count = sequelize.define("Count", {
  icon: {
    type: DataTypes.STRING(10),
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prefix: {
    type: DataTypes.STRING(10),
    defaultValue: "",
  },
  suffix: {
    type: DataTypes.STRING(10),
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
