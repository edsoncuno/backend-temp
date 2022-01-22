const Proveedor = require('../models/Proveedor');

const controllerProveedor = {};

controllerProveedor.getProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find().sort({ nombre: 1 });
        res.json(proveedores);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerProveedor.getProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById({ _id: req.params.id });
        res.json(proveedor);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerProveedor.postProveedor = async (req, res) => {
    try {
        // recivo los datos con los campos obligatorios
        // nombre
        // valido el nombre no sea usado
        const existe = await Proveedor.findOne({ nombre: req.body.nombre });
        if (existe) {
            const error = new Error('Existe un proveedor con el mismo nombre');
            error.name = 'El proveedor ya existe';
            throw error;
        }
        // ahora guardo
        const newProveedor = new Proveedor(req.body);
        await newProveedor.save();
        res.json({ error: false, name: 'Exito', message: 'Se guardo el proveedor' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerProveedor.deleteProveedor = async (req, res) => {
    try {
        await Proveedor.findByIdAndDelete({ _id: req.params.id });
        res.json({ error: false, name: 'Exito', message: 'Se elimino el proveedor' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerProveedor.putProveedor = async (req, res) => {
    try {
        const existe = await Proveedor.findOne({ nombre: req.body.nombre });
        if (existe && !esElMismo(req.params.id, existe._id)) {
            const error = new Error('Existe un proveedor con el mismo nombre');
            error.name = 'El proveedor ya existe';
            throw error;
        }
        await Proveedor.findByIdAndUpdate(req.params.id, req.body);
        res.json({ error: false, name: 'Exito', message: 'Se edito los datos del proveedor' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

const esElMismo = (idProveedor1, idProveedor2) => {
    return idProveedor1 == idProveedor2;
}

module.exports = controllerProveedor;