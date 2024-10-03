const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {  // Cambiato da 'access' a 'auth'
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

  try {
    console.log('Tentativo di invio email');
    await transporter.sendMail(mailOptions);
    console.log('Email inviata con successo');
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    throw error;  // Rilanciamo l'errore per gestirlo nel controller
  }
};