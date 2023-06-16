const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendVerifyEmail(userEmail, otp) {
  console.log(userEmail, otp);

  const mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: "DanceStudio",
    to: userEmail,
    subject: "Email Verification OTP",
    text: `Your OTP code is ${otp}. Please enter this code to verify your email address.`,
    html: `<p>Your OTP code is <strong>${otp}</strong>. Please enter this code to verify your email address.</p>`,
  };
  mailTransporter.sendMail(message, (err) => {
    console.log("last");
    if (err) {
      console.log("Sending email failed", err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

async function sendPaymentConfirmationEmail(userEmail, coursename) {
  console.log("insendPaymentConfirmationEmail ");
  console.log(userEmail, coursename);

  const mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: "DanceStudio",
    to: userEmail,
    subject: "Email Verification OTP",
    text: `You successfully enrolled to the course ${coursename}. `,
    html: `<p>You successfully enrolled to the course<strong>${coursename}</strong>. we will contact you soon.</p>`,
  };
  mailTransporter.sendMail(message, (err) => {
    console.log("last");
    if (err) {
      console.log("Sending email failed", err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = { sendVerifyEmail ,sendPaymentConfirmationEmail};
