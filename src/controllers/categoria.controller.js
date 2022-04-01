const Categoria = require('./../models/Categoria');

const findByNombre = async (nombre) => {
    try {
        const data = await Categoria.findOne({ nombre: nombre });
        return data;
    } catch (error) {
        return null;
    }
}

const findById = async (id) => {
    try {
        const data = await Categoria.findById(id);
        return data;
    } catch (error) {
        return null;
    }
}

const categoriaController = {};

categoriaController.crear = async (categoria) => {
    //save retorna el docuemnto que acaba de crear
    const newCategoria = new Categoria(categoria);
    const data = await newCategoria.save();
    return data;

}

categoriaController.listar = async () => {
    const data = await Categoria.find().sort({ nombre: 1 });
    return data;
}

categoriaController.leer = async (id) => {
    // leer retorna el documento si existe
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await Categoria.findById(id);
        return data;
    } catch (error) {
        return null;
    }
}

categoriaController.eliminar = async (id) => {
    // eliminar retorna el documento que se encontro y elimino
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await Categoria.findByIdAndDelete(id);
        return data;
    } catch (error) {
        return null;
    }
}

categoriaController.actualizar = async (id, categoria) => {
    // actualizar retorna el documento que se encontro antes de actualizar
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await Categoria.findByIdAndUpdate(id, categoria);
        return data;
    } catch (error) {
        return null;
    }
}

categoriaController.existe = async (id, nombre) => {
    if (id) {
        const data = await findById(id);
        return data != null ? true : false;
    } else {
        const data = await findByNombre(nombre);
        return data != null ? true : false;
    }
}

categoriaController.existeOtro = async (id, nombre) => {
    const existe = findByNombre(nombre);
    if (existe && existe._id == id) {
        return true;
    } else {
        return false;
    }
}

module.exports = categoriaController;