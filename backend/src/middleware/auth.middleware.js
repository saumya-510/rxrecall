const jwt = require('jsonwebtoken');

// This function runs before protected routes
// It checks if the user sent a valid login token
const protect = (req, res, next) => {
  // Get token from request header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authorized. Please log in.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next(); // Continue to the actual route
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid or expired.' });
  }
};

module.exports = { protect };