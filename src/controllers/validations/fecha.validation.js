const validateFecha = async (req, res, next) => {
    if (!req.body.fecha) {
        next();
    } else {
        let fecha;
        try {
            fecha = new Date(req.body.fecha);
            const today = new Date();
            if (fecha > today) {
                res.status(300);
                res.json({ severity: 'info', summary: '', detail: 'La fecha no puede ser despues de ahora' });
            } else {
                req.body.fecha = fecha;
                next();
            }
        } catch (error) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'La fecha no es valida' });
        }
    }
}

module.exports = validateFecha;