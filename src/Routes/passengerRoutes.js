import { Router } from "express";
import {
  getPassengers,
  getPassengerById,
  getClosestDrivers,
  createPassenger,
} from "../Controllers/passengerController.js";

const router = Router();

// Obtener una lista de todos los pasajeros
router.get("/passengers", getPassengers);

//Crear un nuevo pasajero
router.post("/passengers/create", createPassenger);

// Obtener una lista de los 3 choferes mas cerca del pasajero.
router.get("/passengers/:location/drivers", getClosestDrivers);

// Obtener un pasajero por ID.
router.get("/passengers/:id", getPassengerById);

export default router;
