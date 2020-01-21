module.exports = function(app){

    const produtoDao = require('./produto.js')()

    app.get('/produto', function(req, res){
        produtoDao.listar_produtos(function(error, result){
            var day = result[0].data_update.getDay()
            res.json(result);
        });
    })

    app.post('/produto', function(req, res){
        var produto = req.body;
        if(produto.id)
            produtoDao.editar_produto(produto)
        else
            produtoDao.inserir_produto(produto)

        res.json(req.body);
    })

    app.delete('/produto', function(req, res){
        var id  = req.body.id
        
        produtoDao.delete_produto({id}, function(error, result){
            if(error || result.affectedRows == 0){
                console.log(error)
                res.json({id: id, status:'not deleted'})
            }else{
                res.json({id: id, status:'deleted'})
            }
        })
    })

}