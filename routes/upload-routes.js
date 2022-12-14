// ruta api/uploads/

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { fileUpload, retornaImagen } = require("../controllers/upload-controller");

const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload);
router.get("/:tipo/:foto", retornaImagen);

module.exports = router;
