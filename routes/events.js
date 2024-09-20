/*
    Rutas del events / events
    host + '/api/events'

*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getEvents,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

//TODAS PASAN POR validaJWT podemos hacerlo asi, subir el middleware
router.use(validarJWT);

router.get("/", getEvents);

router.post(
  "/",
  [
    //middelwares
    check("title", "El titulo es obligatorio.").notEmpty(),
    check("start", "La fecha de inicio es obligatorio.").custom(isDate), ///Validacion personalizada. Se crea una funcion en helpers
    check("end", "La fecha de finalizacion es obligatorio.").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

router.put(
  "/:id",
  [
    //middelwares
    check("title", "El titulo es obligatorio.").notEmpty(),
    check("start", "La fecha de inicio es obligatorio.").custom(isDate), ///Validacion personalizada. Se crea una funcion en helpers
    check("end", "La fecha de finalizacion es obligatorio.").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

router.delete("/:id", eliminarEvento);

module.exports = router;
