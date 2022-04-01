const validatePrecioDeVentaObligatorio = async (req, res, next) => {
    if (!req.body.precioDeVenta) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El precio de venta es necesario' });
    } else {
        next();
    }
}

module.exports = validatePrecioDeVentaObligatorio;