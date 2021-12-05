import { Router } from 'express';
import { getItems, getItem, postItem, putItem, deleteItem } from '../controllers/ControllerItem';

const routerItem = Router();

routerItem.get('/', getItems);
routerItem.get('/:id', getItem);
routerItem.post('/', postItem);
routerItem.put('/:id', putItem);
routerItem.delete('/:id', deleteItem);

export default routerItem;