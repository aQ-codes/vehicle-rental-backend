import { sendOtpController, validateOtpController } from '../../../controllers/customer/otp-controller.js'

const otpResolvers = {
  Query: {
    // Resolver to validate OTP
    validateOtp: async (_, { phoneNumber, otp }) => {
      const result = await validateOtpController(phoneNumber, otp);
      return result;
    },
  },

  Mutation:{
    // Resolver to send OTP
    sendOtp: async (_, { phoneNumber }) => {
      console.log("entered otp resolver")
      return await sendOtpController(phoneNumber);
    },
  },


};

export default otpResolvers;

