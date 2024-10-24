import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { User, OTP } from '../models/index.js';
import { customEnv } from '../config/index.js';
import jwt from 'jsonwebtoken';
import {
  asyncHandler,
  Conflict,
  ResourceNotFound,
  BadRequest,
  Forbidden,
} from '../middlewares/index.js';

import {
  sendMail,
  generateOTP,
  saveOTPToDatabase,
  sendOTPByEmail,
  forgetPasswordMsg,
  sendPasswordResetEmail,
  LoginNotification,
} from '../utils/index.js';

export const registerPage = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, gender } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Conflict('Email already registered!');
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
  });
  await newUser.save();

  const { otp, hashedOTP } = await generateOTP();
  await saveOTPToDatabase(newUser._id, otp, hashedOTP);
  const emailContent = await sendOTPByEmail(newUser, otp);
  await sendMail(emailContent);

  res
    .status(201)
    .json({ message: 'Registration successful. Please verify your email.' });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  const existingOtp = await OTP.findOne({ otp: { $exists: true } });
  if (!existingOtp) {
    throw new BadRequest('Invalid or expired OTP');
  }

  const userId = existingOtp.userOrAdmin;
  const user = await User.findById(userId);
  if (!user) {
    throw new ResourceNotFound('User not found!');
  }

  const isOTPValid = await bcrypt.compare(otp, existingOtp.otp);
  if (!isOTPValid || new Date() > existingOtp.expiresAt) {
    throw new BadRequest('Invalid or expired OTP');
  }

  user.isEmailVerified = true;
  await user.save();
  await OTP.deleteOne({ _id: existingOtp._id });

  res
    .status(200)
    .json({ success: true, message: 'Verification successful login.' });
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ResourceNotFound('Email not found');
  }

  const resetToken = user.getResetPasswordToken();
  await user.save();

  const frontendURL =
    process.env.NODE_ENV === 'production'
      ? process.env.FE_URL_PROD
      : process.env.FE_URL_DEV;
  const resetLink = `${frontendURL}/auth/reset-password/${resetToken}`;

  const emailContent = forgetPasswordMsg(user, resetLink);
  await sendMail(emailContent);

  res.status(200).json({
    success: true,
    message: 'Reset link sent to your mail.',
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword, confirm_newPassword } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new BadRequest('Invalid or expired token');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  const emailContent = sendPasswordResetEmail(user);
  await sendMail(emailContent);
  res.status(200).json({
    success: true,
    message: 'Password reset successfully',
  });
});

export const loginPage = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).select('+password');

  if (!existingUser) {
    throw new ResourceNotFound('Invalid email or password');
  }

  if (!existingUser.isEmailVerified) {
    throw new Forbidden('Please verify your email before logging in.');
  }

  if (existingUser.status !== 'completed') {
    throw new Forbidden('Please complete your registration before logging in.');
  }

  const isPasswordMatch = await account.matchPassword(password);
  if (!isPasswordMatch) {
    throw new Unauthorized('Invalid email or password');
  }

  const { accessToken, refreshToken } = generateTokensAndSetCookies(
    res,
    existingUser._id
  );

  res.status(200).json({
    success: true,
    message: 'login successful',
    accessToken,
    refreshToken,
  });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new Unauthorized('No refresh token provided');
  }

  const decoded = jwt.verify(refreshToken, customEnv.jwtRefreshTokenSecret);

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Unauthorized('User not found');
  }

  const { accessToken } = generateTokensAndSetCookies(user._id);

  return res.status(200).json({ accessToken });
});

export const logOutPage = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
});
