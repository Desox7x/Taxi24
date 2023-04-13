import { Router } from "express";
import {
  getAllDrivers,
  createDriver,
  getDriverById,
  getAvailableDrivers,
  getDriversWithin3Km,
} from "../Controllers/driverController.js";

const router = Router();

//Obtener una lista de todos los choferes
router.get("/drivers", getAllDrivers);

//Crear un chofer
router.post("/drivers/create", createDriver);

// Obtener una lista de todos los choferes disponibles
router.get('/drivers/available', getAvailableDrivers);

// Obtener un chofer por ID
router.get('/drivers/:id', getDriverById);

// Obtener una lista de todos los choferes disponibles en un radio de 3 kilómetros.
router.get('/drivers/available/:passengerId', getDriversWithin3Km);

export default router;
