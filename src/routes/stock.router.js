const { Router } = require('express');

const { actualizar } = require('../controllers/stock.controller');

const validateStock = require('../controllers/validations/stock.validation');

const routerStock = Router();

routerStock.put('/:id',
    validateStock,
    async (req, res, next) => {
        try {
            const id = req.params.id;
            let item = {};
            item.stock = req.body.stock;
            await actualizar(id, item);
            data = { severity: 'success', summary: '', detail: 'Se guardo los cambios del stock exitosamente' };
            res.status(200);
            res.json(data);
        } catch (error) {
            next(error);
        }
    });

module.exports = routerStock;