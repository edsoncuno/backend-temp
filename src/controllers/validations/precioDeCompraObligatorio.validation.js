const validatePrecioDeCompraObligatorio = async (req, res, next) => {
    if (!req.body.precioDeCompra) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El precio de compra es necesario' });
    } else {
        next();
    }
}

module.exports = validatePrecioDeCompraObligatorio;