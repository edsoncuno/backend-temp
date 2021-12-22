import mongoose from 'mongoose';

const schema_item = new mongoose.Schema({
    descripcion: String,
    marca: String,
    modelo: String,
    nombre: { type: String, required: true, unique: true },
    tipo: String,
    unidad_de_medida: String
}, {
    versionKey: false
});

export default mongoose.model('Item', schema_item);