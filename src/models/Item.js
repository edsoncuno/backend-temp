const mongoose = require('mongoose');

const schema_item = new mongoose.Schema({
    categoria: String,
    descripcion: String,
    marca: String,
    modelo: String,
    nombre: String,
    unidadDeMedida: String,
    stock: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('Item', schema_item);