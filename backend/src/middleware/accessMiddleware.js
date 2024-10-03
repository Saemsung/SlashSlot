const jwt = require('jsonwebtoken');

const accessMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token di autenticazione mancante' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Errore di autenticazione:', error);
    return res.status(403).json({ message: 'Token non valido o scaduto' });
  }
};

module.exports = accessMiddleware;