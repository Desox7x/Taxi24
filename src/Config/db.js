import mongoose from 'mongoose';
import config from './config.js';

async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('Connected to database!');
  } catch (error) {
    console.error('Error connecting to database: ', error);
    process.exit(1);
  }
}

export default connectToDatabase;
