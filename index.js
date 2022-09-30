require("dotenv/config");

const express = require("express");
const cors = require("cors");

const dbConnection = require("./database/config");

const app = express();

//Configurar cors
app.use(cors());

//Carpeta publica
app.use(express.static("public"))

//Middlewares

app.use(express.json());

app.use(express.urlencoded({extended:true}))

//Conexion a Base de Datos
dbConnection();

//Rutas

app.use("/api/usuarios", require("./routes/usuarios-routes"));
app.use("/api/todo", require("./routes/busqueda-routes"));
app.use("/api/medicos", require("./routes/medicos-routes"));
app.use("/api/hospitales", require("./routes/hostipales-routes"));
app.use("/api/login", require("./routes/auth-routes"));
app.use("/api/upload", require("./routes/upload-routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor corriendo el puerto ", PORT);
});
