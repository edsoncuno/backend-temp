const { Router } = require('express');

const movimientoController = require('../controllers/movimiento.controller');

const movimientoRouter = Router();

movimientoRouter.get('/', async (req, res, next) => {
    try {
        const query = req.query;
        const data = await movimientoController.listar(query);
        res.status(200);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = movimientoRouter;