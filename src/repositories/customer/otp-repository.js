import prisma from '../../models/prisma.client.js';

const otpRepository = {

  // Create a new OTP or update if it already exists for the customer
  createOrUpdateOtp: async ({ customerId, otpValue, expiresAt }) => {
    return await prisma.oTP.upsert({
      where: { customerId },
      update: {
        otpValue,
        expiresAt,
      },
      create: {
        customerId,
        otpValue,
        expiresAt,
      },
    });
  },
  

  // Find OTP by customer ID
  findOtpByCustomerId: async (customerId) => {
    return await prisma.oTP.findUnique({
      where: { customerId },
    });
  },

  // Delete OTP by customer ID
  deleteOtpByCustomerId: async (customerId) => {
    return await prisma.oTP.delete({
      where: { customerId },
    });
  },
};

export default otpRepository;
