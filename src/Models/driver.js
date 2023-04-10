import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  license: {
    type: String,
    required: true,
    unique: true,
  },
  car: {
    make: String,
    model: String,
    year: Number,
    color: String,
    plateNumber: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

driverSchema.index({ location: '2dsphere' });

export default mongoose.model('Driver', driverSchema);