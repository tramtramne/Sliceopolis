const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
require("dotenv").config()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

module.exports = app
