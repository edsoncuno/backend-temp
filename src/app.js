import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './database';
import './config';

import routerItem from './routes/RouterItem';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/item', routerItem);

export default app;