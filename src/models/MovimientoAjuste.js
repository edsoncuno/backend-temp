const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    movimientoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movimiento' },
}, {
    versionKey: false
});

module.exports = mongoose.model('MovimientoAjuste', schema);