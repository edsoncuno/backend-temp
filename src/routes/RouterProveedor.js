const { Router } = require('express');
const { postProveedor } = require('../controllers/ControllerProveedor');
const { getProveedores } = require('../controllers/ControllerProveedor');
const { getProveedor } = require('../controllers/ControllerProveedor');
const { deleteProveedor } = require('../controllers/ControllerProveedor');
const { putProveedor } = require('../controllers/ControllerProveedor');

const routerProveedor = Router();

routerProveedor.post('/', postProveedor);
routerProveedor.get('/', getProveedores);
routerProveedor.get('/:id', getProveedor);
routerProveedor.delete('/:id', deleteProveedor);
routerProveedor.put('/:id', putProveedor);

module.exports = routerProveedor;