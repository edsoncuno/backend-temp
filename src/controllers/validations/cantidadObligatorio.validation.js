const validateCantidadObligatorio = async (req, res, next) => {
    if (!req.body.cantidad) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'La cantidad es necesaria' });
    } else {
        next();
    }
}

module.exports = validateCantidadObligatorio;