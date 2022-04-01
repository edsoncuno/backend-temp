const validateNombreObligatorio = async (req, res, next) => {
    if (!req.body.nombre) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El nombre es necesario' });
    } else {
        next();
    }
}

module.exports = validateNombreObligatorio;