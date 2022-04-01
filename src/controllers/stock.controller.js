const Item = require('./../models/Item');
const movimientoController = require('./movimiento.controller')

const stockController = {};

stockController.actualizar = async (id, item) => {
    try {
        const data = await Item.findByIdAndUpdate(id, item);
        let movimiento = {};
        movimiento.itemId = id;
        movimiento.nuevoStock = item.stock;
        await movimientoController.crear(movimiento);
        return data;
    } catch (error) {
        return null;
    }
}

module.exports = stockController;