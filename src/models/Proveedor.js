import mongoose from 'mongoose';

const schema_proveedor = new mongoose.Schema({
    nombre: String
}, {
    versionKey: false
});

export default mongoose.model('Proveedor', schema_proveedor);