const mongoose = require('mongoose');

const schema_tipo_de_item = new mongoose.Schema({
    nombre: String
}, {
    versionKey: false
});

module.exports = mongoose.model('TipoDeItem', schema_tipo_de_item);