import express from 'express';
import connectToDatabase from './Config/db.js';
import driverRoutes from './Routes/driverRoutes.js';
import passengerRoutes from './Routes/passengerRoutes.js';
import cors from 'cors';

//import errorHandler from './Utils/errorHandler.js';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

// Database
connectToDatabase();

// Rutas
app.use(driverRoutes);
app.use(passengerRoutes);
// app.use('/trips', tripRoutes);

// Error handling middleware
//app.use(errorHandler);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
