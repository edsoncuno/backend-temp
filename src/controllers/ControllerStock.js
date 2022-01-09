import Item from '../models/Item';
import Movimiento from '../models/Movimiento';

export const putStock = async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, { stock: { cantidad: req.body.cantidad } });
        const item = await Item.findById(req.params.id);
        req.body.item_id = req.params.id;
        req.body.stock_actual = req.body.cantidad;
        req.body.cantidad = 0;
        req.body.nombre = item.nombre;
        req.body.unidad_de_medida = item.unidad_de_medida;
        req.body.fecha_de_registro = new Date();
        req.body.proveedor = '';
        req.body.precio_de_compra_por_unidad = 0;
        req.body.precio_de_compra_total = 0;
        req.body.descripcion = '';
        const newMovimiento = new Movimiento(req.body);
        await newMovimiento.save();
        res.status(200).json({ error: false, name: 'Exito', message: 'Se Edito el stock del item' });
    } catch (error) {
        res.json({ error: true, name: error.name, message: error.message });
    }
}