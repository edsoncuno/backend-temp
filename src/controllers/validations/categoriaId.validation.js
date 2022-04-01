const categoriaController = require('./../categoria.controller');

const validateCategoriaId = async (req, res, next) => {
    if (!req.body.categoriaId) {
        next();
    } else {
        const categoriaId = req.body.categoriaId;
        const existe = await categoriaController.existe(categoriaId, null);
        if (!existe) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'La categoria no existe' });
        } else {
            next();
        }
    }
}

module.exports = validateCategoriaId;