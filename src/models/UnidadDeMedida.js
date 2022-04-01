const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nombre: String
}, {
    versionKey: false
});

module.exports = mongoose.model('UnidadDeMedida', schema);