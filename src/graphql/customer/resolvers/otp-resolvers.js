import { sendOtpController, validateOtpController } from '../../../controllers/customer/otp'
const otpResolvers = {
  Query: {
    // Resolver to send OTP
    sendOtp: async (_, { phoneNumber }) => {
      await sendOtpController(phoneNumber);
      return "OTP sent successfully";
    },

    // Resolver to validate OTP
    validateOtp: async (_, { phoneNumber, otp }) => {
      const result = await validateOtpController(phoneNumber, otp);
      return result;
    },
  },
};

export default otpResolvers;

