const mongoose = require('mongoose');

const schema_proveedor = new mongoose.Schema({
    nombre: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Proveedor', schema_proveedor);