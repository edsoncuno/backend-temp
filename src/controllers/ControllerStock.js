const Item = require('../models/Item');
const Movimiento = require('../models/Movimiento');

const controllerStock = {};

controllerStock.putStock = async (req, res) => {
    try {
        // recivo los datos
        // datos obligatorios
        // stock
        const stock = req.body.stock
        if (isNaN(stock)) {
            const error = new Error('El stock debe ser un numero no negativo');
            error.name = 'Stock no valido';
            throw error;
        }
        if (stock < 0) {
            const error = new Error('El stock no puede ser negativo');
            error.name = 'Stock no valido';
            throw error;
        }
        // actualizar item
        await Item.findByIdAndUpdate(req.params.id, { stock: stock });
        // generando datos para el movimiento
        const item = await Item.findById(req.params.id);
        const movimiento = {};
        //
        movimiento.item_id = item._id;
        movimiento.categoria = item.categoria;
        movimiento.nombre = item.nombre;
        movimiento.unidadDeMedida = item.unidadDeMedida;
        movimiento.tipo = 'ajuste';
        movimiento.cantidad = 0;
        movimiento.descripcion = '';
        movimiento.precioDeCompraPorUnidad = 0;
        movimiento.proveedor = '';
        movimiento.fecha = new Date();
        movimiento.stock = stock;
        movimiento.precioDeCompraTotal = 0;
        // generar movimiento
        const newMovimiento = new Movimiento(movimiento);
        await newMovimiento.save();
        // guardar movimiento
        res.status(200).json({ error: false, name: 'Exito', message: 'Se Edito el stock del item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}

module.exports = controllerStock;