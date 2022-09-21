const Usuario = require("../models/usuario");
const Medicos = require("../models/Medico");
const Hospital = require("../models/Hospital");

const getBusqueda = async (req, res) => {
  const { busqueda } = req.params;

  const regex = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medicos.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.status(200).json({
    ok: true,
    msg: "Todo",
    usuarios,
    medicos,
    hospitales,
  });
};
const getDocumentosColeccion = async (req, res) => {
  const { tabla } = req.params;
  const { busqueda } = req.params;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medicos.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      ).populate("hospital","nombre img"); 
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios/medicos/hospitales",
      });

    
  }

   res.json({
     ok: true,
     resultados: data,
   });
};

module.exports = {
  getBusqueda,
  getDocumentosColeccion,
};
