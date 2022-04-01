const validateFechaObligatorio = async (req, res, next) => {
    if (!req.body.fecha) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'La fecha es necesaria' });
    } else {
        next();
    }
}

module.exports = validateFechaObligatorio;