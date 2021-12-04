const { Router } = require('express');
const router = Router();

const controllerHerramienta = require('../controllers/ControllerHerramienta');
router.get('/', controllerHerramienta.getHerramientas);
router.get('/:id', controllerHerramienta.getHerramienta);
router.post('/', controllerHerramienta.postHerramienta);
router.put('/:id', controllerHerramienta.putHerramienta);
router.delete('/:id', controllerHerramienta.deleteHerramienta);

module.exports = router;
