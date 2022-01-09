import Movimiento from '../models/Movimiento';
import Item from '../models/Item';

export const getMovimientos = async (req, res) => {
    try {
        const movimientos = await Movimiento.find().sort({ fecha_de_registro: -1 });
        res.json(movimientos);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}

export const getMovimiento = async (req, res) => {
    try {
        const movimiento = await Movimiento.findById({ _id: req.params.id });
        res.json(movimiento);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}

export const postMovimiento = async (req, res) => {
    try {
        // obtener los datos
        // se supoe que he recivido los campos obligatorios
        // tipo
        // item_id
        const movimiento = req.body;
        // ahora defino los campos que podrian no existir
        if (!movimiento.cantidad) {
            movimiento.cantidad = 0;
        }
        if (!movimiento.proveedor) {
            movimiento.proveedor = '';
        }
        if (!movimiento.precio_de_compra_por_unidad) {
            movimiento.precio_de_compra_por_unidad = 0;
        }
        if (!movimiento.descripcion) {
            movimiento.descripcion = '';
        }
        // ahora defino los campos que se deben generar en el backend
        const item = await Item.findById({ _id: movimiento.item_id });
        // definir el stok actual y lanzar error si sale negativo
        if (movimiento.tipo === 'entrada') {
            movimiento.stock_actual = item.stock.cantidad + movimiento.cantidad;
        } else if (movimiento.tipo === 'salida') {
            movimiento.stock_actual = item.stock.cantidad - movimiento.cantidad;
        } else {
            movimiento.stock_actual = item.stock.cantidad;
        }
        if (movimiento.stock_actual < 0) {
            const error = new Error('No existe suficientes items para realizar la salida');
            error.name = 'No hay suficientes items';
            throw error;
        }
        // definir el nombre
        movimiento.nombre = item.nombre;
        // definir unidad de medida
        movimiento.unidad_de_medida = item.unidad_de_medida;
        // definir fecha de registro
        movimiento.fecha_de_registro = new Date();
        // definir precio de compra total
        movimiento.precio_de_compra_total = movimiento.precio_de_compra_por_unidad * movimiento.cantidad;
        // ahora guardo el movimiento
        const newMovimiento = new Movimiento(movimiento);
        await newMovimiento.save();
        // modifico el stock con el stock actual
        await Item.findByIdAndUpdate(movimiento.item_id, { stock: { cantidad: movimiento.stock_actual } });
        res.json({ error: false, name: 'Exito', message: 'Se registro el movimiento' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}

export const putMovimiento = async (req, res) => {
    try {
        await Movimiento.findByIdAndUpdate(req.params.id, req.body);
        res.json({ error: false, name: 'Exito', message: 'Se edito el movimiento' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}