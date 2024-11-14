import { sendOTP } from "../../utils/2factor-utils.js";
import { generateOTP } from "../../utils/otp-utils.js";

import prisma from "../../models/prisma.client.js"; 
import otpRepository from "../../repositories/customer/otp-repository.js";


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
  console.log(otpValue)
  // const response = await sendOTP(phoneNumber, otpValue); // Send OTP via 2Factor API
  // console.log(response)

  // if (response.Status==='Success'){

    // Set OTP expiration time (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

    // Create or update OTP in the database
    await otpRepository.createOrUpdateOtp({
      customerId: customer.id,
      otpValue,
      expiresAt,
    });

  return "OTP sent successfully";
  // }

};


// Validate OTP entered by the user
export const validateOtpController = async (phoneNumber, userOtp) => {

  console.log("entered validate otpcontroller")
  // Find customer by phone number
  const customer = await prisma.customer.findUnique({
    where: { phone: phoneNumber },
  });



  if (!customer) {
    throw new Error("Customer not found");
  }

  // Find OTP by customerId
  const otpRecord = await otpRepository.findOtpByCustomerId(customer.id);

  console.log(otpRecord)

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
    return "success";
  } else {
    throw new Error("Invalid OTP");
  }
};
