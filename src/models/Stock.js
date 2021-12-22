import { Schema, model } from 'mongoose';

const schema_stock = new Schema({
    id_item: Number,
    cantidad: Number,
    fecha: Date
}, {
    versionKey: false
});

export default model('Stock', schema_stock);