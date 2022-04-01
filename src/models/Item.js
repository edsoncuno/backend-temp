const mongoose = require('mongoose');

const schema_item = new mongoose.Schema({
    categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
    unidadDeMedidaId: { type: mongoose.Schema.Types.ObjectId, ref: 'UnidadDeMedida' },
    descripcion: String,
    marca: String,
    modelo: String,
    nombre: String,
    stock: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('Item', schema_item);