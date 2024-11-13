import { sendOTP } from "../../utils/2factor-utils";
import { generateOTP } from "../../utils/otp-utils";
import otpRepository from "../../repositories/otpRepository";
import prisma from "../../models/prisma.client.js"; 


// Send OTP to customer and store in the database
export const sendOtpController = async (phoneNumber) => {
  console.log("entered sentOtpController")
  // Find customer by phone number
  const customer = await prisma.customer.findUnique({
    where: { phone: phoneNumber },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const otpValue = generateOTP(); // Generate OTP
  await sendOTP(phoneNumber, otpValue); // Send OTP via 2Factor API

  // Set OTP expiration time (5 minutes from now)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

  // Create or update OTP in the database
  await otpRepository.createOrUpdateOtp({
    customerId: customer.id,
    otpValue,
    expiresAt,
  });

  return "OTP sent successfully";
};


// Validate OTP entered by the user
export const validateOtpController = async (phoneNumber, userOtp) => {
  console.log("entered validateOtpController")
  // Find customer by phone number
  const customer = await prisma.customer.findUnique({
    where: { phone: phoneNumber },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  // Find OTP by customerId
  const otpRecord = await otpRepository.findOtpByCustomerId(customer.id);

  if (!otpRecord) {
    throw new Error("OTP not found or expired");
  }

  // Check if OTP is expired
  const isExpired = new Date() > otpRecord.expiresAt;
  if (isExpired) {
    await otpRepository.deleteOtpByCustomerId(customer.id); // Remove expired OTP
    throw new Error("OTP expired");
  }

  // Validate the OTP
  if (otpRecord.otpValue === userOtp) {
    // OTP is valid, delete OTP from the database
    await otpRepository.deleteOtpByCustomerId(customer.id);
    return "OTP validated successfully";
  } else {
    throw new Error("Invalid OTP");
  }
};
