const Categoria = require('../models/Categoria');

const controllerCategoria = {};

controllerCategoria.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().sort({ nombre: 1 });
        res.json(categorias);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerCategoria.getCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById({ _id: req.params.id });
        res.json(categoria);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerCategoria.postCategoria = async (req, res) => {
    try {
        // recivo los datos con los campos obligatorios
        // nombre
        // valido el nombre no sea usado
        const existe = await Categoria.findOne({ nombre: req.body.nombre });
        if (existe) {
            const error = new Error('Existe una categoria con el mismo nombre');
            error.name = 'La categoria ya existe';
            throw error;
        }
        // ahora guardo el tipo de item
        const newCategoria = new Categoria(req.body);
        await newCategoria.save();
        res.json({ error: false, name: 'Exito', message: 'Se guardo la categoria' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerCategoria.deleteCategoria = async (req, res) => {
    try {
        await Categoria.findByIdAndDelete({ _id: req.params.id });
        res.json({ error: false, name: 'Exito', message: 'Se elimino la categoria' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

module.exports = controllerCategoria;