import crypto from 'crypto';
import { asyncHandler, APIError } from '../middlewares/index.js';
import { authSchema } from '../schema/index.js';
import { User, OTP } from '../models/index.js';
import {
  sanitizeObject,
  sanitizeInput,
  sendMail,
  generateOTP,
  saveOTPToDatabase,
  sendOTPByEmail,
  verifyOTP,
  log,
  forgetPasswordMsg,
  sendPasswordResetEmail,
} from '../utils/index.js';

export const registerPage = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = authSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const { first_name, last_name, email, password, phone_number, gender } =
    value;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new APIError('Email already registered!', 409);
  }

  const newUser = new User({
    first_name,
    last_name,
    email,
    password,
    phone_number,
    gender,
  });
  await newUser.save();

  const { otp, hashedOTP } = await generateOTP();
  await saveOTPToDatabase(newUser._id, otp, hashedOTP);
  const emailContent = sendOTPByEmail(newUser, otp);
  await sendMail(emailContent);

  res
    .status(201)
    .json({ message: 'Registration successful. Please verify your email.' });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = sanitizeInput(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError('User not found!', 404);
  }

  const isOTPValid = await verifyOTP(user._id, otp);
  if (!isOTPValid) {
    throw new APIError('Invalid or expired OTP', 400);
  }

  user.isEmailVerified = true;
  await user.save();
  res.status(200).json({ success: true, message: 'Verification successful.' });
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = sanitizeInput(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError('Email not found', 404);
  }

  const resetToken = user.getResetPasswordToken();
  await user.save();

  // Create reset link
  const frontendURL =
    process.env.NODE_ENV === 'production'
      ? process.env.FE_URL_PROD
      : process.env.FE_URL_DEV;
  const resetLink = `${frontendURL}/auth/reset-password/${resetToken}`;

  const emailContent = forgetPasswordMsg(user, resetLink);
  await sendMail(emailContent);

  res.status(200).json({
    success: true,
    message: 'Reset link sent to your mail successfully',
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = sanitizeInput(req.body);
  if (!newPassword) {
    throw new APIError('Password is required', 400);
  }
  if (newPassword.length < 6) {
    throw new APIError('Password must be at least 6 characters', 400);
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new APIError('Invalid or expired token', 400);
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
