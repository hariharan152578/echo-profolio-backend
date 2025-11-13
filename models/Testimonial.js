// // backend/models/Testimonial.js
// import { DataTypes } from "sequelize";
// import sequelize from "../config/db.js";

// const Testimonial = sequelize.define("Testimonial", {
//   testimonial_text: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     comment: "The main testimonial content",
//   },
//   customer_name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//     comment: "Name of the customer",
//   },
//   customer_designation: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//     comment: "Customer's title/designation",
//   },
//   avatar_url: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     comment: "Path to customer's profile image",
//   },
// }, {
//   tableName: "testimonials",
//   timestamps: true,
// });

// export default Testimonial;
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
  // --- NEW FIELD ADDED HERE ---
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5, // Default to 5 stars if not provided
    validate: {
      min: 1,
      max: 5
    },
    comment: "Star rating from 1 to 5",
  },
}, {
  tableName: "testimonials",
  timestamps: true,
});

export default Testimonial;