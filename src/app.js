import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import ConnectToDatabase from './ConnectToDatabase';
import RouterItem from './routes/RouterItem';
import RouterMovimiento from './routes/RouterMovimiento';
import RouterStock from './routes/RouterStock';

const newConnectToDatabase = new ConnectToDatabase();
newConnectToDatabase.connectToMongoDB();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/item', RouterItem);
app.use('/movimiento', RouterMovimiento);
app.use('/stock', RouterStock);

export default app;