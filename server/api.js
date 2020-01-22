module.exports = function(app){

    const produtoDao = require('./produto.js')()
    const historicoDao = require('./historico.js')()
    const dateformat = require('./dateformat.js')()

    app.get('/produto', function(req, res){
        produtoDao.listar_produtos(function(error, result){
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

    app.post('/produto/balanco', function(req, res){
        var produto_balanco = req.body;

        produtoDao.get_produto(produto_balanco.id, function(error, result){
            if(error) throw error
            
            produto_balanco.data_update = dateformat.stringToDate(
                produto_balanco.data_update, 'yyyymmdd')

            let produto = result[0]

            let historico = {
                id_produto: produto_balanco.id,
                data_abert: produto.data_update,
                quant_abert: produto.quantidade,
                data_fech: produto_balanco.data_update,
                quant_fech: produto_balanco.quantidade
            }

            let dias_corridos = dateformat.subtractDates(
                historico.data_abert, 
                historico.data_fech )
            
            if(dias_corridos <= 30){
                return res.json({status: "O balanço do estoque só pode ser "+
                "realizado após 30 dias, após a última atualização."})
            }

            historico.gasto_diario = (historico.quant_abert - historico.quant_fech) / dias_corridos
            historicoDao.registrar_historico(historico)

            produto_balanco.quantidade = parseInt(produto_balanco.quantidade) + parseInt(produto_balanco.quantidade_add)
            produto_balanco.data_update = dateformat.dateToString(
                produto_balanco.data_update, 'yyyymmdd')
            produtoDao.editar_produto(produto_balanco)
            
            return res.json({status: "Balanço Realizado. Estoque do produto foi atualizado."})
        })
      
    })

}