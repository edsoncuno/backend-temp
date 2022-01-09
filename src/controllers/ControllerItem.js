import Item from '../models/Item';

export const getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ nombre: 1 });
        res.json(items);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

export const getItem = async (req, res) => {
    try {
        const item = await Item.findById({ _id: req.params.id });
        res.json(item);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

export const postItem = async (req, res) => {
    try {
        // recivo los datos con los campos obligatorios
        // nombre
        // tipo
        // unidad_de_medida
        const item = req.body;
        // valido el nombre no sea usado
        const existe = await Item.findOne({ nombre: item.nombre }).exec();
        if (existe) {
            const error = new Error('Existe un item con el mismo nombre');
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
            item.stock = { cantidad: 0 }
        }
        // ahora guardo el item
        const newItem = new Item(item);
        await newItem.save();
        res.json({ error: false, name: 'Exito', message: 'Se guardo el item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

export const putItem = async (req, res) => {
    try {
        const existeItemConElMismoNombre = await Item.findOne({ nombre: req.body.nombre });
        if (existeItemConElMismoNombre && req.params.id != existeItemConElMismoNombre._id) {
            const error = new Error('Existe un item con el mismo nombre');
            error.name = 'El item ya existe';
            throw error;
        }
        await Item.findByIdAndUpdate(req.params.id, req.body);
        res.json({ error: false, name: 'Exito', message: 'Se actualizo el item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

export const deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete({ _id: req.params.id });
        res.json({ error: false, name: 'Exito', message: 'Se elimino el item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}