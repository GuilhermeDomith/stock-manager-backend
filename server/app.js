const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

require('./api.js')(app)

module.exports = app 