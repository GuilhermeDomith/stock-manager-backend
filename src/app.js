require('./config/dotenv.config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConnectionMiddleware = require('./middlewares/db-connection.middleware');
const pool = require('./config/pool-factory.config');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// created middlewares
app.use(dbConnectionMiddleware(pool));

// routes
app.use('/products', require('./routes/product.routes.js'));
app.use('/stock', require('./routes/stock.routes.js'));

module.exports = app;
