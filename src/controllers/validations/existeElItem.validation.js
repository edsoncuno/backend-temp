const itemController = require('./../item.controller');

const validateExisteElItem = async (req, res, next) => {
    const existe = await itemController.existe(null, req.body.nombre, req.body.categoriaId);
    if (existe) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El item ingresado ya existe' });
    } else {
        next();
    }
}

module.exports = validateExisteElItem;