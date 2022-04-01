const { Router } = require('express');

const movimientoSalidaController = require('./../controllers/movimientoSalida.controller');

const validateItemIdObligatorio = require('./../controllers/validations/itemIdObligatorio.validate');
const validateItemId = require('./../controllers/validations/itemId.validation');
const validateCantidadObligatorio = require('./../controllers/validations/cantidadObligatorio.validation');
const validateCantidad = require('./../controllers/validations/cantidad.validation');
const validateCantidadSalida = require('./../controllers/validations/cantidadSalida.validation');
const validateFechaObligatorio = require('./../controllers/validations/fechaObligatorio.validation');
const validateFecha = require('./../controllers/validations/fecha.validation');
const validateClienteIdObligatorio = require('./../controllers/validations/clienteIdObligatorio.validation');
const validateClienteId = require('./../controllers/validations/clienteId.validation');
const validatePrecioDeVentaObligatorio = require('./../controllers/validations/precioDeVentaObligatorio.validation');
const validatePrecioDeVenta = require('./../controllers/validations/precioDeVenta.validation');

const movimientoSalidaRouter = Router();

movimientoSalidaRouter.get('/', async (req, res) => {
    const query = req.query;
    const data = await movimientoSalidaController.listar(query);
    res.status(200);
    res.json(data);
});

movimientoSalidaRouter.post('/',
    validateItemIdObligatorio,
    validateItemId,
    validateCantidadObligatorio,
    validateCantidad,
    validateCantidadSalida,
    validateFechaObligatorio,
    validateFecha,
    validateClienteIdObligatorio,
    validateClienteId,
    validatePrecioDeVentaObligatorio,
    validatePrecioDeVenta,
    async (req, res, next) => {
        try {
            let movimientoSalida = {};
            movimientoSalida.itemId = req.body.itemId;
            movimientoSalida.cantidad = req.body.cantidad;
            movimientoSalida.descripcion = req.body.descripcion;
            movimientoSalida.fecha = req.body.fecha;
            movimientoSalida.clienteId = req.body.clienteId;
            movimientoSalida.precioDeVenta = req.body.precioDeVenta;
            const data = await movimientoSalidaController.crear(movimientoSalida);
            res.status(200);
            res.json(data);
        } catch (error) {
            next(error);
        }
    });

module.exports = movimientoSalidaRouter;