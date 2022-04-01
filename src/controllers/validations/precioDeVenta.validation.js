const validatePrecioDeVenta = async (req, res, next) => {
    if (!req.body.precioDeVenta) {
        next();
    } else {
        const precioDeVenta = req.body.precioDeVenta;
        if (isNaN(precioDeVenta) || Number(precioDeVenta) < 0) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El precio de venta debe ser un numero mayor o igual a 0' });
        } else {
            req.body.precioDeVenta = Number(req.body.precioDeVenta);
            next();
        }
    }
}
module.exports = validatePrecioDeVenta;