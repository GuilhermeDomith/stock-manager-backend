const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

console.log(process.env.NODE_ENV)
console.log(process.env.DB_NAME)

app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

require('./api/balanco.js')(app)
//require('./api/produto.js')(app)

module.exports = app 