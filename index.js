require('dotenv/config');

const express=require('express');
const cors=require('cors')

const dbConnection = require('./database/config');

const   app=express();

//Rutas
app.get("/",(req,res)=>{
    res.status(400).json({
        ok:true,
        msg:"Hola Mundo"
    })
})

//Configurar cors
app.use(cors());


//Conexion a Base de Datos
dbConnection();



const PORT=process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor corriendo el puerto ", PORT);
});