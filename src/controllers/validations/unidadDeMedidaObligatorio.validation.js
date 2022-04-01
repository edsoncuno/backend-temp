const validateUnidadDeMedidaIdObligatorio = async (req, res, next) => {
    if (!req.body.unidadDeMedidaId) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'La unidad de medida es necesaria' });
    } else {
        next();
    }
}

module.exports = validateUnidadDeMedidaIdObligatorio;