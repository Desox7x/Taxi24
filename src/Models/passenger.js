import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

const Passenger = mongoose.model('Passenger', passengerSchema);

export default Passenger;
