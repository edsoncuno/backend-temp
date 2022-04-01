const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    movimientoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movimiento' },
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    precioDeVenta: Number,
    precioDeVenta: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('MovimientoSalida', schema);