const { Router } = require('express');
const { crear } = require('../controllers/cliente.controller');
const { listar } = require('../controllers/cliente.controller');
const { leer } = require('../controllers/cliente.controller');
const { eliminar } = require('../controllers/cliente.controller');
const { actualizar } = require('../controllers/cliente.controller');
const { existe } = require('../controllers/cliente.controller');

const validateDni = require('../middlewares/validations/dni.validation.middleware');
const validateRuc = require('../middlewares/validations/ruc.validation.middleware');
const validateNombre = require('../middlewares/validations/nombre.validation.middleware');
const res = require('express/lib/response');

const routerCliente = Router();

routerCliente.post('/', validateNombre, validateRuc, validateDni, async (req, res, next) => {
    try {
        /**
         * dni o ruc debe existir
         */
        let cliente = {};
        if (!req.body.nombre) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El necesario el nombre del cliente' });
            next();
        } else if (!req.body.dni && !req.body.ruc) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'Es necesario el dni o ruc del cliente' });
            next();
        } else if (await existe(req.body.dni, req.body.ruc)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'Ya existe un cliente con el mismo dni o ruc' });
            next();
        } else {
            cliente.nombre = req.body.nombre;
            cliente.dni = req.body.dni;
            cliente.ruc = req.body.ruc;
            await crear(cliente);
            res.status(200);
            res.json({ severity: 'success', summary: '', detail: 'Se guardo los datos del cliente exitosamente' });
        }
    } catch (error) {
        next(error);
    }
});
routerCliente.get('/', listar);
routerCliente.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await leer(id)
        res.status(200);
        res.json(data);
    } catch (error) {
        next(error);
    }
});
routerCliente.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await eliminar(id);
        res.status(200);
        res.json({ severity: 'success', summary: '', detail: 'Se elimino el cliente exitosamente' });
    } catch (error) {
        next(error);
    }
});
routerCliente.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let cliente = {};
        if (req.body.nombre) {
            cliente.nombre = req.body.nombre;
        }
        if (req.body.ruc) {
            cliente.ruc = req.body.ruc;
        }
        if (req.body.dni) {
            cliente.dni = req.body.dni;
        }
        const data = await actualizar(id, cliente);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = routerCliente;