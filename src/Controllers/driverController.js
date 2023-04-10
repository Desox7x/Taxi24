import Driver from "../Models/driver.js";
import { calculateDistance } from "../Helpers/helpers.js";

// Get a list of all drivers
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new driver
export const createDriver = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    const savedDriver = await driver.save();
    res.status(201).json(savedDriver);
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a list of all available drivers
export const getAvailableDrivers = async (req, res) => {
  try {
    const availableDrivers = await Driver.find({ available: true });
    res.status(200).json(availableDrivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a list of all available drivers within a 3 km radius of the specified location
export const getDriversWithin3Km = async (req, res) => {
  try {
    const passengerLocation = req.params.location.split(",").map(parseFloat);
    const drivers = await Driver.find({ available: true });

    // filter drivers within 3km range
    const driversWithin3Km = drivers.filter((driver) => {
      const driverLocation = [
        driver.location.coordinates[0],
        driver.location.coordinates[1],
      ];
      const distance = calculateDistance(passengerLocation, driverLocation);

      return distance <= 3;
    });
    console.log(drivers);
    console.log(driversWithin3Km);
    console.log(passengerLocation);
    
    res.status(200).json(driversWithin3Km);
  } catch (error) {
    res.status(500).json({ message: "No se han encontrado taxistas." });
  }
};

// Get a specific driver by ID
export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
