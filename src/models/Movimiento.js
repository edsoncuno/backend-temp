const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    cantidad: Number,
    descripcion: String,
    fecha: Date,
    nuevoStock: Number,
    stock: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('Movimiento', schema);