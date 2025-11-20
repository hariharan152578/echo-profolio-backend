
// // // import { DataTypes } from 'sequelize';
// // // import sequelize from '../config/db.js';

// // // const Order = sequelize.define('Order', {
// // //   name: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false
// // //   },
// // //   email: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false
// // //   },
// // //   phone: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false
// // //   },
// // //   planCategory: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false
// // //   },
// // //   planPrice: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false
// // //   },
// // //   planCycle: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false
// // //   },
// // //   screenshotPath: {
// // //     type: DataTypes.STRING,
// // //     allowNull: false
// // //   },
// // //   status: {
// // //     type: DataTypes.ENUM('Pending', 'Verified', 'Failed'),
// // //     defaultValue: 'Pending'
// // //   }
// // // }, {
// // //   tableName: 'orders',
// // //   timestamps: true
// // // });

// // // export default Order;

// // import { DataTypes } from 'sequelize';
// // import sequelize from '../config/db.js';

// // const Order = sequelize.define('Order', {
// //   name: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   email: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   phone: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   planCategory: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   planPrice: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   planCycle: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   // Removed screenshotPath
// //   status: {
// //     type: DataTypes.ENUM('Pending', 'Verified', 'Failed'),
// //     defaultValue: 'Pending'
// //   }
// // }, {
// //   tableName: 'orders',
// //   timestamps: true
// // });

// // export default Order;

// import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.js';

// const Order = sequelize.define('Order', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   planCategory: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   planCycle: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   status: {
//     type: DataTypes.ENUM('Pending', 'Verified', 'Failed'),
//     defaultValue: 'Pending'
//   }
// }, {
//   tableName: 'orders',
//   timestamps: true
// });

// export default Order;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
  // Fixed fields (Always required for contact)
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  
  planCategory: { type: DataTypes.STRING, allowNull: false },
  planCycle: { type: DataTypes.STRING, allowNull: false },
  
  // NEW: Stores the answers to the dynamic fields
  submissionData: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  
  status: {
    type: DataTypes.ENUM('Pending', 'Verified', 'Failed'),
    defaultValue: 'Pending'
  }
}, {
  tableName: 'orders',
  timestamps: true
});

export default Order;