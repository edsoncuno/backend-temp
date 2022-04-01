const validateRucObligatorio = async (req, res, next) => {
    if (!req.body.ruc) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El RUC es necesario' });
    } else {
        next();
    }
}

module.exports = validateRucObligatorio;