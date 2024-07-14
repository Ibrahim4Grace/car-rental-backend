import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Car name is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Car model is required'],
      trim: true,
    },
    manufacturer: {
      type: String,
      required: [true, 'Manufacturer is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Manufacturing year is required'],
    },
    transmission: {
      type: String,
      required: [true, 'Transmission type is required'],
      trim: true,
    },
    mileage: {
      type: String,
      required: [true, 'Mileage is required'],
      trim: true,
    },
    fuel: {
      type: String,
      required: [true, 'Fuel type is required'],
      trim: true,
    },
    seats: {
      type: Number,
      required: [true, 'Number of seats is required'],
    },
    luggage: {
      type: String,
      required: [true, 'Luggage capacity is required'],
      trim: true,
    },
    gps: {
      type: Boolean,
      required: [true, 'GPS availability is required'],
    },
    bluetooth: {
      type: Boolean,
      required: [true, 'Bluetooth availability is required'],
    },
    centralLocking: {
      type: Boolean,
      required: [true, 'Central locking availability is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);

export default Car;
