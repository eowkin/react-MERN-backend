const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//CREANDO EL SERVIDOR EXPRESS
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//DIRECTORIO PUBLICO
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//RUTAS
//TODO: auth //crear,login, renewtoken
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//TODO: CRUD: eventos

//ESCUCHAR PETICIONES
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
