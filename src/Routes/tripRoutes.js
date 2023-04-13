import express from "express";
import {
  createTrip,
  completeTrip,
  getActiveTrips,
} from "../Controllers/tripController.js";

const router = express.Router();

// Crear un nuevo viaje.
router.post("/trips/create", createTrip);

// Marcar un viaje como completado.
router.patch("/trips/:id/complete", completeTrip);

// Obtener todos los viajes activos.
router.get("/trips/active", getActiveTrips);

export default router;
