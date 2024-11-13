// src/resolvers/customerAuthResolvers.js

import authController from "../../../controllers/customer/auth-controller.js";


const customerAuthResolvers = {
  Mutation: {
    loginCustomer: async (_, { email, password }) => {

      const result = await authController.loginCustomer(email, password);
      
      console.log(result)

      if (!result.success) {
        return { success: false, errors: result.errors };
      }

      // Set token as an HTTP-only cookie
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return { success: true, id: result.id };
    },

    logoutCustomer: async () => {
      console.log("entered logout resolver")
      return await customerAuthController.logoutCustomer(); 
    },
  },
};

export default customerAuthResolvers;
