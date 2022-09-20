
//Ruta /api/usuarios

const {Router}=require('express');
const{check}=require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios-controller');
const { validarJWT } = require('../middlewares/validar-JWT');
const { generarJWT } = require('../helpers/jwt');


const router=Router();


router.get("/", validarJWT, getUsuarios);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check("email", "Formato de email incorrecto").isEmail().not().isEmpty(),
    validarCampos
  ],
  crearUsuario
);


router.put("/:id", [

  validarJWT ,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("password", "La contraseña es obligatorio").not().isEmpty(),
  check("email", "Formato de email incorrecto").isEmail().not().isEmpty(),
  validarCampos,
 
], 
actualizarUsuario
);

router.delete("/:id",validarJWT,borrarUsuario)






module.exports=router;

