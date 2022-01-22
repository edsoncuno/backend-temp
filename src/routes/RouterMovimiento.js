const { Router } = require('express');
const { postMovimiento } = require('../controllers/ControllerMovimiento');
const { getMovimientos } = require('../controllers/ControllerMovimiento');
const { getMovimiento } = require('../controllers/ControllerMovimiento');
const { putMovimiento } = require('../controllers/ControllerMovimiento');

const routerMovimiento = Router();

routerMovimiento.get('/', getMovimientos);
routerMovimiento.get('/:id', getMovimiento);
routerMovimiento.post('/', postMovimiento);
routerMovimiento.put('/:id', putMovimiento);

module.exports = routerMovimiento;