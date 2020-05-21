const mongoose = require('mongoose');

const {Schema} = mongoose; //Creamos un Schema

const libroModel = new Schema(
  {
    titulo: { type: String },
    autor: { type: String },
    genero: { type: String },
    visto: { type: Boolean, Default: false },
  }
);

module.exports = mongoose.model('Libro',libroModel) //exporta el modelo