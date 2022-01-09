import { Router } from 'express';
import { putStock } from '../controllers/ControllerStock';

const routerStock = Router();

routerStock.put('/:id', putStock);

export default routerStock;