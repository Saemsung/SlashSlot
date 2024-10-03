const jwt = require('jsonwebtoken');

const accessMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Accesso negato. Token mancante.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Cambiato da req.account a req.user
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token non valido' });
  }
};

module.exports = accessMiddleware;