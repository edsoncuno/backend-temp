const itemController = require('./../item.controller');

const validateCantidadSalida = async (req, res, next) => {
    if (!req.body.cantidad) {
        next();
    } else {
        const item = await itemController.leer(req.body.itemId);
        if (Number(req.body.cantidad) > item.stock) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'La cantidad es mayor a la cantidad que tiene registrado en almacen' });
        } else {
            req.body.cantidad = Number(req.body.cantidad);
            next();
        }
    }
}

module.exports = validateCantidadSalida;