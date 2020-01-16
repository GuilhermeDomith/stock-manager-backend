module.exports = function(app){

    const produtoDao = require('./produto.js')()

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

}