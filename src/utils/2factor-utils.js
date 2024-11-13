import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); 

const TWO_FACTOR_API_KEY = process.env.API_KEY; 

// Send OTP to phone number
export const sendOTP = async (phoneNumber, otpValue) => {
  try {
    const response = await axios.get(
      `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phoneNumber}/${otpValue}/OTP1`
    );
    return response.data;  // Return the response data from the API
  } catch (error) {
    throw new Error("Error sending OTP");
  }
};

