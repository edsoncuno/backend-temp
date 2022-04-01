const Proveedor = require('./../models/Proveedor');

const findByNombre = async (nombre) => {
    try {
        const data = await Proveedor.findOne({ nombre: nombre });
        return data;
    } catch (error) {
        return null;
    }
}

const findById = async (id) => {
    try {
        const data = await Proveedor.findById(id);
        return data;
    } catch (error) {
        return null;
    }
}

const proveedorController = {};

proveedorController.crear = async (proveedor) => {
    //save retorna el docuemnto que acaba de crear
    const newProveedor = new Proveedor(proveedor);
    const data = await newProveedor.save();
    return data;

}

proveedorController.listar = async () => {
    const data = await Proveedor.find().sort({ nombre: 1 });
    return data;
}

proveedorController.leer = async (id) => {
    // leer retorna el documento si existe
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await Proveedor.findById(id);
        return data;
    } catch (error) {
        return null;
    }
}

proveedorController.eliminar = async (id) => {
    // eliminar retorna el documento que se encontro y elimino
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await Proveedor.findByIdAndDelete(id);
        return data;
    } catch (error) {
        return null;
    }
}

proveedorController.actualizar = async (id, proveedor) => {
    // actualizar retorna el documento que se encontro antes de actualizar
    // si no encuentra nada se genera un error
    // hay que validar que exista
    try {
        const data = await Proveedor.findByIdAndUpdate(id, proveedor);
        return data;
    } catch (error) {
        return null;
    }
}

proveedorController.existe = async (id, nombre) => {
    if (id) {
        const data = await findById(id);
        return data != null ? true : false;
    } else {
        const data = await findByNombre(nombre);
        return data != null ? true : false;
    }
}

proveedorController.existeOtro = async (id, nombre) => {
    const existe = await findByNombre(nombre);
    return (existe && existe._id != id) ? true : false;
}

module.exports = proveedorController;