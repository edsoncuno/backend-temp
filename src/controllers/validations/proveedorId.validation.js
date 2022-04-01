const proveedorController = require('./../proveedor.controller');

const validateProveedorId = async (req, res, next) => {
    if (!req.body.proveedorId) {
        next();
    } else {
        const existe = await proveedorController.existe(req.body.proveedorId, null);
        if (!existe) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El proveedor no existe' });
        } else {
            next();
        }
    }
}

module.exports = validateProveedorId;