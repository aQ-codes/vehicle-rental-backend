import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

// Generate Access Token with identity and role
export const generateAccessToken = (identity, role) => {
  return jwt.sign(
    { identity, role },  // Add role to the payload
    process.env.JWT_ACCESS_TOKEN_SECRET, 
    { expiresIn: '15m' }  // Set expiration for 15 minutes
  );
};

// Generate Refresh Token with identity and role
export const generateRefreshToken = (identity, role) => {
  return jwt.sign(
    { identity, role },  // Add role to the payload
    process.env.JWT_REFRESH_TOKEN_SECRET, 
    { expiresIn: '1d' }  // Set expiration for 1 day
  );
};

import { generateAccessToken } from './token-utils.js';

const refreshAccessToken = async (req, res) => {
  // Get the user information from the middleware
  const { identity, role } = req.user; // Access identity and role directly from req.user

  // Find the user by email
  const user = await User.findOne({ email: identity });

  if (!user || user.refreshToken !== req.body.refreshToken) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  // Generate new access token
  const newAccessToken = generateAccessToken(identity, role);

  return res.status(200).json({ accessToken: newAccessToken });
};

export default refreshAccessToken;


