const express = require('express');
const router = express.Router();
const accessMiddleware = require('../middleware/accessMiddleware');
const Account = require('../models/Account');

router.get('/account/user', accessMiddleware, async (req, res) => {
  try {
    const account = await Account.findById(req.user.userId).select('-password');
    if (!account) {
      return res.status(404).json({ message: 'Account non trovato' });
    }
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Errore del server');
  }
});

module.exports = router;