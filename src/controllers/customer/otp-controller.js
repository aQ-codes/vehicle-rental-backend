import { generateOTP } from "../../utils/otp-utils";

// In-memory storage for OTPs
const otpStore = new Map();

// Send OTP and store in memory
export const sendOtpController = async (phoneNumber) => {
  const otpValue = generateOTP(); // Generate OTP
  await sendOTP(phoneNumber, otpValue); // Send OTP via 2Factor API

  // Store OTP in memory with a timestamp for expiration
  otpStore.set(phoneNumber, { otpValue, createdAt: Date.now() });

  return "OTP sent successfully";
};

// Validate OTP entered by the user
export const validateOtpController = async (phoneNumber, userOtp) => {
  const otpRecord = otpStore.get(phoneNumber);

  if (!otpRecord) {
    throw new Error("OTP not found or expired");
  }

  // Check if the OTP is still valid (e.g., within 5 minutes)
  const timeDifference = (Date.now() - otpRecord.createdAt) / 1000 / 60; // Time difference in minutes
  if (timeDifference > 5) {
    otpStore.delete(phoneNumber); // Remove expired OTP
    throw new Error("OTP expired");
  }

  // Validate the OTP
  if (otpRecord.otpValue === userOtp) {
    otpStore.delete(phoneNumber); // Remove OTP after successful validation
    return "OTP validated successfully";
  } else {
    throw new Error("Invalid OTP");
  }
};
