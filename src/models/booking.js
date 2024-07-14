import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    carType: {
      type: String,
      required: [true, 'Car type is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    pickUpLocation: {
      type: String,
      required: [true, 'Pick-up location is required'],
    },
    dropOffLocation: {
      type: String,
      required: [true, 'Drop-off location is required'],
    },
    pickUpDate: {
      type: Date,
      required: [true, 'Pick-up date is required'],
    },
    pickUpTime: {
      type: String,
      required: [true, 'Pick-up time is required'],
    },
    dropOffDate: {
      type: Date,
      required: [true, 'Drop-off date is required'],
    },
    dropOffTime: {
      type: String,
      required: [true, 'Drop-off time is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
