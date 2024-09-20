/*
    Rutas del usuario / auth
    host + '/api/auth'

*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { ExpressValidator } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/register",
  [
    //middelwares
    check("name", "El nombre es obligatorio.").notEmpty(),
    check("email", "El email obligatorio y formato valido.").isEmail(),
    check(
      "password",
      "El password debe de tener al menos 6 caracteres."
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    //Middelwares
    check("email", "El email obligatorio y formato valido.").isEmail(),
    check("password", "El password es obligatorio.").notEmpty(),
    check(
      "password",
      "El password debe de tener al menos 6 caracteres."
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
