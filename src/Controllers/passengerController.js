import Passenger from "../Models/passenger.js";
import Driver from "../Models/driver.js";
import { calculateDistance } from "../Helpers/distance.js";

//Obtener todos los pasajeros
export const getPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ message: "Error getting passengers." });
  }
};

//Obtener un pasajero por ID
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

//Crear un pasajero nuevo
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

// Obtener una lista de los tres choferes mas cerca del pasajero
/*
Se recibe un ID del pasajero que está buscando a los choferes
Se obtiene las coordenadas de ese pasajero, guardando la longitud y latitud en un array.
Luego se obtiene una lista de todos los choferes con el disponibilidad igual a true.
Se obtienen las coodenadas de los choferes
Se calcula la distancia entre el pasajero y la lista de 3 choferes disponibles mas cerca del pasajero
utilizando (return distance y .slice(0, 3))
Se devuelve la constante con un status(200) en json.
*/
export const getClosestDrivers = async (req, res) => {
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

    // Filtro de choferes y solo devolver 3
    const closestDrivers = drivers
      .filter((driver) => {
        const driverLocation = [
          driver.location.coordinates[1],
          driver.location.coordinates[0],
        ];

        const distance = calculateDistance(
          passengerLocation[0],
          passengerLocation[1],
          driverLocation[0],
          driverLocation[1]
        );

        return distance;
      })
      .slice(0, 3);

    res.status(200).json(closestDrivers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
