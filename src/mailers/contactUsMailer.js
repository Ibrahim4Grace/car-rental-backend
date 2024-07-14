import nodemailer from 'nodemailer';
import logger from '../../logger/logger.js';
import customEnv from '../config/customEnv.js';

const transporter = nodemailer.createTransport({
  service: customEnv.mailerService,
  auth: {
    user: customEnv.nodemailerEmail,
    pass: customEnv.nodemailerPassword,
  },
});

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

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      logger.info('Email sending error:', error);
    } else {
      logger.info('Email sent:', info.response);
    }
  });
};

export default sendContactUsEmail;
