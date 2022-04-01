const MovimientoEntrada = require('../models/MovimientoEntrada')
const Movimiento = require('../models/Movimiento');
const Item = require('../models/Item')

const movimientoEntradaController = {};

movimientoEntradaController.listar = async (query) => {
    if (JSON.stringify(query) == '{}') {
        const data = await MovimientoEntrada.find({})
            .populate({ path: 'movimientoId', populate: { path: 'itemId' } });
        return data;
    } else if (query.itemId) {
        const data = await MovimientoEntrada.find({})
            .populate({ path: 'movimientoId', populate: { path: 'itemId' } });
        const filtered = data.filter((movimientoEntrada) => {
            return movimientoEntrada.movimientoId.itemId._id == query.itemId;
        });
        return filtered;
    } else if (query.proveedorId) {
        const data = await MovimientoEntrada.find({})
            .populate({ path: 'movimientoId', populate: { path: 'itemId' } });
        const filtered = data.filter((movimientoEntrada) => {
            return movimientoEntrada.proveedorId == query.proveedorId;
        });
        return filtered;
    } else {
        return [];
    }
}

movimientoEntradaController.crear = async (object) => {
    /**
     * Para movimiento:
     * itemId, necesario, debe existir
     * cantidad, necesario,
     * descripcion, opcinal, sin validacion
     * fecha, necesario, debe ser una fecha menor a la de hoy
     * -- nuevoStock, necesario, calculo
     * -- stock, necesario, leer
     */

    /**
     * Para movimientoEntrada:
     * -- movimientoId, necesario, leer lo que se acaba de guardar
     * proveedorId, necesario, debe existir
     * precioDeCompra, necesaria, mayor o igual a 0
     * -- precioDeCompraTotal, necesaria, calculo
     */

    /**
     * crear movimineto
     */

    const item = await Item.findById(object.itemId);

    let movimiento = {};
    movimiento.itemId = object.itemId;
    movimiento.cantidad = object.cantidad;
    movimiento.descripcion = object.descripcion;
    movimiento.fecha = object.fecha;
    movimiento.stock = item.stock;
    movimiento.nuevoStock = movimiento.stock + movimiento.cantidad;
    const newMovimiento = new Movimiento(movimiento);
    const dataMovimiento = await newMovimiento.save();

    await Item.findByIdAndUpdate(dataMovimiento.itemId, { stock: dataMovimiento.nuevoStock });

    let movimientoEntrada = {};
    movimientoEntrada.movimientoId = dataMovimiento._id;
    movimientoEntrada.proveedorId = object.proveedorId;
    movimientoEntrada.precioDeCompra = object.precioDeCompra;
    movimientoEntrada.precioDeCompraTotal = movimientoEntrada.precioDeCompra * dataMovimiento.cantidad;
    const newMovimientoEntrada = new MovimientoEntrada(movimientoEntrada);
    const dataMovimientoEntrada = await newMovimientoEntrada.save();
    return dataMovimientoEntrada;
}

module.exports = movimientoEntradaController;