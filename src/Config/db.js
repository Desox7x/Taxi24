import mongoose from 'mongoose';
import {mongoURI} from './config.js';

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to database!');
  } catch (error) {
    console.error('Error connecting to database: ', error);
    process.exit(1);
  }
}

export default connectToDatabase;
