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

const actualizarHospital =async (req, res) => {

  const id=req.params.id
  const uid =req.uid

try {

  const hospital=await Hospital.findById(id);

  if(!hospital){
    return res.status(404).json({
      ok:true,
      msg:"Hospital no encontrado por id"
    })
  }

    const cambiosHospital={
      ...req.body,
      usuario:uid
    }

    const hospitalActualizado=await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true})


    res.json({
    ok: true,
    msg: "ActualizarHospital",
    hospital:hospitalActualizado
  });
} catch (error) {

  console.log(error)

  res.status(500).json({
    ok:false,
    msg:"Hable con el administrador"
  })
}


};

const borrarHospital =async (req, res) => {

  const id=req.params.id
  

try {

  const hospital=await Hospital.findById(id);

  if(!hospital){
    return res.status(404).json({
      ok:true,
      msg:"Hospital no encontrado por id"
    })
  }

    await Hospital.findByIdAndDelete(id);



    res.json({
    ok: true,
    msg: "BorrarHospital",
   
  });
} catch (error) {

  console.log(error)

  res.status(500).json({
    ok:false,
    msg:"Hable con el administrador"
  })
}

};



module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};