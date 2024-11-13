import prisma from '../../models/prisma.client.js';

const otpRepository = {

  // Create a new OTP or update if it already exists for the customer
  createOrUpdateOtp: async ({ customerId, otpValue, expiresAt }) => {
    const existingOtp = await prisma.otp.findUnique({
      where: { customerId },
    });

    if (existingOtp) {
      // If OTP exists, update it
      return await prisma.otp.update({
        where: { customerId },
        data: { otpValue, expiresAt },
      });
    } else {
      // If OTP doesn't exist, create a new one
      return await prisma.otp.create({
        data: { customerId, otpValue, expiresAt },
      });
    }
  },

  // Find OTP by customer ID
  findOtpByCustomerId: async (customerId) => {
    return await prisma.otp.findUnique({
      where: { customerId },
    });
  },

  // Delete OTP by customer ID
  deleteOtpByCustomerId: async (customerId) => {
    return await prisma.otp.delete({
      where: { customerId },
    });
  },
};

export default otpRepository;
