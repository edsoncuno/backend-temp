const mongoose = require('mongoose');

const schema_movimiento = new mongoose.Schema({
    item_id: String,
    categoria: String,
    nombre: String,
    unidadDeMedida: String,
    //
    tipo: String,
    cantidad: Number,
    descripcion: String,
    precioDeCompraPorUnidad: Number,
    proveedor: String,
    //
    fecha: Date,
    stock: Number,
    precioDeCompraTotal: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('Movimiento', schema_movimiento);