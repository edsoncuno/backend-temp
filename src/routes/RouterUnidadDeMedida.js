const { Router } = require('express');
const { postUnidadDeMedida } = require('../controllers/ControllerUnidadDeMedida');
const { getUnidadesDeMedida } = require('../controllers/ControllerUnidadDeMedida');
const { getUnidadDeMedida } = require('../controllers/ControllerUnidadDeMedida');
const { deleteUnidadDeMedida } = require('../controllers/ControllerUnidadDeMedida');

const routerUnidadDeMedida = Router();

routerUnidadDeMedida.post('/', postUnidadDeMedida);
routerUnidadDeMedida.get('/', getUnidadesDeMedida);
routerUnidadDeMedida.get('/:id', getUnidadDeMedida);
routerUnidadDeMedida.delete('/:id', deleteUnidadDeMedida);

module.exports = routerUnidadDeMedida;