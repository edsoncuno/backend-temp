const validateItemIdObligatorio = async (req, res, next) => {
    if (!req.body.itemId) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El itemId es necesario' });
    } else {
        next();
    }
}

module.exports = validateItemIdObligatorio;