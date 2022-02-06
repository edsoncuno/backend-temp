const Item = require('../models/Item');

const controllerItem = {};

controllerItem.getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ categoria: 1 });
        res.json(items);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerItem.getItem = async (req, res) => {
    try {
        const item = await Item.findById({ _id: req.params.id });
        res.json(item);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerItem.postItem = async (req, res) => {
    try {
        // recivo los datos en req.body
        // valido los datos obligatorios
        // categoria
        // unidad de medida
        // nombre
        const item = req.body;
        // valido categoria
        // que exista y que no sea null
        if (!item.categoria || item.categoria === null) {
            const error = new Error('Seleccione una categoria');
            error.name = 'La categoria es necesaria';
            throw error;
        }
        // valido unidad de medida
        // que exista y que no sea null
        if (!item.unidadDeMedida || item.unidadDeMedida === null) {
            const error = new Error('Seleccione una unidad de medida');
            error.name = 'La unidad de medida es necesaria';
            throw error;
        }
        // valido el nombre
        // exista y que no este vacio
        if (!item.nombre || item.nombre === '') {
            const error = new Error('EL nombre del item no puede estar vacio');
            error.name = 'El nombre es necesario';
            throw error;
        }
        // valido de la existencia del item
        const existe = await Item.findOne({ categoria: item.categoria, nombre: item.nombre });
        if (existe) {
            const error = new Error('Existe un item con el mismo nombre y la misma categoria');
            error.name = 'El item ya existe';
            throw error;
        }
        // defino los datos opcionales que podrian no existir
        if (!item.marca) {
            item.marca = '';
        }
        if (!item.modelo) {
            item.modelo = '';
        }
        if (!item.descripcion) {
            item.descripcion = '';
        }
        if (!item.stock) {
            item.stock = 0;
        }
        // ahora guardo el item
        const newItem = new Item(item);
        await newItem.save();
        res.json({ error: false, name: 'Exito', message: 'Se guardo el item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerItem.putItem = async (req, res) => {
    try {
        const item = req.body;
        // empiezo a validar los datos obligatorios
        // valido categoria
        // que exista y que no sea null
        if (!item.categoria || item.categoria === null) {
            const error = new Error('Seleccione una categoria');
            error.name = 'La categoria es necesaria';
            throw error;
        }
        // valido unidad de medida
        // que exista y que no sea null
        if (!item.unidadDeMedida || item.unidadDeMedida === null) {
            const error = new Error('Seleccione una unidad de medida');
            error.name = 'La unidad de medida es necesaria';
            throw error;
        }
        // valido el nombre
        // exista y que no este vacio
        if (!item.nombre || item.nombre === '') {
            const error = new Error('EL nombre del item no puede estar vacio');
            error.name = 'El nombre es necesario';
            throw error;
        }
        const existe = await Item.findOne({ categoria: item.categoria, nombre: item.nombre });
        if (existe && req.params.id != existe._id) {
            const error = new Error('Existe un item con el mismo nombre y la misma categoria');
            error.name = 'El item ya existe';
            throw error;
        }
        await Item.findByIdAndUpdate(req.params.id, req.body);
        res.json({ error: false, name: 'Exito', message: 'Se actualizo el item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerItem.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete({ _id: req.params.id });
        res.json({ error: false, name: 'Exito', message: 'Se elimino el item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

module.exports = controllerItem;