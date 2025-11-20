// import nodemailer from "nodemailer";

// export const sendMail = async (to, subject, htmlContent) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT || 587,
//       secure: false, // true if using port 465
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Your Conference Team" <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       html: htmlContent,
//     });

//     console.log(`✅ Mail sent to ${to}`);
//   } catch (error) {
//     console.error("❌ Email sending failed:", error.message);
//   }
// };
import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

// 1. Configure the Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Example for Gmail
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASS, // Your email password or app password
  },
});

/**
 * Sends an email.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 * @param {string} textContent - The plain text content of the email.
 * @param {object} [attachment] - Optional attachment object.
 * @param {string} [attachment.filename] - The original name of the file.
 * @param {Buffer} [attachment.content] - The file buffer.
 * @param {string} [attachment.contentType] - The MIME type of the file.
 */
export const sendMail = async (to, subject, html, attachment) => {
  try {
    const mailOptions = {
      from: `"Your Admin Panel" <${process.env.SMTP_USER}>`, // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      html: html, // HTML body
    };

    // If an attachment is provided, add it to the mail options
    if (attachment) {
      mailOptions.attachments = [
        {
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType,
        },
      ];
    }

    // Send the mail
    await transporter.sendMail(mailOptions);
    console.log(`Mail sent successfully to ${to}`);

  } catch (error) {
    console.error(`Error sending mail to ${to}:`, error);
    // Re-throw the error so the controller's try/catch block can handle it
    throw new Error(`Failed to send email: ${error.message}`);
  }
};