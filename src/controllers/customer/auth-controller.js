// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
import authRepository from '../../repositories/customer/auth-repository.js';

dotenv.config(); 


const authController = {
  loginCustomer: async (email, password) => {
    try {

      // Find customer by email
      const customer = await authRepository.findCustomerByEmail(email);
      if (!customer) {
        return { success: false, errors: ["Email not found"] };
      }
      console.log("after ")

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (!isPasswordValid) {
        return { success: false, errors: ["Invalid password"] };
      }

      // Generate JWT
      const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      return { success: true, id: customer.id};
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, errors: ["An error occurred while logging in."] };
    }
  },



  logoutCustomer: async () => {
    try {
      // Clear the token cookie by setting it to an empty value and an immediate expiration
      res.clearCookie("session_id", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict", // Ensures the cookie is only sent for same-site requests
      });

      return { success: true, errors: [] };
    } catch (error) {
      console.error("Error during logout:", error);
      return { success: false, errors: ["An error occurred while logging out."] };
    }
  },

};

export default authController;
