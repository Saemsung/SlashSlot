const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');
const accessMiddleware = require('../middleware/accessMiddleware');

router.post('/access/register', accessController.register);
router.post('/access/login', accessController.login);
router.post('/access/refresh-token', accessController.refreshToken);
router.post('/access/reset-password-request', accessController.requestPasswordReset);
router.post('/access/reset-password', accessController.resetPassword);
router.post('/access/logout', accessMiddleware, accessController.logout);

// Esempio di route protetta
router.get('/access/protected', accessMiddleware, (req, res) => {
  res.json({ message: 'Accesso consentito', userId: req.user.userId });
});

module.exports = router;