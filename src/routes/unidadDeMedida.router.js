const { Router } = require('express');
const { crear } = require('../controllers/unidadDeMedida.controller');
const { listar } = require('../controllers/unidadDeMedida.controller');
const { leer } = require('../controllers/unidadDeMedida.controller');
const { eliminar } = require('../controllers/unidadDeMedida.controller');
const { actualizar } = require('../controllers/unidadDeMedida.controller');
const { existe } = require('../controllers/unidadDeMedida.controller');
const { existeOtro } = require('../controllers/unidadDeMedida.controller');

const validateNombre = require('../controllers/validations/nombre.validation');

const routerUnidadDeMedida = Router();

routerUnidadDeMedida.post('/', validateNombre, async (req, res, next) => {
    try {
        if (!req.body.nombre) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El necesario el nombre' });
        } else if (await existe(null, req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'Ya existe la unidad de medida' });
        } else {
            let unidadDeMedida = {};
            unidadDeMedida.nombre = req.body.nombre;
            await crear(unidadDeMedida);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se guardo los datos de la unidad de medida exitosamente' });
        }
    } catch (error) {
        next(error)
    }
});

routerUnidadDeMedida.get('/', async (req, res) => {
    const data = await listar();
    res.status(200);
    res.json(data);
});

routerUnidadDeMedida.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await leer(id);
    if (data) {
        res.status(200);
        res.json(data);
    } else {
        res.status(200);
        res.json({});
    }
});

routerUnidadDeMedida.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (await eliminar(id)) {
        res.status(200);
        res.json({ severity: 'success', summary: '', detail: 'Se elimino la unidad de medida exitosamente' });
    } else {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'No existe la unidad de medida' });
    }
});

routerUnidadDeMedida.put('/:id', validateNombre, async (req, res, next) => {
    try {
        if (!req.body.nombre) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El necesario el nombre' });
        } else if (!await existe(req.params.id, req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'No existe la unidad de medida' });
        } else if (await existeOtro(req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'Ya existe la unidad de medida' });
        } else {
            const id = req.params.id;
            let unidadDeMedida = {};
            unidadDeMedida.nombre = req.body.nombre;
            await actualizar(id, unidadDeMedida);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se guardo los cambios de la unidad de medida exitosamente' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = routerUnidadDeMedida;