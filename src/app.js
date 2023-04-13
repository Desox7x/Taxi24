import express from "express";
import connectToDatabase from "./Config/db.js";
import { PORT } from "./Config/config.js";
import driverRoutes from "./Routes/driverRoutes.js";
import passengerRoutes from "./Routes/passengerRoutes.js";
import tripRoutes from "./Routes/tripRoutes.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Database
connectToDatabase();

// Rutas
app.use(driverRoutes);
app.use(passengerRoutes);
app.use(tripRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
