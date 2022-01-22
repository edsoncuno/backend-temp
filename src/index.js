const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('mongoose');

const RouterItem = require('./routes/RouterItem');
const RouterMovimiento = require('./routes/RouterMovimiento');
const RouterStock = require('./routes/RouterStock');
const RouterProveedor = require('./routes/RouterProveedor');
const RouterUnidadDeMedida = require('./routes/RouterUnidadDeMedida');
const RouterTipoDeItem = require('./routes/RouterTipoDeItem');
/**
 * Variables
 */
const backend_port = 4000;
const connection_string = 'mongodb://localhost/dt_temp';

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
app.use('/tipoDeItem', RouterTipoDeItem);

/**
 * START
 */
app.listen(backend_port);
console.log('The backend-temp server is listening on the port: ', backend_port);