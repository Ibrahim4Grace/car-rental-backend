import nodemailer from 'nodemailer';
import logger from '../../logger/logger.js';
import customEnv from '../config/customEnv.js';

// Helper function to send email and log the result
const transporter = nodemailer.createTransport({
  service: customEnv.mailerService,
  auth: {
    user: customEnv.nodemailerEmail,
    pass: customEnv.nodemailerPassword,
  },
});

const sendEmail = async (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.info('Email sending error:', error);
    } else {
      logger.info('Email sent:', info.response);
    }
  });
};

const sendContactUsEmail = async (newContactUs, message) => {
  const verifiedMsg = `
    <p><img src="cid:companyLogo" alt="companyLogo" style="width: 100%; height: 250px;"/></p><br>
    <p>Dear  ${newContactUs.firstName} ${newContactUs.lastName}, </p>
      
    <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>

    <p>Here is a copy of your message:</p>
    <blockquote>${newContactUs.message}</blockquote>
      
    <p>Best regards,<br>
    The Korex Autos Rentals Team</p>`;

  // Send the second email for verified users
  const mailOptions = {
    from: customEnv.nodemailerEmail,
    to: newContactUs.email,
    subject: 'Welcome to Korex auto rentals!',
    html: verifiedMsg,
    attachments: [
      {
        filename: 'companyLogo.jpg',
        path: './src/public/img/companyLogo.jpg',
        cid: 'companyLogo',
      },
    ],
  };

  await sendEmail(mailOptions);
};

const sendBookingConfirmation = async (newBooking) => {
  const msg = `
  <p><img src="cid:companyLogo" alt="companyLogo" style="width: 100%; height: 250px;"/></p><br>
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
  Korex autos rentals</p>`;

  const mailOptions = {
    from: customEnv.nodemailerEmail,
    to: newBooking.email,
    subject: 'Booking Confirmation!',
    html: msg,
    attachments: [
      {
        filename: 'companyLogo.jpg',
        path: './src/public/img/companyLogo.jpg',
        cid: 'companyLogo',
      },
    ],
  };

  await sendEmail(mailOptions);
};

export { sendContactUsEmail, sendBookingConfirmation };
