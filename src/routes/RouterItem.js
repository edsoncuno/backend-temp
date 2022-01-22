const { Router } = require('express');
const { getItems } = require('../controllers/ControllerItem');
const { getItem } = require('../controllers/ControllerItem');
const { postItem } = require('../controllers/ControllerItem');
const { putItem } = require('../controllers/ControllerItem');
const { deleteItem } = require('../controllers/ControllerItem');

const routerItem = Router();

routerItem.get('/', getItems);
routerItem.get('/:id', getItem);
routerItem.post('/', postItem);
routerItem.put('/:id', putItem);
routerItem.delete('/:id', deleteItem);

module.exports = routerItem;