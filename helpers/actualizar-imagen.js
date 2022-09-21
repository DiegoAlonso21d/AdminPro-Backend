
const fs=require('fs')

const Usuario = require("../models/usuario");
const Medicos = require("../models/Medico");
const Hospital = require("../models/Hospital");


const borrarImagen=(path)=>{

      
       if (fs.existsSync(path)) {
         fs.unlinkSync(path);
       }

}


const actualizarImagen = async (tipo, id, nombreArchivo) => {
  
    let pathViejo="";    

    switch (tipo) {
    case "medicos":
      const medico=await Medicos.findById(id);
      if (!medico) {
        console.log("No es un medico por id");
        return false;
      }

       pathViejo=`./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo); 
    

      medico.img=nombreArchivo;
      await medico.save();
      
      return true;


      break;

    case "hospitales":

       const hospital = await Hospital.findById(id);
       if (!hospital) {
         console.log("No es un medico por id");
         return false;
       }

        pathViejo = `./uploads/medicos/${hospital.img}`;
       borrarImagen(pathViejo);

       hospital.img = nombreArchivo;
       await hospital.save();
       return true;

      break;

    case "usuarios":
     const usuario = await Usuario.findById(id);  
      if (!usuario) {
        console.log("No es un medico por id");
        return false;
      }

       pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;

     

      break;

    default:
      break;
  }
};

module.exports = {
  actualizarImagen,
};
