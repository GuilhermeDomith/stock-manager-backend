const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./api.js')(app)

module.exports = app 