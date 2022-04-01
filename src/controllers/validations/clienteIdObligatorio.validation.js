const validateClienteIdObligatorio = async (req, res, next) => {
    if (!req.body.clienteId) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El clienteId es necesario' });
    } else {
        next();
    }
}

module.exports = validateClienteIdObligatorio;