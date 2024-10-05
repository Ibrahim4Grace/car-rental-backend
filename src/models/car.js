import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
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
    state: {
      type: String,
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
    price: {
      type: Number,
      required: true,
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
