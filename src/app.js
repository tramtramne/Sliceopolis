const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/db');
const Router = require('./routes/index');
require('dotenv').config();
// require('express-async-errors'); //Error Handler
db.connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/v1', Router);

module.exports = app;
