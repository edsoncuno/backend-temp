const itemController = require('./../item.controller');

const validateItemId = async (req, res, next) => {
    if (!req.body.itemId) {
        next();
    } else {
        const existe = await itemController.existe(req.body.itemId, null, null);
        if (!existe) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El item no existe' });
        } else {
            next();
        }
    }
}

module.exports = validateItemId;