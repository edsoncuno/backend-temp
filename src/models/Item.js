const mongoose = require('mongoose');

const schema_item = new mongoose.Schema({
    descripcion: String,
    marca: String,
    modelo: String,
    nombre: { type: String, required: true, unique: true },
    tipo: { type: String, required: true },
    unidad_de_medida: { type: String, required: true },
    stock: {
        cantidad: Number
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Item', schema_item);