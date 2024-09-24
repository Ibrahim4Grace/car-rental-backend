import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import { OTP } from '../models/index.js';
import { asyncHandler } from '../middlewares/index.js';

const hashFunction = async (data) => {
  const saltRounds = 10;
  return bcrypt.hash(data, saltRounds);
};

export const generateOTP = async () => {
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const hashedOTP = await hashFunction(otp);
  return { otp, hashedOTP };
};

export const saveOTPToDatabase = asyncHandler(
  async (userId, otp, hashedOTP) => {
    const newOTP = new OTP({
      userOrAdmin: userId,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await newOTP.save();
    return otp;
  }
);

export const verifyOTP = asyncHandler(async (userId, inputOTP) => {
  console.log('Searching for OTP...'.grey);

  console.log('Finding OTP from database...'.green);
  const existingOtp = await OTP.findOne({ userOrAdmin: userId });
  if (!existingOtp || !existingOtp.otp) {
    console.log('No OTP found or expired.');
    return false;
  }

  const isMatch = await bcrypt.compare(inputOTP, existingOtp.otp);
  if (!isMatch || new Date() > existingOtp.expiresAt) {
    console.log('Invalid or expired OTP entered!!!');
    return false;
  }

  console.log('Valid OTP entered, email verified.');
  return true;
});
