const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('mongoose');

const RouterItem = require('./routes/item.router');
const RouterMovimiento = require('./routes/movimiento.router');
const RouterStock = require('./routes/stock.router');
const RouterProveedor = require('./routes/proveedor.router');
const RouterUnidadDeMedida = require('./routes/unidadDeMedida.router');
const routerCategoria = require('./routes/categoria.router');
const routerCliente = require('./routes/cliente.router');
const movimientoAjusteRouter = require('./routes/movimientoAjuste.router');
const movimientoEntradaRouter = require('./routes/movimientoEntrada.router');
const movimientoSalidaRouter = require('./routes/movimientoSalida.router');
const hanldeError = require('./middlewares/handleError.middleware');
/**
 * Variables
 */
const backend_port = 5000;
const connection_string = 'mongodb://localhost/db_temp';

/**
 * DATABASE
 */
const connectToMongoDB = async () => {
    try {
        const database = await connect(connection_string);
        console.log('Connected to the database: ', database.connection.name);
    } catch (error) {
        console.error(error.name);
        console.error(error.message);
    }
}
connectToMongoDB();
/**
 * REST
 */
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routers
app.use('/item', RouterItem);
app.use('/movimiento', RouterMovimiento);
app.use('/stock', RouterStock);
app.use('/proveedor', RouterProveedor);
app.use('/unidadDeMedida', RouterUnidadDeMedida);
app.use('/categoria', routerCategoria);
app.use('/cliente', routerCliente);
app.use('/movimientoAjuste', movimientoAjusteRouter);
app.use('/movimientoEntrada', movimientoEntradaRouter);
app.use('/movimientoSalida', movimientoSalidaRouter);

app.use(hanldeError);

/**
 * START
 */
app.listen(backend_port);
console.log(`The backend-temp server is listening on the port: http://localhost:${backend_port}/`);