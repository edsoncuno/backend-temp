const { Router } = require('express');
const { crear } = require('../controllers/proveedor.controller');
const { listar } = require('../controllers/proveedor.controller');
const { leer } = require('../controllers/proveedor.controller');
const { eliminar } = require('../controllers/proveedor.controller');
const { actualizar } = require('../controllers/proveedor.controller');
const { existe } = require('../controllers/proveedor.controller');
const { existeOtro } = require('../controllers/proveedor.controller');

const validateNombre = require('../controllers/validations/nombre.validation');

const routerProveedor = Router();

routerProveedor.post('/', validateNombre, async (req, res, next) => {
    try {
        if (!req.body.nombre) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El necesario el nombre' });
        } else if (await existe(null, req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'Ya existe la categoria' });
        } else {
            let proveedor = {};
            proveedor.nombre = req.body.nombre;
            await crear(proveedor);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se guardo los datos del proveedor exitosamente' });
        }
    } catch (error) {
        next(error)
    }
});

routerProveedor.get('/', async (req, res) => {
    const data = await listar();
    res.status(200);
    res.json(data);
});

routerProveedor.get('/:id', async (req, res) => {
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

routerProveedor.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (await eliminar(id)) {
        res.status(200);
        res.json({ severity: 'success', summary: '', detail: 'Se elimino el proveedor exitosamente' });
    } else {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'No existe el proveedor' });
    }
});

routerProveedor.put('/:id', validateNombre, async (req, res, next) => {
    try {
        if (!req.body.nombre) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El necesario el nombre' });
        } else if (!await existe(req.params.id, req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'No existe el proveedor' });
        } else if (await existeOtro(req.params.id, req.body.nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'Ya existe el prooveedor' });
        } else {
            const id = req.params.id;
            let proveedor = {};
            proveedor.nombre = req.body.nombre;
            await actualizar(id, proveedor);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se guardo los cambios del proveedor exitosamente' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = routerProveedor;