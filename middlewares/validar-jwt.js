const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: "false",
      msg: "No se encontro el token en el header.",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    //console.log("validarJwt --> " + payload);

    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res.status(401).json({
      ok: "false",
      msg: "Token invalido.",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
