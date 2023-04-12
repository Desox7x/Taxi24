# TAXI 24

## Descripción del proyecto

**¿Quién es Taxi24?**
Taxi24 es una nueva startup que quiere revolucionar la industria del transporte proporcionando una solución de marca blanca existentes. Prácticamente, construirán un conjunto de APIs que otras compañías puedan utilizar para gestionar su flota de pasajeros.

El proyecto está construido con ***Node.js, Express y MongoDB***. Se ha utilizado **Mongoose** como ODM para interactuar con la base de datos.


## Instalación


Para empezar a trabajar con este proyecto, siga los siguientes pasos:

  

Clone el repositorio en su máquina local.

    git clone https://github.com/Desox7x/Taxi24.git

  

Instale las dependencias necesarias.


    cd <ruta-del-repositorio-clonado>
    
    npm install

 Configure las variables de entorno en un archivo .env. Un ejemplo de archivo .env se proporciona en el archivo .env.example.

    MONGO_URI=<su URL de MongoDB>
    PORT=<puerto en el que desea que se ejecute la aplicación>
      

Inicie el servidor.


    npm start

  ## Estructura del proyecto

El proyecto sigue la estructura de la arquitectura MVC, que significa Modelo-Vista-Controlador. Los archivos están organizados de la siguiente manera:

    taxi24-api/
    ├── app.js (punto de entrada para la aplicación)
    ├── Config/
    │   ├── config.js (contiene variables de configuración para la aplicación)
    │   └── db.js (contiene la configuración para conectarse a la base de datos)
    ├── Controllers/
    │   ├── driverController.js
    │   ├── passengerController.js
    │   └── tripController.js
    ├── helpers/
    │   ├── calculateDistance.js (contiene la función para calcular la distancia entre dos puntos geográficos)
    ├── Models/
    │   ├── driver.js
    │   ├── passenger.js
    │   └── trip.js
    ├── Routes/
    │   ├── driverRoutes.js
    │   ├── passengerRoutes.js
    │   └── tripRoutes.js


-   `controllers/`: contiene los controladores de la aplicación.
-   `models/`: contiene los modelos de datos de la aplicación.
-   `routes/`: contiene las rutas de la aplicación.
- `helpers/`: contiene la función calculateDistance.js
-   `app.js`: el archivo principal de la aplicación que configura el servidor y las rutas.
-   `.env`: el archivo que contiene las variables de entorno.
-   `.gitignore`: el archivo que contiene las rutas de los archivos que no se deben subir al repositorio.
-   `package-lock.json`: el archivo que contiene información detallada de las dependencias instaladas.
-   `package.json`: el archivo que contiene la información sobre el proyecto y las dependencias.

## Endpoints


**driverRoutes.js:**

-   `GET /drivers`: Retrieves a list of all drivers in the database.
-   `POST /drivers/create`: Creates a new driver record in the database.
-   `GET /drivers/available`: Retrieves a list of all available drivers in the database.
-   `GET /drivers/:id`: Retrieves a specific driver record by ID from the database.
-   `GET /drivers/available/:passengerId`: Retrieves a list of all available drivers within a 3 km radius from a specified passenger's location.

**passengerRoutes.js:**

-   `GET /passengers`: Retrieves a list of all passengers in the database.
-   `POST /passengers/create`: Creates a new passenger record in the database.
-   `GET /passengers/:location/drivers`: For a passenger requesting a trip, retrieves a list of the 3 closest drivers to the starting point.
-   `GET /passengers/:id`: Retrieves a specific passenger record by ID from the database.

**tripRoutes.js:**

-   `POST /trips/create`: Creates a new trip record in the database.
-   `PATCH /trips/:id/complete`: Marks a trip as complete in the database.
-   `GET /trips/active`: Retrieves a list of all active trips from the database.

## Data

Los documentos ".sampledata.json" contienen data de ejemplo que funcionan para que puedas probar las distintas funciones de la API. Pueden encontrarlas en la carpeta llamada "Data".
