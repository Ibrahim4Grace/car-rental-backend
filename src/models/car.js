import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      trim: true,
    },
    license_plate: {
      type: String,
      required: true,
      trim: true,
    },
    mileage: {
      type: String,
      required: true,
      trim: true,
    },
    rent_price: {
      type: Number,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
      trim: true,
    },
    image: { imageId: String, imageUrl: String },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);

export { Car };
