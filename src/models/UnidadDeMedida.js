const mongoose = require('mongoose');

const schema_unidad_de_medida = new mongoose.Schema({
    nombre: String
}, {
    versionKey: false
});

module.exports = mongoose.model('UnidadDeMedida', schema_unidad_de_medida);