const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./database');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/herramienta', require('./routes/RouterHerramienta'));

app.listen(process.env.PORT, () => {
    console.log(`Listening https://localhost:${process.env.PORT}`);
});