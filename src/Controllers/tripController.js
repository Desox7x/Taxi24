import Driver from "../Models/driver.js";
import Passenger from "../models/passenger.js";
import Trip from "../models/trip.js";
import { calculateDistance } from "../helpers/helpers.js";



export const createTrip = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.passengerId);

    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    const availableDrivers = await Driver.find({ status: "available" });

    if (availableDrivers.length === 0) {
      return res.status(404).json({ message: "No available drivers" });
    }

    // find the closest available driver
    let closestDriver = availableDrivers[0];
    let closestDistance = calculateDistance(
      passenger.location.coordinates[1],
      passenger.location.coordinates[0],
      closestDriver.location.coordinates[1],
      closestDriver.location.coordinates[0]
    );

    for (let i = 1; i < availableDrivers.length; i++) {
      const driver = availableDrivers[i];
      const distance = calculateDistance(
        passenger.location.coordinates[1],
        passenger.location.coordinates[0],
        driver.location.coordinates[1],
        driver.location.coordinates[0]
      );

      if (distance < closestDistance) {
        closestDriver = driver;
        closestDistance = distance;
      }
    }

    // update driver status and assign to trip
    closestDriver.status = "assigned";
    await closestDriver.save();

    const newTrip = new Trip({
      driverId: closestDriver._id,
      passengerId: req.params.passengerId,
      status: "assigned",
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const completeTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.status === "completed") {
      return res.status(400).json({ message: "Trip already completed" });
    }

    trip.status = "completed";
    await trip.save();

    const driver = await Driver.findById(trip.driver);
    driver.status = "available";
    await driver.save();

    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getActiveTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ status: "active" }).populate(
      "driver passenger"
    );
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
