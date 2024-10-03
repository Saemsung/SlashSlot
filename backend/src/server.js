const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
mongoose.set('strictQuery', true);
const accessRoutes = require('./routes/accessRoutes');
const accountRoutes = require('./routes/accountRoutes');
const { connectDB } = require('./config/database');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Connessione al database
connectDB();

// Routes
app.use('/api', accessRoutes);
app.use('/api', accountRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Server status route
app.get('/api/status', (req, res) => {
  res.json({
    server: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    api: {
      register: '/api/access/register',
      login: '/api/access/login',
      refreshToken: '/api/access/refresh-token',
      resetPasswordRequest: '/api/access/reset-password-request',
      resetPassword: '/api/access/reset-password',
      logout: '/api/access/logout',
      user: '/api/account/user'
    }
  });
});

// Serve the server status HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/server-status.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`));