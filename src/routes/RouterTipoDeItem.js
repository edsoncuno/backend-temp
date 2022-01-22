const { Router } = require('express');
const { postTipoDeItem } = require('../controllers/ControllerTipoDeItem');
const { getTiposDeItem } = require('../controllers/ControllerTipoDeItem');
const { getTipoDeItem } = require('../controllers/ControllerTipoDeItem');
const { deleteTipoDeItem } = require('../controllers/ControllerTipoDeItem');

const routerTipoDeItem = Router();

routerTipoDeItem.post('/', postTipoDeItem);
routerTipoDeItem.get('/', getTiposDeItem);
routerTipoDeItem.get('/:id', getTipoDeItem);
routerTipoDeItem.delete('/:id', deleteTipoDeItem);

module.exports = routerTipoDeItem;