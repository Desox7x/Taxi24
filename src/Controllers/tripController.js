import Driver from "../Models/driver.js";
import Passenger from "../Models/passenger.js";
import Trip from "../Models/trip.js";
import { calculateDistance } from "../Helpers/distance.js";

/*
Primero se obtiene el ID del pasajero, si el pasajero no existe devuelve un 404.
Busca todos los choferes disponibles.
Busca al conductor mas cercano utilizando la formula del semiverseno que se encuentra en distance.js bajo la carpeta Helpers.
Actualiza la disponibilidad del chofer a false.
Se crea un documento Trip, utilizando un el ID del chofer, ID del pasajero, y el cambio de status.
A la hora de testear, solo hay que poner el ID del pasajero.
*/
export const createTrip = async (req, res) => {
  try {
    console.log(req.body);
    const passenger = await Passenger.findById(req.body.passengerId);

    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    const availableDrivers = await Driver.find({ available: true });

    if (availableDrivers.length === 0) {
      return res.status(404).json({ message: "No available drivers" });
    }

    // Buscar el conductor mas cercano utilizando la fórmula de semiverseno
    //Ubicada en Helpers/distance.js
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

    closestDriver.available = false;
    console.log(closestDriver);
    await closestDriver.save();

    const newTrip = new Trip({
      driverId: closestDriver._id,
      passengerId: req.body.passengerId,
      status: "assigned",
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//Marcar viaje como completado
export const completeTrip = async (req, res) => {
  try {
    //Recibe como parámetro el id del viaje.
    const { id } = req.params;
    const trip = await Trip.findById(id);

    //Primero se busca el viaje por su id y se verifica que exista.
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    //Luego se verifica que el estado del viaje no sea "completed".
    if (trip.status === "completed") {
      return res.status(400).json({ message: "Trip already completed" });
    }

    //Si todo está en orden, se actualiza el estado del viaje a "completed".
    trip.status = "completed";
    await trip.save();

    //Se busca el conductor asociado al viaje por su id.
    const driver = await Driver.findById(trip.driverId);

    //Si no se encuentra el conductor, se envía un error 404.
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    //En caso contrario, se actualiza la disponibilidad del conductor a true.
    driver.available = true;
    await driver.save();

    //Se envía como respuesta el viaje actualizado.
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//Obtener una lista de viajes activos
export const getActiveTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ status: "assigned" })
      .select("driver passenger")
      .exec();
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
