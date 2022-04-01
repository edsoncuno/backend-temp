const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    movimientoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movimiento' },
    proveedorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },
    precioDeCompra: Number,
    precioDeCompraTotal: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('MovimientoEntrada', schema);