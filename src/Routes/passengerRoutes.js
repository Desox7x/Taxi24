import { Router } from "express";
import {
  getPassengers,
  getPassengerById,
  getClosestDrivers,
  createPassenger
} from "../Controllers/passengerController.js";

const router = Router();

// Get a list of all passengers
router.get("/passengers", getPassengers);

//Create a new passenger
router.post("/passengers/create", createPassenger);

// For a passenger requesting a trip, get a list of the 3 closest drivers to the starting point
router.get("/passengers/:location/drivers", getClosestDrivers);

// Get a specific passenger by ID
router.get("/passengers/:id", getPassengerById);





export default router;
