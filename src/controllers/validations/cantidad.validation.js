const validateCantidad = async (req, res, next) => {
    if (!req.body.cantidad) {
        next();
    } else {
        let cantidad = req.body.cantidad;
        cantidad = cantidad.replace(/\s/igm, '')
        if (isNaN(cantidad) || Number(cantidad) < 0) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'La cantidad debe ser un numero entero mayor a 0' });
        } else {
            req.body.cantidad = Number(cantidad);
            next();
        }
    }
}

module.exports = validateCantidad;