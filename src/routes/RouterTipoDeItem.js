import { Router } from 'express';
import { postTipoDeItem} from '../controllers/ControllerTipoDeItem';
import { getTiposDeItem } from '../controllers/ControllerTipoDeItem';
import { getTipoDeItem } from '../controllers/ControllerTipoDeItem';
import { deleteTipoDeItem } from '../controllers/ControllerTipoDeItem';

const routerTipoDeItem = Router();

routerTipoDeItem.post('/', postTipoDeItem);
routerTipoDeItem.get('/', getTiposDeItem);
routerTipoDeItem.get('/:id', getTipoDeItem);
routerTipoDeItem.delete('/:id', deleteTipoDeItem);

export default routerTipoDeItem;