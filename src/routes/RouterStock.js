const { Router } = require('express');
const { putStock } = require('../controllers/ControllerStock');

const routerStock = Router();

routerStock.put('/:id', putStock);

module.exports = routerStock;