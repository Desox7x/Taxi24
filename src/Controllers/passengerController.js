import Passenger from "../Models/passenger.js";
import Driver from "../Models/driver.js";
import { calculateDistance } from "../Helpers/distance.js";

export const getPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ message: "Error getting passengers." });
  }
};

export const getPassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found." });
    }
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: "Error getting passenger." });
  }
};

export const createPassenger = async (req, res) => {
  try {
    const passenger = new Passenger(req.body);
    const savedPassenger = await passenger.save();
    res.status(201).json(savedPassenger);
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getClosestDrivers = async (req, res) => {
  try {
    const passengerLocation = req.params.location.split(",").map(parseFloat);
    const drivers = await Driver.find({ available: true });

    // sort drivers by distance to passenger
    drivers.sort((driver1, driver2) => {
      const driverLocation = [
        driver1.location.coordinates[0],
        driver1.location.coordinates[1],
      ];
      const distance1 = calculateDistance(passengerLocation, driverLocation);
      
      const driver2Location = [
        driver2.location.coordinates[0],
        driver2.location.coordinates[1],
      ];
      const distance2 = calculateDistance(passengerLocation, driver2Location);
      
      return distance1 - distance2;
    });

    // return the three closest drivers
    const closestDrivers = drivers.slice(0, 3);
    res.status(200).json(closestDrivers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting drivers." });
  }
};