const { Router } = require('express');
const { crear } = require('../controllers/categoria.controller');
const { listar } = require('../controllers/categoria.controller');
const { leer } = require('../controllers/categoria.controller');
const { eliminar } = require('../controllers/categoria.controller');
const { actualizar } = require('../controllers/categoria.controller');
const { existe } = require('../controllers/categoria.controller');
const { existeOtro } = require('../controllers/categoria.controller');

const validateNombre = require('../controllers/validations/nombre.validation');

const routerCategoria = Router();

routerCategoria.post('/', validateNombre, async (req, res, next) => {
    try {
        if (!req.body.nombre) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El necesario el nombre' });
        } else if (await existe(null, req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'Ya existe la categoria' });
        } else {
            let categoria = {};
            categoria.nombre = req.body.nombre;
            await crear(categoria);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se guardo los datos de la categoria exitosamente' });
        }
    } catch (error) {
        next(error)
    }
});

routerCategoria.get('/', async (req, res) => {
    const data = await listar();
    res.status(200);
    res.json(data);
});

routerCategoria.get('/:id', async (req, res) => {
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

routerCategoria.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (await eliminar(id)) {
        res.status(200);
        res.json({ severity: 'success', summary: '', detail: 'Se elimino la categoria exitosamente' });
    } else {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'No existe la categoria' });
    }
});

routerCategoria.put('/:id', validateNombre, async (req, res, next) => {
    try {
        if (!req.body.nombre) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El necesario el nombre' });
        } else if (!await existe(req.params.id, req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'No existe la categoria' });
        } else if (await existeOtro(req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'Ya existe la categoria' });
        } else {
            const id = req.params.id;
            let categoria = {};
            categoria.nombre = req.body.nombre;
            await actualizar(id, categoria);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se guardo los cambios la categoria exitosamente' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = routerCategoria;