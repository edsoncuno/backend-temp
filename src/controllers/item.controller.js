const Item = require('./../models/Item');

const findById = async (id) => {
    try {
        const data = await Item.findById(id);
        return data;
    } catch (error) {
        return null;
    }
}

const findByNombreAndCategoria = async (nombre, categoriaId) => {
    try {
        const data = await Item.findOne({ nombre: nombre, categoriaId: categoriaId });
        return data;
    } catch (error) {
        return null;
    }
}

const itemController = {};

itemController.listar = async () => {
    const data = await Item.find().sort({ nombre: 1 })
        .populate('unidadDeMedidaId', { _id: 0, nombre: 1 })
        .populate('categoriaId', { _id: 0, nombre: 1 });
    return data;
}

itemController.crear = async (item) => {
    //save retorna el documento que acaba de crear
    //
    // datos
    //
    // categoriaId, opcional, debe existir el id
    // unidadDeMedidaId, obligatorio, debe existir el id
    // descripcion, opcional, sin validaciones
    // marca, opcional, sin validaciones
    // modelo, opcional, sin validaciones
    // nombre, obligatorio, sin validaciones
    // stock, no se ingresa, calculo
    //
    // si un campo esta vacion llega hasta aqui como undefined
    item.stock = 0;
    //console.log(item);
    const newItem = new Item(item);
    const data = await newItem.save();
    return data;
}

itemController.leer = async (id) => {
    try {
        const data = await Item.findById(id);
        return data;
    } catch (error) {
        return null;
    }
}

itemController.eliminar = async (id) => {
    try {
        const data = await Item.findByIdAndDelete(id);
        return data;
    } catch (error) {
        return null;
    }
}

itemController.actualizar = async (id, item) => {
    try {
        const data = await Item.findByIdAndUpdate(id, item);
        return data;
    } catch (error) {
        return null;
    }
}

itemController.existe = async (id, nombre, categoriaId) => {
    if (id) {
        const data = await findById(id);
        return data != null ? true : false;
    } else {
        const data = await findByNombreAndCategoria(nombre, categoriaId);
        return data != null ? true : false;
    }
}

module.exports = itemController;