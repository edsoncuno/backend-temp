const validateProveedorIdObligatorio = async (req, res, next) => {
    if (!req.body.proveedorId) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El proveedor es necesario' });
    } else {
        next();
    }
}

module.exports = validateProveedorIdObligatorio;