const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB On line");
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la BD.");
  }
};

module.exports = {
  dbConnection,
};
