const produtoDao = require('../database/produto.js')
const historicoDao = require('../database/historico.js')
const dateformat = require('../utils/dateformat.js')

module.exports = function(app){

    app.get('/produto', async function(req, res){
        try{
            const produtos = await produtoDao.listar_produtos()
            res.json(produtos)
        }catch(err){
            res.status(400).json({status: err.sqlMessage})
        }
    })

    app.post('/produto', function(req, res){
        var produto = req.body;
        let salvar_produto = produtoDao.inserir_produto

        if(produto.id)
            salvar_produto = produtoDao.editar_produto

        salvar_produto(produto)
            .then(() => res.json({status: "Produto salvo."}))
            .catch((err) => res.status(400).json({status: err.sqlMessage}))
    })

    app.delete('/produto', function(req, res){
        var id  = req.body.id
        
        produtoDao.delete_produto({id})
            .then((result) => res.json({id: id, status:`produtos excluídos: ${result.affectedRows}`}))
            .catch((err) => res.status(400).json({id: id, status: err.sqlMessage}))
    })

}
