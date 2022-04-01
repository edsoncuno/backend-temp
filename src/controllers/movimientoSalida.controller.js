const MovimientoSalida = require('../models/MovimientoSalida')
const Movimiento = require('../models/Movimiento');
const Item = require('../models/Item')

const movimientoSalidaController = {};

movimientoSalidaController.listar = async (query) => {
    if (JSON.stringify(query) == '{}') {
        const data = await MovimientoSalida.find({})
            .populate({ path: 'movimientoId', populate: { path: 'itemId' } });
        return data;
    } else if (query.itemId) {
        const data = await MovimientoSalida.find({})
            .populate({ path: 'movimientoId', populate: { path: 'itemId' } });
        const filtered = data.filter((movimientoSalida) => {
            return movimientoSalida.movimientoId.itemId._id == query.itemId;
        });
        return filtered;
    } else if (query.clienteId) {
        const data = await MovimientoSalida.find({})
            .populate({ path: 'movimientoId', populate: { path: 'itemId' } });
        const filtered = data.filter((movimientoSalida) => {
            return movimientoSalida.clienteId == query.clienteId;
        });
        return filtered;
    } else {
        return [];
    }
}

movimientoSalidaController.crear = async (object) => {
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
     * Para movimientoSalida:
     * -- movimientoId, necesario, leer lo que se acaba de guardar
     * clienteId, necesario, debe existir
     * precioDeVenta, necesaria, mayor o igual a 0
     * -- precioDeVentaTotal, necesaria, calculo
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
    movimiento.nuevoStock = movimiento.stock - movimiento.cantidad;
    const newMovimiento = new Movimiento(movimiento);
    const dataMovimiento = await newMovimiento.save();

    await Item.findByIdAndUpdate(dataMovimiento.itemId, { stock: dataMovimiento.nuevoStock });

    let movimientoSalida = {};
    movimientoSalida.movimientoId = dataMovimiento._id;
    movimientoSalida.clienteId = object.clienteId;
    movimientoSalida.precioDeVenta = object.precioDeVenta;
    movimientoSalida.precioDeVentaTotal = movimientoSalida.precioDeVenta * dataMovimiento.cantidad;
    const newMovimientoSalida = new MovimientoSalida(movimientoSalida);
    const dataMovimientoSalida = await newMovimientoSalida.save();
    return dataMovimientoSalida;
}
module.exports = movimientoSalidaController;