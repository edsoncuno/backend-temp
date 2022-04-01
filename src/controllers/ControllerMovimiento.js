const Movimiento = require('../models/Movimiento');
const Item = require('../models/Item');

const controllerMovimiento = {};

const formatearFecha = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (day <= 9) {
        day = '0' + day;
    }
    if (month <= 9) {
        month = '0' + month;
    }
    return day + '-' + month + '-' + date.getFullYear();
};

controllerMovimiento.getMovimientos = async (req, res) => {
    try {
        let movimientos = await Movimiento.find().sort({ fecha: -1 });
        let newMovimientos = [];
        for (let i = 0; i < movimientos.length; i++) {
            newMovimientos.push({
                _id: movimientos[i]._id,
                item_id: movimientos[i].item_id,
                categoria: movimientos[i].categoria,
                nombre: movimientos[i].nombre,
                unidadDeMedida: movimientos[i].unidadDeMedida,
                tipo: movimientos[i].tipo,
                cantidad: movimientos[i].cantidad,
                descripcion: movimientos[i].descripcion,
                precioDeCompraPorUnidad: movimientos[i].precioDeCompraPorUnidad,
                proveedor: movimientos[i].proveedor,
                fecha: formatearFecha(movimientos[i].fecha),
                stock: movimientos[i].stock,
                precioDeCompraTotal: movimientos[i].precioDeCompraTotal
            });
        }
        res.json(newMovimientos);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}

controllerMovimiento.getMovimiento = async (req, res) => {
    try {
        const movimiento = await Movimiento.findById({ _id: req.params.id });
        res.json(movimiento);
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}

controllerMovimiento.postMovimiento = async (req, res) => {
    try {
        // obtener los datos
        const movimiento = {};
        // item_id
        const item = await Item.findById({ _id: req.body.item_id });
        // agrego los datos desde item
        movimiento.item_id = item._id;
        movimiento.categoria = item.categoria;
        movimiento.nombre = item.nombre;
        movimiento.unidadDeMedida = item.unidadDeMedida;
        // agrego el tipo de movimiento
        movimiento.tipo = req.body.tipo;
        // agrego y valido cantidad
        movimiento.cantidad = Number(req.body.cantidad)
        if (isNaN(movimiento.cantidad)) {
            const error = new Error('La cantidad debe ser un número mayor a 0');
            error.name = 'La cantidad no es valida';
            throw error;
        } else if (movimiento.cantidad <= 0) {
            const error = new Error('La cantidad debe ser mayor a 0');
            error.name = 'La cantidad no es valida';
            throw error;
        }
        // agrego descripcion
        movimiento.descripcion = req.body.descripcion;
        // agrego precioDeCompraPorUnidad y lo valido
        movimiento.precioDeCompraPorUnidad = Number(req.body.precioDeCompraPorUnidad);
        if (isNaN(movimiento.precioDeCompraPorUnidad)) {
            const error = new Error('El precio de compra por unidad debe ser un numero no negativo');
            error.name = 'El precio de compra por unidad no es valida';
            throw error;
        } else if (movimiento.precioDeCompraPorUnidad < 0) {
            const error = new Error('El precio de compra por unidad no puede ser negativo');
            error.name = 'El precio de compra por unidad no es valida';
            throw error;
        }
        // agrego proveedor
        movimiento.proveedor = req.body.proveedor;
        // agrego fecha
        movimiento.fecha = new Date();
        // agrego stock y lo valido
        if (movimiento.tipo === 'entrada') {
            const newStock = item.stock + movimiento.cantidad;
            movimiento.stock = newStock;
        } else if (movimiento.tipo === 'salida') {
            const newStock = item.stock - movimiento.cantidad;
            if (newStock < 0) {
                const error = new Error('No existe suficientes items para realizar la salida');
                error.name = 'No hay suficientes items';
                throw error;
            } else {
                movimiento.stock = newStock;
            }
        }
        // agrego precioDeCompraTotal y lo valido
        movimiento.precioDeCompraTotal = (movimiento.cantidad * movimiento.precioDeCompraPorUnidad).toFixed(2)
        // guardo el movimiento
        const newMovimiento = new Movimiento(movimiento);
        await newMovimiento.save();
        // actualizo stock del item
        await Item.findByIdAndUpdate(movimiento.item_id, { stock: movimiento.stock });
        res.json({ error: false, name: 'Exito', message: 'Se registro el movimiento' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}

controllerMovimiento.putMovimiento = async (req, res) => {
    try {
        // validando req.body
        if (isNaN(req.body.precioDeCompraPorUnidad)) {
            const error = new Error('El precio de compra por unidad debe ser un numero no negativo');
            error.name = 'El precio de compra por unidad no es valida';
            throw error;
        } else if (req.body.precioDeCompraPorUnidad < 0) {
            const error = new Error('El precio de compra por unidad no puede ser negativo');
            error.name = 'El precio de compra por unidad no es valida';
            throw error;
        }
        let movimiento = {};
        movimiento.proveedor = req.body.proveedor;
        movimiento.precioDeCompraPorUnidad = Number(req.body.precioDeCompraPorUnidad);
        movimiento.descripcion = req.body.descripcion;
        movimiento.precioDeCompraTotal = movimiento.precioDeCompraPorUnidad * Number(req.body.cantidad);
        await Movimiento.findByIdAndUpdate(req.params.id, movimiento);
        res.json({ error: false, name: 'Exito', message: 'Se edito el movimiento' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}

module.exports = controllerMovimiento;