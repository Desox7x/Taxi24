import express from 'express';
import {
  createTrip,
  completeTrip,
  getActiveTrips,
} from '../controllers/tripController.js';

const router = express.Router();

router.post('/trips/create', createTrip);
router.patch('/trips/:id/complete', completeTrip);
router.get('/trips/active', getActiveTrips);

export default router;