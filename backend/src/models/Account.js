const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  nome: String,
  cognome: String,
  dataNascita: Date,
  paese: String,
  email: { type: String, unique: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('Account', AccountSchema);