const {Schema, model} = require('mongoose');
const herramientaSchema = new Schema({
    nombre: String,
    marca: String,
    modelo: String,
    descripcion: String,
    unidad_de_medida: String
});
module.exports = model('Herramienta', herramientaSchema);