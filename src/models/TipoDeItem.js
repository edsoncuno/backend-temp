import mongoose from 'mongoose';

const schema_tipo_de_item = new mongoose.Schema({
    nombre: String
}, {
    versionKey: false
});

export default mongoose.model('TipoDeItem', schema_tipo_de_item);