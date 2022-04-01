const unidadDeMedidaController = require('../unidadDeMedida.controller');

const validateUnidadDeMedidaId = async (req, res, next) => {
    if (!req.body.unidadDeMedidaId) {
        next();
    } else {
        const unidadDeMedidaId = req.body.unidadDeMedidaId;
        const existe = await unidadDeMedidaController.existe(unidadDeMedidaId, null);
        if (!existe) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'La unidad de medida no existe' });
        } else {
            next();
        }
    }
}

module.exports = validateUnidadDeMedidaId;