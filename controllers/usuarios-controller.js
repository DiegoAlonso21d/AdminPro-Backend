const  bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require("../models/usuario");



const getUsuarios = async(req, res) => {

const usuarios=await Usuario.find();

  res.status(200).json({
    ok: true,
    msg: "Hola Mundo",
    usuarios,
     uid:req.uid
  });
};

const crearUsuario =async (req, res) => {

   const {email,password}=req.body;

 
    try {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "El correo ya esta registrado",
        });
      }

      const usuario = new Usuario(req.body);

      //Encriptar contraseña

      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      //Guardar Usuario
      await usuario.save();

  //Generar el token - JWT

      const token = await generarJWT(usuario.id);

      res.status(200).json({
        ok: true,
        msg: "Creando Usuario",
        toker:token
      });

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado, revisar logs"
        })
    }

  
};

const actualizarUsuario= async (req,res)=>{


    const uid=req.params.id


    try {

            const usuarioDB=await Usuario.findById(uid);

            if(!usuarioDB){
                return res.status(404).json({
                    ok:false,
                    msg:"No existe un usuario por ese id"
                });
            }

                const {password,google,email,...campos}=req.body;

                if(usuarioDB.email !== email){
          
                    const existeEmail=await Usuario.findOne({email});

                if(existeEmail){
                    return res.status(400).json({
                        ok:false,
                        msg:"Ya existe un usuario con este email"
                    })
                }

            }

            campos.email=email;

            //Validar token si es el usuario correcto

 

            const usuarioActualizado=await Usuario.findByIdAndUpdate(uid,campos,{new :true});

            res.json({
                ok:true,
               usuario:usuarioActualizado
            })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
}

const borrarUsuario=async(req,res)=>{

        const uid=req.params.id

    try {

        const usuarioDB= await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe un usuario por ese id"
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok:true,
            msg:"Usuario Eliminado"
        })



    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok:false,
            msg:"Error, algo fallo"
        })
    }


}


module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};