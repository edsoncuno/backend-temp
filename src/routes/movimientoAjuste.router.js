const { Router } = require('express');

const movimientoAjusteController = require('../controllers/movimientoAjuste.controller');

const validateItemId = require('./../controllers/validations/itemId.validation');
const validateStock = require('./../controllers/validations/stock.validation');

const movimientoAjusteRouter = Router();

movimientoAjusteRouter.get('/', async (req, res, next) => {
    try {
        const query = req.query;
        const data = await movimientoAjusteController.listar(query);
        res.status(200);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

movimientoAjusteRouter.post('/',
    validateItemId,
    validateStock, async (req, res, next) => {
        try {
            let movimientoAjuste = {};
            movimientoAjuste.itemId = req.body.itemId;
            movimientoAjuste.nuevoStock = req.body.stock;
            await movimientoAjusteController.crear(movimientoAjuste);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se realizo el ajuste de stock exitosamente' });
        } catch (error) {
            next(error);
        }
    });

module.exports = movimientoAjusteRouter;