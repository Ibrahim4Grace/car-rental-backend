import bcrypt from 'bcryptjs';
import { User, OTP } from '../models/index.js';
import { customEnv } from '../config/index.js';
import jwt from 'jsonwebtoken';
import { userPasswordService, adminPasswordService } from '../service/index.js';
import {
  asyncHandler,
  Conflict,
  ResourceNotFound,
  BadRequest,
  Forbidden,
  Unauthorized,
} from '../middlewares/index.js';

import {
  sendMail,
  generateOTP,
  saveOTPToDatabase,
  sendOTPByEmail,
  loginNotification,
  generateTokensAndSetCookies,
  welcomeEmail,
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

  const emailContent = welcomeEmail(user);
  await sendMail(emailContent);

  res
    .status(200)
    .json({ success: true, message: 'Verification successful login.' });
});

export const adminForgotPassword = asyncHandler(async (req, res) => {
  const message = await adminPasswordService.handleForgotPassword(
    req.body.email
  );
  sendJsonResponse(res, 200, message);
});

export const adminVerifyPasswordOtp = asyncHandler(async (req, res) => {
  const resetToken = await adminPasswordService.handleVerifyOTP(req.body.otp);
  sendJsonResponse(
    res,
    200,
    'OTP verified successfully. You can now reset your password.',
    { resetToken }
  );
});

export const adminResetPassword = asyncHandler(async (req, res) => {
  const resetToken = req.headers.authorization?.split(' ')[1];
  const message = await adminPasswordService.handleResetPassword(
    resetToken,
    req.body.newPassword
  );
  sendJsonResponse(res, 200, message);
});

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ResourceNotFound('Invalid email or password');
  }

  if (!user.isEmailVerified) {
    throw new Forbidden('Verify your email before sign in.');
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    throw new Unauthorized('Invalid email or password');
  }

  const emailContent = loginNotification(user);
  await sendMail(emailContent);

  const { accessToken, refreshToken } = generateTokensAndSetCookies(
    res,
    user._id
  );

  res.status(200).json({
    success: true,
    message: 'login successful',
    accessToken,
    refreshToken,
  });
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ResourceNotFound('Invalid email or password');
  }

  if (!user.isEmailVerified) {
    throw new Forbidden('Verify your email before sign in.');
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    throw new Unauthorized('Invalid email or passwordd');
  }

  const userId = user._id.toString();
  const { accessToken, refreshToken } = generateTokensAndSetCookies(
    res,
    userId
  );

  const userResponse = user.toObject();
  delete userResponse.password;

  sendJsonResponse(
    res,
    200,
    'Login successful',
    {
      user: userResponse,
    },
    accessToken,
    refreshToken
  );
});

export const userForgotPassword = asyncHandler(async (req, res) => {
  const message = await userPasswordService.handleForgotPassword(
    req.body.email
  );
  sendJsonResponse(res, 200, message);
});

export const userVerifyPasswordOtp = asyncHandler(async (req, res) => {
  const resetToken = await userPasswordService.handleVerifyOTP(req.body.otp);
  sendJsonResponse(
    res,
    200,
    'OTP verified successfully. You can now reset your password.',
    { resetToken }
  );
});

export const userResetPassword = asyncHandler(async (req, res) => {
  const resetToken = req.headers.authorization?.split(' ')[1];
  const message = await userPasswordService.handleResetPassword(
    resetToken,
    req.body.new_password
  );
  sendJsonResponse(res, 200, message);
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new Unauthorized('No refresh token provided');
  }

  const decoded = jwt.verify(refreshToken, customEnv.refreshTokenSecret);

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Unauthorized('User not found');
  }

  const { accessToken } = generateTokensAndSetCookies(user._id);

  return res.status(200).json({ accessToken });
});

export const logOutPage = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});
