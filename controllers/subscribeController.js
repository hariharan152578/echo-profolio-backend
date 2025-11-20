

// import Subscribe from "../models/Subscribe.js";
// import { sendMail } from "../utils/sendMail.js";

// // 1️⃣ Add new subscriber (from general newsletter form)
// export const addSubscriber = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const existing = await Subscribe.findOne({ where: { email } });
//     if (existing)
//       return res.status(400).json({ message: "Already subscribed" });

//     // ✅ MODIFIED: We explicitly set 'General', though the model default would also work.
//     // This ensures users from the newsletter form are 'General'
//     const newSub = await Subscribe.create({ email, category: 'General' });

//     const html = `
//       <h3>Welcome to Our Newsletter 🎉</h3>
//       <p>Thank you for subscribing! We'll keep you updated with our latest news and updates.</p>
//     `;
//     await sendMail(email, "Thanks for Subscribing!", html);

//     res.status(201).json({ message: "Subscribed successfully", subscriber: newSub });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 2️⃣ Get all subscribers (for admin)
// export const getSubscribers = async (req, res) => {
//   try {
//     const subs = await Subscribe.findAll({ order: [["subscribedAt", "DESC"]] });
//     res.status(200).json(subs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 3️⃣ Delete a subscriber
// export const deleteSubscriber = async (req, res) => {
// // ... (this function is unchanged) ...
//   try {
//     const { id } = req.params;
//     await Subscribe.destroy({ where: { id } });
//     res.status(200).json({ message: "Subscriber deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 4️⃣ Send custom mail to subscribers (admin broadcast)
// export const sendCustomMail = async (req, res) => {
//   try {
//     // ✅ MODIFIED: Now accepts 'category' from the body
//     const { subject, htmlContent, category } = req.body;

//     if (!subject || !htmlContent)
//       return res.status(400).json({ message: "Subject and content required" });

//     // ✅ MODIFIED: Build a where condition based on the category
//     const whereCondition = {};
//     if (category && category !== 'All') {
//       // If category is 'Basic', 'Pro', 'General', etc., filter by it
//       whereCondition.category = category;
//     }
//     // If category is 'All' or not provided, whereCondition remains {}
//     // and findAll() will select *all* subscribers.

//     const subscribers = await Subscribe.findAll({ where: whereCondition });

//     if (subscribers.length === 0) {
//       return res.status(404).json({ message: "No subscribers found for this category." });
//     }

//     for (const sub of subscribers) {
//       await sendMail(sub.email, subject, htmlContent);
//     }

//     const message = `Custom mail sent to ${subscribers.length} subscribers${(category && category !== 'All') ? ` in category '${category}'` : ' (all categories)'}.`;
//     res.status(200).json({ message });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Subscribe from "../models/Subscribe.js";
import { sendMail } from "../utils/sendMail.js"; // We will create/update this file next

// 1️⃣ Add new subscriber (from general newsletter form)
export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await Subscribe.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Already subscribed" });

    const newSub = await Subscribe.create({ email, category: 'General' });

    // ✅ MODIFIED: Use textContent to match our new sendMail utility
    const textContent = `Welcome to Our Newsletter 🎉\n\nThank you for subscribing! We'll keep you updated with our latest news and updates.`;
    
    // Pass null for the attachment
    await sendMail(newSub.email, "Thanks for Subscribing!", textContent, null);

    res.status(201).json({ message: "Subscribed successfully", subscriber: newSub });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ Get all subscribers (for admin)
export const getSubscribers = async (req, res) => {
  try {
    const subs = await Subscribe.findAll({ order: [["subscribedAt", "DESC"]] });
    res.status(200).json(subs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Delete a subscriber
export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await Subscribe.destroy({ where: { id } });
    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️⃣ Send custom mail to subscribers (admin broadcast)
export const sendCustomMail = async (req, res) => {
  try {
    // ✅ MODIFIED: Get textContent from req.body (not htmlContent)
    const { subject, textContent, category } = req.body;
    
    // ✅ NEW: Get the file from req.file (thanks to multer)
    const file = req.file;

    if (!subject || !textContent)
      return res.status(400).json({ message: "Subject and content required" });

    // Build the where condition
    const whereCondition = {};
    if (category && category !== 'All') {
      whereCondition.category = category;
    }

    const subscribers = await Subscribe.findAll({ where: whereCondition });

    if (subscribers.length === 0) {
      return res.status(404).json({ message: "No subscribers found for this category." });
    }

    // ✅ NEW: Prepare the attachment object for sendMail (if it exists)
    let attachment = null;
    if (file) {
      attachment = {
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      };
    }

    for (const sub of subscribers) {
      // ✅ MODIFIED: Pass textContent and the attachment to sendMail
      await sendMail(sub.email, subject, textContent, attachment);
    }

    let message = `Custom mail sent to ${subscribers.length} subscribers${(category && category !== 'All') ? ` in category '${category}'` : ' (all categories)'}.`;
    if (file) {
      message += ` with attachment: ${file.originalname}`;
    }
    
    res.status(200).json({ message });

  } catch (error) {
    console.error("Error in sendCustomMail:", error);
    res.status(500).json({ message: error.message });
  }
};