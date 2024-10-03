// src/utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  access: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendResetPasswordEmail = async (email, resetToken) => {
  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Reset Password',
    text: `Clicca sul seguente link per resettare la tua password: http://localhost:3000/reset/${resetToken}`
  };

  await transporter.sendMail(mailOptions);
};