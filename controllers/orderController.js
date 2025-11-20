// // import Order from "../models/Order.js";
// // import Subscribe from "../models/Subscribe.js"; 
// // import { sendMail } from "../utils/sendMail.js";
// // import path from "path";

// // const ADMIN_EMAIL = process.env.SMTP_USER || "admin@example.com";

// // // --- Create a new Order ---
// // export const createOrder = async (req, res) => {
// //   try {
// //     const { name, email, phone, planCategory, planPrice, planCycle } = req.body;

// //     if (!req.file) {
// //       return res.status(400).json({ message: "Payment screenshot is required." });
// //     }
    
// //     const screenshotPath = path.join("uploads", "screenshots", req.file.filename);

// //     const newOrder = await Order.create({
// //       name,
// //       email,
// //       phone,
// //       planCategory,
// //       planPrice,
// //       planCycle,
// //       screenshotPath,
// //       status: 'Pending',
// //     });

// //     // ✅ UPDATED LOGIC: 
// //     // Ensure user is in the subscribe list, but keep them as 'General' initially.
// //     // We do NOT set the plan name here yet. The Admin must verify first.
// //     await Subscribe.findOrCreate({
// //       where: { email: newOrder.email },
// //       defaults: { category: 'General' } 
// //     });

// //     // 4. Send Confirmation Email to User
// //     const userSubject = `Order Confirmation - ${planCategory} Plan`;
// //     const userHtml = `
// //       <h1>Thank You for Your Order, ${name}!</h1>
// //       <p>We have received your order for the <strong>${planCategory} (${planCycle})</strong> plan for <strong>${planPrice}</strong>.</p>
// //       <p>Your order is currently <strong>Pending Verification</strong>.</p>
// //       <p>We will notify you by email as soon as your payment is verified and your plan is activated (usually within 24 hours).</p>
// //       <p>Thank you for choosing Echo Digital Solutions!</p>
// //     `;
// //     await sendMail(email, userSubject, userHtml);

// //     // 5. Send Notification Email to Admin
// //     const adminSubject = `New Order Received - ${name} - ${planCategory}`;
// //     const adminHtml = `
// //       <h1>New Order for Verification</h1>
// //       <p>A new order has been submitted and requires verification:</p>
// //       <ul>
// //         <li><strong>Name:</strong> ${name}</li>
// //         <li><strong>Email:</strong> ${email}</li>
// //         <li><strong>Phone:</strong> ${phone}</li>
// //         <li><strong>Plan:</strong> ${planCategory} (${planCycle})</li>
// //         <li><strong>Price:</strong> ${planPrice}</li>
// //         <li><strong>Order ID:</strong> ${newOrder.id}</li>
// //         <li><strong>Status:</strong> Pending</li>
// //       </ul>
// //       <p>Please log in to the admin panel to view the screenshot and verify the payment.</p>
// //     `;
// //     await sendMail(ADMIN_EMAIL, adminSubject, adminHtml);

// //     res.status(201).json({ 
// //       message: "Order submitted successfully! We will verify and activate your plan.",
// //       order: newOrder 
// //     });

// //   } catch (err) {
// //     console.error("❌ Error creating order:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // --- Get All Orders (for Admin) ---
// // export const getAllOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.findAll({
// //       order: [["createdAt", "DESC"]], 
// //     });
// //     res.status(200).json(orders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // --- Update Order Status (for Admin) ---
// // export const updateOrderStatus = async (req, res) => {
// //   try {
// //     const { status } = req.body; 
// //     if (!['Verified', 'Failed', 'Pending'].includes(status)) {
// //       return res.status(400).json({ message: "Invalid status." });
// //     }

// //     const order = await Order.findByPk(req.params.id);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found." });
// //     }

// //     // Update order status
// //     order.status = status;
// //     await order.save();
    
// //     // ✅ UPDATED LOGIC: Update Subscriber Category on Verification
// //     if (status === 'Verified') {
      
// //       // 1. Find the subscriber associated with this email
// //       const subscriber = await Subscribe.findOne({ where: { email: order.email } });

// //       // 2. If found, update their category to the purchased plan (e.g., 'Pro', 'Basic')
// //       if (subscriber) {
// //         subscriber.category = order.planCategory;
// //         await subscriber.save();
// //         console.log(`✅ Subscriber ${order.email} upgraded to ${order.planCategory}`);
// //       }

// //       // 3. Send Success Email
// //       const userSubject = `Your Order is Verified!`;
// //       const userHtml = `<h1>Great News, ${order.name}!</h1><p>Your payment for the <strong>${order.planCategory}</strong> plan has been verified.</p><p>Your subscription has been upgraded successfully. Thank you!</p>`;
// //       await sendMail(order.email, userSubject, userHtml);
// //     }

// //     res.status(200).json(order);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // --- Delete an Order (for Admin) ---
// // export const deleteOrder = async (req, res) => {
// //   try {
// //     const order = await Order.findByPk(req.params.id);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found." });
// //     }
// //     await order.destroy();
// //     res.status(200).json({ message: "Order deleted successfully." });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // controllers/orderController.js


// // import Order from "../models/Order.js";
// // import Subscribe from "../models/Subscribe.js"; 
// // import { sendMail } from "../utils/sendMail.js";
// // import path from "path";

// // const ADMIN_EMAIL = process.env.SMTP_USER || "admin@example.com";

// // export const createOrder = async (req, res) => {
// //   try {
// //     const { name, email, phone, planCategory, planPrice, planCycle } = req.body;

// //     if (!req.file) {
// //       return res.status(400).json({ message: "Payment screenshot is required." });
// //     }
    
// //     const screenshotPath = path.join("uploads", "screenshots", req.file.filename);

// //     const newOrder = await Order.create({
// //       name,
// //       email,
// //       phone,
// //       planCategory,
// //       planPrice,
// //       planCycle,
// //       screenshotPath,
// //       status: 'Pending',
// //     });

// //     // Add user to subscribe list as 'General'
// //     await Subscribe.findOrCreate({
// //       where: { email: newOrder.email },
// //       defaults: { category: 'General' } 
// //     });

// //     // Send confirmation email to user
// //     const userSubject = `Order Confirmation - ${planCategory} Plan`;
// //     const userHtml = `
// //       <h1>Thank You for Your Order, ${name}!</h1>
// //       <p>We have received your order for the <strong>${planCategory} (${planCycle})</strong> plan for <strong>${planPrice}</strong>.</p>
// //       <p>Your order is currently <strong>Pending Verification</strong>.</p>
// //       <p>We will notify you by email as soon as your payment is verified and your plan is activated (usually within 24 hours).</p>
// //       <p>Thank you for choosing Echo Digital Solutions!</p>
// //     `;
// //     await sendMail(email, userSubject, userHtml);

// //     // Send notification email to admin
// //     const adminSubject = `New Order Received - ${name} - ${planCategory}`;
// //     const adminHtml = `
// //       <h1>New Order for Verification</h1>
// //       <p>A new order has been submitted and requires verification:</p>
// //       <ul>
// //         <li><strong>Name:</strong> ${name}</li>
// //         <li><strong>Email:</strong> ${email}</li>
// //         <li><strong>Phone:</strong> ${phone}</li>
// //         <li><strong>Plan:</strong> ${planCategory} (${planCycle})</li>
// //         <li><strong>Price:</strong> ${planPrice}</li>
// //         <li><strong>Order ID:</strong> ${newOrder.id}</li>
// //         <li><strong>Status:</strong> Pending</li>
// //       </ul>
// //       <p>Please log in to the admin panel to view the screenshot and verify the payment.</p>
// //     `;
// //     await sendMail(ADMIN_EMAIL, adminSubject, adminHtml);

// //     res.status(201).json({ 
// //       message: "Order submitted successfully! We will verify and activate your plan.",
// //       order: newOrder 
// //     });

// //   } catch (err) {
// //     console.error("❌ Error creating order:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // export const getAllOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.findAll({
// //       order: [["createdAt", "DESC"]], 
// //     });
// //     res.status(200).json(orders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // export const updateOrderStatus = async (req, res) => {
// //   try {
// //     const { status } = req.body; 
// //     if (!['Verified', 'Failed', 'Pending'].includes(status)) {
// //       return res.status(400).json({ message: "Invalid status." });
// //     }

// //     const order = await Order.findByPk(req.params.id);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found." });
// //     }

// //     // Update order status
// //     order.status = status;
// //     await order.save();
    
// //     // Update Subscriber Category on Verification
// //     if (status === 'Verified') {
// //       const subscriber = await Subscribe.findOne({ where: { email: order.email } });
// //       if (subscriber) {
// //         subscriber.category = order.planCategory;
// //         await subscriber.save();
// //         console.log(`✅ Subscriber ${order.email} upgraded to ${order.planCategory}`);
// //       }

// //       // Send Success Email
// //       const userSubject = `Your Order is Verified!`;
// //       const userHtml = `<h1>Great News, ${order.name}!</h1><p>Your payment for the <strong>${order.planCategory}</strong> plan has been verified.</p><p>Your subscription has been upgraded successfully. Thank you!</p>`;
// //       await sendMail(order.email, userSubject, userHtml);
// //     }

// //     res.status(200).json(order);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // export const deleteOrder = async (req, res) => {
// //   try {
// //     const order = await Order.findByPk(req.params.id);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found." });
// //     }
// //     await order.destroy();
// //     res.status(200).json({ message: "Order deleted successfully." });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// import Order from "../models/Order.js";
// import Subscribe from "../models/Subscribe.js"; 
// import { sendMail } from "../utils/sendMail.js";

// const ADMIN_EMAIL = process.env.SMTP_USER || "admin@example.com";

// export const createOrder = async (req, res) => {
//   try {
//     // Removed planPrice from destructuring
//     const { name, email, phone, planCategory, planCycle } = req.body;

//     const newOrder = await Order.create({
//       name,
//       email,
//       phone,
//       planCategory,
//       planCycle,
//       status: 'Pending',
//     });

//     // Add user to subscribe list as 'General'
//     await Subscribe.findOrCreate({
//       where: { email: newOrder.email },
//       defaults: { category: 'General' } 
//     });

//     // 1. Send confirmation email to user
//     const userSubject = `Plan Request Received - ${planCategory}`;
//     const userHtml = `
//       <h1>Hello ${name},</h1>
//       <p>We have received your request for the <strong>${planCategory} (${planCycle})</strong> plan.</p>
//       <p><strong>Next Steps:</strong> Our team will review your request and contact you shortly to finalize the activation.</p>
//       <p>Thank you for choosing Echo Digital Solutions!</p>
//     `;
//     await sendMail(email, userSubject, userHtml);

//     // 2. Send notification email to admin
//     const adminSubject = `New Plan Request - ${name}`;
//     const adminHtml = `
//       <h1>New Service Request</h1>
//       <p>A user has requested a plan:</p>
//       <ul>
//         <li><strong>Name:</strong> ${name}</li>
//         <li><strong>Email:</strong> ${email}</li>
//         <li><strong>Phone:</strong> ${phone}</li>
//         <li><strong>Plan:</strong> ${planCategory} (${planCycle})</li>
//         <li><strong>Status:</strong> Pending Verification</li>
//       </ul>
//       <p>Please log in to the admin panel to approve or reject this request.</p>
//     `;
//     await sendMail(ADMIN_EMAIL, adminSubject, adminHtml);

//     res.status(201).json({ 
//       message: "Request submitted successfully! We will contact you shortly.",
//       order: newOrder 
//     });

//   } catch (err) {
//     console.error("❌ Error creating order:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.findAll({
//       order: [["createdAt", "DESC"]], 
//     });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body; 
//     if (!['Verified', 'Failed', 'Pending'].includes(status)) {
//       return res.status(400).json({ message: "Invalid status." });
//     }

//     const order = await Order.findByPk(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found." });
//     }

//     // Update order status
//     order.status = status;
//     await order.save();
    
//     if (status === 'Verified') {
//       const subscriber = await Subscribe.findOne({ where: { email: order.email } });
//       if (subscriber) {
//         subscriber.category = order.planCategory;
//         await subscriber.save();
//       }

//       // Send Activation Email
//       const userSubject = `Plan Activated!`;
//       const userHtml = `
//         <h1>Great News, ${order.name}!</h1>
//         <p>Your request for the <strong>${order.planCategory}</strong> plan has been approved and activated.</p>
//         <p>Thank you for being with us.</p>
//       `;
//       await sendMail(order.email, userSubject, userHtml);
//     }

//     res.status(200).json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// export const deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findByPk(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found." });
//     }
//     await order.destroy();
//     res.status(200).json({ message: "Order deleted successfully." });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import Order from "../models/Order.js";
import Subscribe from "../models/Subscribe.js"; 
import { sendMail } from "../utils/sendMail.js";

const ADMIN_EMAIL = process.env.SMTP_USER || "admin@example.com";

export const createOrder = async (req, res) => {
  try {
    const { name, email, phone, planCategory, planCycle, submissionData } = req.body;

    const newOrder = await Order.create({
      name,
      email,
      phone,
      planCategory,
      planCycle,
      submissionData, // Save dynamic answers
      status: 'Pending',
    });

    // Add to newsletter
    await Subscribe.findOrCreate({
      where: { email: newOrder.email },
      defaults: { category: 'General' } 
    });

    // --- Helper to format dynamic data for Email ---
    const formatSubmissionData = (data) => {
      if (!data || Object.keys(data).length === 0) return '';
      return `
        <h3>Additional Details:</h3>
        <ul>
          ${Object.entries(data).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
        </ul>
      `;
    };
    // -----------------------------------------------

    // 1. User Email
    const userSubject = `Request Received - ${planCategory}`;
    const userHtml = `
      <h1>Hello ${name},</h1>
      <p>We received your request for the <strong>${planCategory}</strong> plan.</p>
      ${formatSubmissionData(submissionData)}
      <p>We will contact you shortly.</p>
    `;
    await sendMail(email, userSubject, userHtml);

    // 2. Admin Email
    const adminSubject = `New Request: ${planCategory} - ${name}`;
    const adminHtml = `
      <h1>New Plan Request</h1>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Plan:</strong> ${planCategory} (${planCycle})</li>
      </ul>
      ${formatSubmissionData(submissionData)}
      <p>Please verify in the admin dashboard.</p>
    `;
    await sendMail(ADMIN_EMAIL, adminSubject, adminHtml);

    res.status(201).json({ message: "Request submitted!", order: newOrder });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ... rest of the controller (getAllOrders, update, delete) remains the same ...
// COPY existing getAllOrders, updateOrderStatus, deleteOrder here
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; 
    if (!['Verified', 'Failed', 'Pending'].includes(status)) return res.status(400).json({ message: "Invalid status." });
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    
    order.status = status;
    await order.save();
    
    if (status === 'Verified') {
      const subscriber = await Subscribe.findOne({ where: { email: order.email } });
      if (subscriber) { subscriber.category = order.planCategory; await subscriber.save(); }
      await sendMail(order.email, "Plan Activated", `<h1>Approved!</h1><p>Your ${order.planCategory} plan is active.</p>`);
    }
    res.status(200).json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Not found" });
    await order.destroy();
    res.status(200).json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};