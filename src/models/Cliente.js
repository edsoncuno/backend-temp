const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    ruc: String,
    dni: String,
    nombre: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Cliente', schema);