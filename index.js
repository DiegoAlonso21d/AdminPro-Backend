require("dotenv/config");

const express = require("express");
const cors = require("cors");

const dbConnection = require("./database/config");

const app = express();

//Configurar cors
app.use(cors());

//Middlewares

app.use(express.json());

app.use(express.urlencoded({extended:true}))

//Conexion a Base de Datos
dbConnection();

//Rutas

app.use("/api/usuarios", require("./routes/usuarios-routes"));
app.use("/api/login", require("./routes/auth-routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor corriendo el puerto ", PORT);
});
