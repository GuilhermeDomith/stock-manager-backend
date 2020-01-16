const express = require('express')
const parser = require('body-parser')
const produto_dao = require('./produto.js')()

app = express()
app.use(express.json())

app.get('/', function(req, res){
    produto_dao.listar_produtos(function(error, result){
        var day = result[0].data_update.getDay()
        res.send({ result });
    });
})

app.post('/produto', function(req, res){
    var produto = req.body;
    produto_dao.inserir_produto(produto)
    res.json(req.body);
})

var server = {
    host: 'localhost',
    port: 3000
}

app.listen(server, function(){
    console.log(`Servidor executando na porta ${server.port}`)
})