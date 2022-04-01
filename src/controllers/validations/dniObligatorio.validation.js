const validateDniObligatorio = async (req, res, next) => {
    if (!req.body.dni) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El numero de dni es necesario' });
    } else {
        next();
    }
}

module.exports = validateDniObligatorio;