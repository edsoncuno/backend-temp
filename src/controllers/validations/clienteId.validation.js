const clienteController = require('./../cliente.controller');

const validateClienteId = async (req, res, next) => {
    if (!req.body.clienteId) {
        next();
    } else {
        const existe = await clienteController.existe(req.body.clienteId, null, null);
        if (!existe) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El cliente no existe' });
        } else {
            next();
        }
    }
}

module.exports = validateClienteId;