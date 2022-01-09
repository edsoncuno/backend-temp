import { Router } from 'express';
import { postMovimiento } from '../controllers/ControllerMovimiento';
import { getMovimientos } from '../controllers/ControllerMovimiento';
import { getMovimiento } from '../controllers/ControllerMovimiento';
import { putMovimiento } from '../controllers/ControllerMovimiento';

const routerMovimiento = Router();

routerMovimiento.get('/', getMovimientos);
routerMovimiento.get('/:id', getMovimiento);
routerMovimiento.post('/', postMovimiento);
routerMovimiento.put('/:id', putMovimiento);

export default routerMovimiento;