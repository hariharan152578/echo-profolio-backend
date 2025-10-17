import Subscribe from "../models/Subscribe.js";
import { sendMail } from "../utils/sendMail.js";

// 1️⃣ Add new subscriber
export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await Subscribe.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Already subscribed" });

    const newSub = await Subscribe.create({ email });

    // Send thank-you email
    const html = `
      <h3>Welcome to Our Newsletter 🎉</h3>
      <p>Thank you for subscribing! We'll keep you updated with our latest news and updates.</p>
    `;
    await sendMail(email, "Thanks for Subscribing!", html);

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

// 4️⃣ Send custom mail to all subscribers (admin broadcast)
export const sendCustomMail = async (req, res) => {
  try {
    const { subject, htmlContent } = req.body;
    if (!subject || !htmlContent)
      return res.status(400).json({ message: "Subject and content required" });

    const subscribers = await Subscribe.findAll();
    for (const sub of subscribers) {
      await sendMail(sub.email, subject, htmlContent);
    }

    res.status(200).json({ message: "Custom mail sent to all subscribers" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
