import express from 'express';
import {
  createTrip,
  completeTrip,
  getActiveTrips,
} from '../Controllers/tripController.js';

const router = express.Router();

// POST route to create a new trip
router.post('/trips/create', createTrip);

// PATCH route to mark a trip as complete
router.patch('/trips/:id/complete', completeTrip);

// GET route to retrieve all active trips
router.get('/trips/active', getActiveTrips);

export default router;