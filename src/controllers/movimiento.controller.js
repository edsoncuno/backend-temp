const movimientoAjusteController = require('./../controllers/movimientoAjuste.controller')
const MovimientoEntradaController = require('./../controllers/movimientoEntrada.controller')
const MovimientoSalidaController = require('./../controllers/movimientoSalida.controller')

const movimientoController = {};

movimientoController.listar = async (query) => {
    const dataMovimientoAjuste = await movimientoAjusteController.listar(query);
    const dataMovimientoEntrada = await MovimientoEntradaController.listar(query);
    const dataMovimientoSalida = await MovimientoSalidaController.listar(query);
    const data = dataMovimientoAjuste.concat(dataMovimientoEntrada).concat(dataMovimientoSalida);
    data.sort((element1, element2) => {
        return element2.fecha - element1.fecha;
    });
    return data;
}

module.exports = movimientoController;