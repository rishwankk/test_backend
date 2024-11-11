import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  // Get the token from the "Authorization" header
  const token = req.headers['authorization']?.split(' ')[1];  // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach the userId to the request object
    console.log(req.userId);
    
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateUser;