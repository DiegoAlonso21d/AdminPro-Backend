const Hospital=require('../models/Hospital');

const getHospitales= async(req,res)=>{

  const hospitales= await Hospital.find()
  .populate("usuario","nombre img");


    res.json({
        ok:true,
        msg:"GetHospitales",
        hospitales:hospitales
    })
}


const crearHospital = async(req, res) => {
  const uid=req.uid;
  const hospitalDB=new Hospital({
   usuario: uid,
    ...req.body});

 
  console.log(uid);

  try {

      await hospitalDB.save();
      
  res.json({
    ok: true,
    hospital:hospitalDB
  });

  } catch (error) {
    res.status(500).json({
      ok:false,
      msg:"Hable con el administrador"
    })
  }

};

const actualizarHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "ActualizarHospital",
  });
};

const borrarHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "borrarHospital",
  });
};



module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};