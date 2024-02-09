const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.log()
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }
    next();
  });
};

module.exports = authenticateToken;
