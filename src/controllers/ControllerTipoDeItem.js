import TipoDeItem from '../models/TipoDeItem';

export const getTiposDeItem = async (req, res) => {
    try {
        const tiposDeItem = await TipoDeItem.find().sort({ nombre: 1 });
        res.json(tiposDeItem);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

export const getTipoDeItem = async (req, res) => {
    try {
        const tipoDeItem = await TipoDeItem.findById({ _id: req.params.id });
        res.json(tipoDeItem);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

export const postTipoDeItem = async (req, res) => {
    try {
        // recivo los datos con los campos obligatorios
        // nombre
        // valido el nombre no sea usado
        const existe = await TipoDeItem.findOne({ nombre: req.body.nombre });
        if (existe) {
            const error = new Error('Existe tipo de item con el mismo nombre');
            error.name = 'El tipo de item ya existe';
            throw error;
        }
        // ahora guardo el tipo de item
        const newTipoDeItem = new TipoDeItem(req.body);
        await newTipoDeItem.save();
        res.json({ error: false, name: 'Exito', message: 'Se guardo el tipo de item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

export const deleteTipoDeItem = async (req, res) => {
    try {
        await TipoDeItem.findByIdAndDelete({ _id: req.params.id });
        res.json({ error: false, name: 'Exito', message: 'Se elimino tipo de item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}