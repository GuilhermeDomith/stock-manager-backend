const express = require('express')
const bodyParser = require('body-parser')
const produtoDao = require('./produto.js')()

app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
    produtoDao.listar_produtos(function(error, result){
        var day = result[0].data_update.getDay()
        res.send({ result });
    });
})

app.post('/produto', function(req, res){
    var produto = req.body;
    produtoDao.inserir_produto(produto)
    res.json(req.body);
})

var server = {
    host: 'localhost',
    port: 3000
}

app.listen(server, function(){
    console.log(`Servidor executando na porta ${server.port}`)
})