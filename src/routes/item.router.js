const { Router } = require('express');

const { listar } = require('../controllers/item.controller');
const { crear } = require('../controllers/item.controller');
const { leer } = require('../controllers/item.controller');
const { eliminar } = require('../controllers/item.controller');

const validateCategoriaId = require('./../controllers/validations/categoriaId.validation');
const validateUnidadDeMedidaId = require('./../controllers/validations/unidadDeMedidaId.validation');
const validateUnidadDeMedidaIdObligatorio = require('./../controllers/validations/unidadDeMedidaObligatorio.validation');
const validateNombreObligatorio = require('../controllers/validations/nombreObligatorio.validation');

const routerItem = Router();

routerItem.get('/', async (req, res) => {
    const data = await listar();
    res.status(200);
    res.json(data);
});

routerItem.post('/',
    validateCategoriaId,
    validateUnidadDeMedidaId,
    validateUnidadDeMedidaIdObligatorio,
    validateNombreObligatorio,
    async (req, res, next) => {
        try {
            let item = {};
            item.categoriaId = req.body.categoriaId;
            item.unidadDeMedidaId = req.body.unidadDeMedidaId;
            item.descripcion = req.body.descripcion;
            item.marca = req.body.marca;
            item.modelo = req.body.modelo;
            item.nombre = req.body.nombre;
            await crear(item);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se guardo los datos del item exitosamente' });
        } catch (error) {
            next(error);
        }
    });

routerItem.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await leer(id);
        res.status(200);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

routerItem.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await eliminar(id);
        res.status(200);
        res.json({ severity: 'success', summary: '', detail: 'Se elimino el item exitosamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = routerItem;