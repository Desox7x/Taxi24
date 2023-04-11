import {config} from 'dotenv';

config();

export const mongoURI = process.env.MONGO_URI;
export const secretKey = process.env.SECRET_KEY;
export const PORT = process.env.PORT || 3000;
