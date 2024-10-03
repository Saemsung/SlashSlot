// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connesso a MongoDB');
  } catch (err) {
    console.error('Errore di connessione a MongoDB:', err);
    process.exit(1);
  }
};

module.exports = { connectDB };