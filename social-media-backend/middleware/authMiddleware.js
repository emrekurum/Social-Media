const jwt = require('jsonwebtoken');

// Kullanıcıyı doğrulayan middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Yetkisiz erişim, token gerekli.' });
  }

  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Geçersiz token.' });
    }
    req.user = user; // Kullanıcıyı req içine atıyoruz
    next();
  });
};

module.exports = { authenticateToken };
