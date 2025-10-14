// // config/db.js
// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: false
//   }
// );

// export default sequelize;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      connectTimeout: 10000, // 10 seconds timeout
    },
  }
);

// Test the connection immediately
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error);
  }
})();

export default sequelize;
