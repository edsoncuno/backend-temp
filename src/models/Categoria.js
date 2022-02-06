const mongoose = require('mongoose');

const schema_categoria = new mongoose.Schema({
    nombre: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Categoria', schema_categoria);