const { Router } = require('express');

const movimientoEntradaController = require('./../controllers/movimientoEntrada.controller');

const validateItemIdObligatorio = require('./../controllers/validations/itemIdObligatorio.validate');
const validateItemId = require('./../controllers/validations/itemId.validation');
const validateCantidadObligatorio = require('./../controllers/validations/cantidadObligatorio.validation');
const validateCantidad = require('./../controllers/validations/cantidad.validation');
const validateFechaObligatorio = require('./../controllers/validations/fechaObligatorio.validation');
const validateFecha = require('./../controllers/validations/fecha.validation');
const validateProveedorIdObligatorio = require('./../controllers/validations/proveedorIdObligatorio.validate');
const validateProveedorId = require('./../controllers/validations/proveedorId.validation');
const validatePrecioDeCompraObligatorio = require('./../controllers/validations/precioDeCompraObligatorio.validation');
const validatePrecioDeCompra = require('./../controllers/validations/precioDeCompra.validation');

const movimientoEntradaRouter = Router();

movimientoEntradaRouter.get('/', async (req, res) => {
    const query = req.query;
    const data = await movimientoEntradaController.listar(query);
    res.status(200);
    res.json(data);
});

movimientoEntradaRouter.post('/',
    validateItemIdObligatorio,
    validateItemId,
    validateCantidadObligatorio,
    validateCantidad,
    validateFechaObligatorio,
    validateFecha,
    validateProveedorIdObligatorio,
    validateProveedorId,
    validatePrecioDeCompraObligatorio,
    validatePrecioDeCompra,
    async (req, res, next) => {
        try {
            let movimientoEntrada = {};
            movimientoEntrada.itemId = req.body.itemId;
            movimientoEntrada.cantidad = req.body.cantidad;
            movimientoEntrada.descripcion = req.body.descripcion;
            movimientoEntrada.fecha = req.body.fecha;
            movimientoEntrada.proveedorId = req.body.proveedorId;
            movimientoEntrada.precioDeCompra = req.body.precioDeCompra;
            const data = await movimientoEntradaController.crear(movimientoEntrada);
            res.status(200);
            res.json(data);
        } catch (error) {
            next(error);
        }
    });

module.exports = movimientoEntradaRouter;