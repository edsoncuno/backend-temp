const validatePrecioDeCompra = async (req, res, next) => {
    if (!req.body.precioDeCompra) {
        next();
    } else {
        const precioDeCompra = req.body.precioDeCompra;
        if (isNaN(precioDeCompra) || Number(precioDeCompra) < 0) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El precio de comnpra debe ser un numero mayor o igual a 0' });
        } else {
            req.body.precioDeCompra = Number(req.body.precioDeCompra);
            next();
        }
    }
}
module.exports = validatePrecioDeCompra;