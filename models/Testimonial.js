// backend/models/Testimonial.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Testimonial = sequelize.define("Testimonial", {
  testimonial_text: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "The main testimonial content",
  },
  customer_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "Name of the customer",
  },
  customer_designation: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "Customer's title/designation",
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Path to customer's profile image",
  },
}, {
  tableName: "testimonials",
  timestamps: true,
});

export default Testimonial;
