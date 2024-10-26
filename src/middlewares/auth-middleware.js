import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Function to get user from token
const getUserFromToken = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    } catch (err) {
      console.error('Invalid or expired token:', err.message);
    }
  }
  return null;
};

// Middleware to check JWT token and authenticate user
const authMiddleware = () => {
  return ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const accessToken = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    const user = getUserFromToken(accessToken); // Get user from the access token

    // Return the user if authenticated, or null if not
    return user; 
  };
};

export default authMiddleware;
