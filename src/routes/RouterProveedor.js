import { Router } from 'express';
import { postProveedor } from '../controllers/ControllerProveedor';
import { getProveedores } from '../controllers/ControllerProveedor';
import { getProveedor } from '../controllers/ControllerProveedor';
import { deleteProveedor } from '../controllers/ControllerProveedor';
import { putProveedor } from '../controllers/ControllerProveedor';

const routerProveedor = Router();

routerProveedor.post('/', postProveedor);
routerProveedor.get('/', getProveedores);
routerProveedor.get('/:id', getProveedor);
routerProveedor.delete('/:id', deleteProveedor);
routerProveedor.put('/:id', putProveedor);

export default routerProveedor;