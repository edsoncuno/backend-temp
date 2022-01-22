const UnidadDeMedida = require('../models/UnidadDeMedida');

const controllerUnidadesDeMedida = {};

controllerUnidadesDeMedida.getUnidadesDeMedida = async (req, res) => {
    try {
        const unidadesDeMedida = await UnidadDeMedida.find().sort({ nombre: 1 });
        res.json(unidadesDeMedida);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerUnidadesDeMedida.getUnidadDeMedida = async (req, res) => {
    try {
        const unidadDeMedida = await UnidadDeMedida.findById({ _id: req.params.id });
        res.json(unidadDeMedida);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerUnidadesDeMedida.postUnidadDeMedida = async (req, res) => {
    try {
        // recivo los datos con los campos obligatorios
        // nombre
        // valido el nombre no sea usado
        const existe = await UnidadDeMedida.findOne({ nombre: req.body.nombre });
        if (existe) {
            const error = new Error('Existe una unidad de medida con el mismo nombre');
            error.name = 'La unidad de medida ya existe';
            throw error;
        }
        // ahora guardo la unidad de medida
        const newUnidadDeMedida = new UnidadDeMedida(req.body);
        await newUnidadDeMedida.save();
        res.json({ error: false, name: 'Exito', message: 'Se guardo la unidad de medida' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

controllerUnidadesDeMedida.deleteUnidadDeMedida = async (req, res) => {
    try {
        await UnidadDeMedida.findByIdAndDelete({ _id: req.params.id });
        res.json({ error: false, name: 'Exito', message: 'Se elimino la unidad de medida' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message })
    }
}

module.exports = controllerUnidadesDeMedida;