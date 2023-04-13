import Driver from "../Models/driver.js";
import Passenger from "../Models/passenger.js";
import { calculateDistance } from "../Helpers/distance.js";

// Controllador para obtener una lista de todos los choferes.
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un chofer nuevo
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

// Obtener una lista de todos los choferes disponibles
export const getAvailableDrivers = async (req, res) => {
  try {
    const availableDrivers = await Driver.find({ available: true });
    res.status(200).json(availableDrivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una lista de todos los choferes disponibles en un radio de 3 kilómetros.
/*
Se recibe un ID del pasajero que está buscando a los choferes
Se obtiene las coordenadas de ese pasajero, guardando la longitud y latitud en un array.
Luego se obtiene una lista de todos lso choferes con el disponibilidad igual a true.
Se obtienen las coodenadas de los choferes
Se calcula la distancia entre el pasajero y la lista de los choferes disponibles, solamente imprimiendo
los que están en un radio de 3KM (return distance <= 3)
Se devuelve la constante con un status(200) en json.
*/
export const getDriversWithin3Km = async (req, res) => {
  try {
    const passengerId = req.params.passengerId;
    const passenger = await Passenger.findById(passengerId);

    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found." });
    }

    const passengerLocation = [
      passenger.location.coordinates[1],
      passenger.location.coordinates[0],
    ];

    const drivers = await Driver.find({ available: true });

    // Filtro de choferes en un radio de 3KM
    const driversWithin3Km = drivers.filter((driver) => {
      const driverLocation = [
        driver.location.coordinates[1],
        driver.location.coordinates[0],
      ];

      console.log(`Passenger location ` + passengerLocation);
      console.log(`Driver location ` + driverLocation);

      const distance = calculateDistance(
        passengerLocation[0],
        passengerLocation[1],
        driverLocation[0],
        driverLocation[1]
      );
      console.log(`Distance between passenger and drivers ` + distance);
      return distance <= 3;
    });

    res.status(200).json(driversWithin3Km);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Obtener un chofer por ID.
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
