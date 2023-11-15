const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./configs/db');
const Router = require('./routes/index');
const errorHandler = require('./helpers/errorHandler');
const logger = require('./helpers/logger');
require('dotenv').config();
// require('express-async-errors'); //Error Handler
db.connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

Router(app);

global.__logger = logger.instance;
// app.use((req, res, next) => {
//     res.status(404).send({
//         status: 'Error',
//         message: 'Not found',
//         code: 404,
//     });
// });
app.use(errorHandler);

module.exports = app;
