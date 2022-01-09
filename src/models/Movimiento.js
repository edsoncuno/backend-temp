import mongoose from 'mongoose';

const schema_movimiento = new mongoose.Schema({
    tipo: String,
    item_id: String,
    stock_actual: Number,
    cantidad: Number,
    nombre: String,
    unidad_de_medida: String,
    fecha_de_registro: Date,
    proveedor: String,
    precio_de_compra_por_unidad: Number,
    precio_de_compra_total: Number,
    descripcion: String
}, {
    versionKey: false
});

export default mongoose.model('Movimiento', schema_movimiento);