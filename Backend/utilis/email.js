const nodemailer = require("nodemailer");

const sendEmail = async options => {
  const transport = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  // FIX 1: was "nodamailer" (typo)
  const transporter = nodemailer.createTransport(transport);

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // FIX 2: was "transporter.sendEmail" — correct method is "sendMail"
  await transporter.sendMail(message);
};

module.exports = sendEmail;
