const Cliente = require('./../models/Cliente');

const findById = async (id) => {
    try {
        const data = await Cliente.findById(id);
        return data;
    } catch (error) {
        return null;
    }
}

const findByDni = async (dni) => {
    try {
        if (dni == '') {
            return null;
        } else {
            const cliente = await Cliente.findOne({ dni: dni });
            return cliente;
        }
    } catch (error) {
        return null;
    }
}

const findByRuc = async (ruc) => {
    try {
        if (ruc == '') {
            return null;
        } else {
            const cliente = await Cliente.findOne({ ruc: ruc });
            return cliente;
        }
    } catch (error) {
        return null;
    }
}

const clienteController = {};

clienteController.crear = async (cliente) => {
    const newCliente = new Cliente(cliente);
    const data = await newCliente.save();
    //save retorna el docuemnto que acaba de crear
    return data;
}

clienteController.listar = async (req, res) => {
    const lista = await Cliente.find().sort({ nombre: 1 });
    res.json(lista);
}

clienteController.leer = async (id) => {
    try {
        const cliente = await Cliente.findById(id);
        return cliente;
    } catch (error) {
        return null;
    }
}

clienteController.eliminar = async (id) => {
    const data = await Cliente.findByIdAndDelete(id);
    // data es el documento que encontro y elimino
    // sino lo encuentra retorna null
    return data;
}

clienteController.actualizar = async (id, cliente) => {
    try {
        const data = await Cliente.findByIdAndUpdate(id, cliente);
        return data;
        // data es el documento que encuentra antes de actualizar
        // si no encuentra el document con el id, se genera un error
        // asi que hay que validar la existencia
    } catch (error) {
        return null;
    }
}

clienteController.existe = async (id, dni, ruc) => {
    if (id) {
        const data = await findById(id);
        return (data != null) ? true : false;
    } else {
        const existe1 = await findByDni(dni);
        const existe2 = await findByRuc(ruc);
        return (existe1 != null || existe2 != null) ? true : false;
    }
}

clienteController.existeOtro = async (id, dni, ruc) => {
    const existe1 = await findByDni(dni);
    const existe2 = await findByRuc(ruc);
    if ((existe1 != null && existe1._id != id) || (existe2 != null && existe2._id != id)) {
        return true;
    } else {
        return false;
    }
}

module.exports = clienteController;