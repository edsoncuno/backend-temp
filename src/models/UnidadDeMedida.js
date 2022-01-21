import mongoose from 'mongoose';

const schema_unidad_de_medida = new mongoose.Schema({
    nombre: String
}, {
    versionKey: false
});

export default mongoose.model('UnidadDeMedida', schema_unidad_de_medida);