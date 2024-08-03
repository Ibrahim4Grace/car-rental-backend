import mongoose from 'mongoose';
import validator from 'validator';

const contactUsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v, 'any');
        },
        message: 'Please provide a valid phone number',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

export default ContactUs;
