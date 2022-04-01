const Movimiento = require('../models/Movimiento')
const MovimientoAjuste = require('../models/MovimientoAjuste')
const itemController = require('./item.controller');

const movimientoAjusteController = {};

movimientoAjusteController.crear = async (movimientoAjuste) => {
    /**
     * crear movimiento
     * 
     * itemId, es obligatorio, debe existir
     * nuevoStock, es obligatorio, debe ser un numero entero mayor o igual a 0
     * fecha, -- se calcula
     * stock, -- se lee
     */
    let movimiento = {};
    movimiento.itemId = movimientoAjuste.itemId;
    movimiento.nuevoStock = Number(movimientoAjuste.nuevoStock);
    movimiento.fecha = new Date();
    const item = await itemController.leer(movimiento.itemId);
    movimiento.stock = item.stock;
    const newMovimiento = new Movimiento(movimiento);
    const dataMovimiento = await newMovimiento.save();
    /**
     * actualizar stock en item
     */
    await itemController.actualizar(movimientoAjuste.itemId, { stock: Number(movimientoAjuste.nuevoStock) });
    /**
     * crear movimiento ajuste
     * 
     * movimientoId, -- se lee
     */
    movimientoAjuste = {};
    movimientoAjuste.movimientoId = dataMovimiento._id;
    const newMovimientoAjuste = new MovimientoAjuste(movimientoAjuste);
    const dataMovimientoAjuste = await newMovimientoAjuste.save();
    return dataMovimientoAjuste;
}

movimientoAjusteController.listar = async (query) => {
    if (JSON.stringify(query) == '{}') {
        const data = await MovimientoAjuste.find({})
            .populate({ path: 'movimientoId', populate: { path: 'itemId' } });
        return data;
    }
    else if (query.itemId) {
        const data = await MovimientoAjuste.find({})
            .populate({ path: 'movimientoId', populate: { path: 'itemId' }, itemId: query.itemId });
        return data;
    } else {
        return [];
    }
}

module.exports = movimientoAjusteController;