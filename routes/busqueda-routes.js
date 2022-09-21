
// ruta api/todo

const { Router } = require("express");
const { check } = require("express-validator");
const {  getBusqueda, getDocumentosColeccion } = require("../controllers/busqueda-controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();


router.get("/:busqueda", validarJWT, getBusqueda);
router.get("/coleccion/:tabla/:busqueda", validarJWT, getDocumentosColeccion);

module.exports=router