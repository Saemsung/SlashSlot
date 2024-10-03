// src/controllers/accessController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Account');
const { sendResetPasswordEmail } = require('../utils/emailService');
const crypto = require('crypto'); // Aggiungi questa riga

exports.register = async (req, res) => {
  try {
    const { nome, cognome, dataNascita, paese, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utente già registrato' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nome,
      cognome,
      dataNascita,
      paese,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'Utente registrato con successo' });
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    res.status(500).json({ message: 'Errore durante la registrazione', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.json({ token, refreshToken, userId: user._id });
  } catch (error) {
    console.error('Errore durante il login:', error);
    res.status(500).json({ message: 'Errore durante il login', error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token mancante' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: newToken });
  } catch (error) {
    console.error('Errore durante il refresh del token:', error);
    res.status(403).json({ message: 'Refresh token non valido' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    console.log('Richiesta di reset password ricevuta:', req.body);
    const { email } = req.body;
    
    console.log('Ricerca utente con email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utente non trovato');
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    console.log('Utente trovato:', user._id);

    const resetToken = crypto.randomBytes(20).toString('hex');
    console.log('Token di reset generato:', resetToken);
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 ora
    console.log('Salvataggio token nel database');
    await user.save();
    console.log('Token salvato con successo');

    console.log('Invio email di reset');
    await sendResetPasswordEmail(user.email, resetToken);
    console.log('Email di reset inviata con successo');

    res.json({ message: 'Email di reset inviata' });
  } catch (error) {
    console.error('Errore durante la richiesta di reset password:', error);
    res.status(500).json({ message: 'Errore durante la richiesta di reset password', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token di reset password non valido o scaduto' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password resettata con successo' });
  } catch (error) {
    console.error('Errore durante il reset della password:', error);
    res.status(500).json({ message: 'Errore durante il reset della password', error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      // Aggiungi il token alla blacklist
      if (!global.tokenBlacklist) {
        global.tokenBlacklist = new Set();
      }
      global.tokenBlacklist.add(token);
    }
    res.json({ message: 'Logout effettuato con successo' });
  } catch (error) {
    console.error('Errore durante il logout:', error);
    res.status(500).json({ message: 'Errore durante il logout', error: error.message });
  }
};

// Aggiungi questo middleware per verificare i token invalidati
exports.checkTokenBlacklist = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (global.tokenBlacklist && global.tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token non valido' });
  }
  next();
};