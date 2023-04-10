import { Router } from "express";
import {
  getAllDrivers,
  createDriver,
  getDriverById,
  getAvailableDrivers,
  getDriversWithin3Km,
} from "../controllers/driverController.js";

const router = Router();

//Get a list of all drivers
router.get("/drivers", getAllDrivers);

//Create a driver
router.post("/drivers/create", createDriver);

// Get a list of all available drivers
router.get('/drivers/available', getAvailableDrivers);

// Get a specific driver by ID
router.get('/drivers/:id', getDriverById);



// Get a list of all available drivers within a 3 km radius of the specified location
router.get('/drivers/available/:location', getDriversWithin3Km);

export default router;
