import mongoose from 'mongoose';
import Passenger from '../Models/passenger.js';
import Driver from "../Models/driver.js";


const tripSchema = new mongoose.Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passenger',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  status: {
    type: String,
    enum: ['requested', 'assigned', 'completed', 'active'],
    default: 'requested'
  }
}, { timestamps: true });

const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

export default Trip;
