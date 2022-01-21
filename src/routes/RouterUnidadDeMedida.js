import { Router } from 'express';
import { postUnidadDeMedida} from '../controllers/ControllerUnidadDeMedida';
import { getUnidadesDeMedida } from '../controllers/ControllerUnidadDeMedida';
import { getUnidadDeMedida } from '../controllers/ControllerUnidadDeMedida';
import { deleteUnidadDeMedida } from '../controllers/ControllerUnidadDeMedida';

const routerUnidadDeMedida = Router();

routerUnidadDeMedida.post('/', postUnidadDeMedida);
routerUnidadDeMedida.get('/', getUnidadesDeMedida);
routerUnidadDeMedida.get('/:id', getUnidadDeMedida);
routerUnidadDeMedida.delete('/:id', deleteUnidadDeMedida);

export default routerUnidadDeMedida;