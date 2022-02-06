const { Router } = require('express');
const { postCategoria } = require('../controllers/ControllerCategoria');
const { getCategorias } = require('../controllers/ControllerCategoria');
const { getCategoria } = require('../controllers/ControllerCategoria');
const { deleteCategoria } = require('../controllers/ControllerCategoria');

const routerCategoria = Router();

routerCategoria.post('/', postCategoria);
routerCategoria.get('/', getCategorias);
routerCategoria.get('/:id', getCategoria);
routerCategoria.delete('/:id', deleteCategoria);

module.exports = routerCategoria;