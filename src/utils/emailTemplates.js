import { customEnv } from '../config/index.js';

export const bookingConfirmation = async (newBooking) => ({
  from: customEnv.nodemailerEmail,
  to: newBooking.email,
  subject: 'Booking Confirmation!',
  html: `
        <p>Dear ${newBooking.name}, Thank you for booking a ride with us.</p>
  
        <p>Here are your booking details:</p>

    <ul>
        <li>Car Type: ${newBooking.carType}</li>
        <liPick Up Location: ${newBooking.pickUpLocation}</li>
        <li>Drop Off Location: ${newBooking.dropOffLocation}</li>
        <li>Pick Up Date: ${newBooking.pickUpDate}</li>
        <li>Pick Up Time: ${newBooking.pickUpTime}</li>
        <li>Drop Off Date: ${newBooking.dropOffDate}</li>
        <li>Drop Off Time: ${newBooking.dropOffTime}</li>
        
    </ul>

  <p>Thank you for choosing our service!</p>

  <p>Warm regards,<br>
  Korex autos rentals</p>`,
});

export const contactUsConfirmation = (newContactUs, message) => ({
  from: customEnv.nodemailerEmail,
  to: newContactUs.email,
  subject: 'Welcome to Korex auto rentals!',
  html: `
        <p>Dear  ${newContactUs.firstName} ${newContactUs.lastName}, </p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
        <p>Here is a copy of your message:</p>
        <blockquote>${newContactUs.message}</blockquote>
        <p>Best regards,<br>
      The Korex Autos Rentals Team</p>`,
});

export const sendOTPByEmail = async (newUser, otp, otpExpiryHours = 24) => ({
  from: customEnv.nodemailerEmail,
  to: newUser.email,
  subject: 'Your 6-digit Verification Code',
  html: `  <p>Dear ${newUser.firstName}, </p>
      <p>Use the 6-digit Code provided below to verify your email:</p>
      <p>Your verification code is: <b>${otp}</b></p>
      <p>This code will expire in ${otpExpiryHours} hours.</p>
      <p>If you didn't register, please ignore this email.</p>
      <p>Best regards</p>`,
});

export const forgetPasswordMsg = (user, resetLink) => ({
  from: customEnv.nodemailerEmail,
  to: user.email,
  subject: 'Password Reset Request',
  html: `
          <p>You are receiving this email because you ${user.firstName} ${user.lastName} have requested a password reset.</p>
          
          <p>Please click on the following link to complete the process:\n\n${resetLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.</p>
       
          <p>Best regards,<br>
        The Korex Autos Rentals Team</p>`,
});

export const sendPasswordResetEmail = (user) => ({
  from: customEnv.nodemailerEmail,
  to: user.email,
  subject: 'Password Reset Confirmation',
  html: `
            <p>Hello ${user.first_name},</p>
            
            <p>Your password has been successfully reset. If you did not perform this action, please contact our support team immediately.</p>
            
            <p>Best regards,<br>
          The Korex Autos Rentals Team</p>`,
});
