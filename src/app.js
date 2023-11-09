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

// app.use('/', Router);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

Router(app);

module.exports = app;
