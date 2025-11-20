
// // import { DataTypes } from 'sequelize';
// // import sequelize from '../config/db.js';

// // const Package = sequelize.define('Package', {
// //   category: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   content: {
// //     type: DataTypes.STRING,
// //     allowNull: false
// //   },
// //   monthly: {
// //     type: DataTypes.JSON,
// //     allowNull: false,
// //     defaultValue: {
// //       price: 0,
// //       points: [],
// //       buttonText: 'Choose Plan'
// //     }
// //   },
// //   yearly: {
// //     type: DataTypes.JSON,
// //     allowNull: false,
// //     defaultValue: {
// //       price: 0,
// //       points: [],
// //       buttonText: 'Choose Plan'
// //     }
// //   }
// // }, {
// //   tableName: 'packages',
// //   timestamps: true
// // });

// // export default Package;


// import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.js';

// const Package = sequelize.define('Package', {
//   category: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   content: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   monthly: {
//     type: DataTypes.JSON,
//     allowNull: false,
//     defaultValue: {
//       points: [],
//       buttonText: 'Request Plan'
//     }
//   },
//   yearly: {
//     type: DataTypes.JSON,
//     allowNull: false,
//     defaultValue: {
//       points: [],
//       buttonText: 'Request Plan'
//     }
//   }
// }, {
//   tableName: 'packages',
//   timestamps: true
// });

// export default Package;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Package = sequelize.define('Package', {
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // NEW: Stores array of { label, type, required }
  formFields: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [] 
  },
  monthly: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: { points: [], buttonText: 'Request Plan' }
  },
  yearly: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: { points: [], buttonText: 'Request Plan' }
  }
}, {
  tableName: 'packages',
  timestamps: true
});

export default Package;