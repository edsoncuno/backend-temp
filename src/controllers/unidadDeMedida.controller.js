const UnidadDeMedida = require('./../models/UnidadDeMedida');

const findByNombre = async (nombre) => {
    try {
        if (nombre == '') {
            return null;
        } else {
            const data = await UnidadDeMedida.findOne({ nombre: nombre });
            return data;
        }
    } catch (error) {
        return null;
    }
}

const findById = async (id) => {
    try {
        if (id == '') {
            return null;
        } else {
            const data = await UnidadDeMedida.findById(id);
            return data;
        }
    } catch (error) {
        return null;
    }
}

const unidadDeMedidaController = {};

unidadDeMedidaController.crear = async (unidadDeMedida) => {
    //save retorna el docuemnto que acaba de crear
    const newUnidadDeMedida = new UnidadDeMedida(unidadDeMedida);
    const data = await newUnidadDeMedida.save();
    return data;

}

unidadDeMedidaController.listar = async () => {
    const data = await UnidadDeMedida.find().sort({ nombre: 1 });
    return data;
}

unidadDeMedidaController.leer = async (id) => {
    // leer retorna el documento si existe
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await UnidadDeMedida.findById(id);
        return data;
    } catch (error) {
        return null;
    }
}

unidadDeMedidaController.eliminar = async (id) => {
    // eliminar retorna el documento que se encontro y elimino
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await UnidadDeMedida.findByIdAndDelete(id);
        return data;
    } catch (error) {
        return null;
    }
}

unidadDeMedidaController.actualizar = async (id, unidadDeMedida) => {
    // actualizar retorna el documento que se encontro antes de actualizar
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await UnidadDeMedida.findByIdAndUpdate(id, unidadDeMedida);
        return data;
    } catch (error) {
        return null;
    }
}

unidadDeMedidaController.existe = async (id, nombre) => {
    if (id) {
        const data = await findById(id);
        if (data) {
            return true;
        } else {
            return false;
        }
    } else {
        const data = await findByNombre(nombre);
        if (data !== null) {
            return true;
        } else {
            return false;
        }
    }
}

unidadDeMedidaController.existeOtro = async (id, nombre) => {
    const existe = findByNombre(nombre);
    if (existe && existe._id == id) {
        return true;
    } else {
        return false;
    }
}

module.exports = unidadDeMedidaController;