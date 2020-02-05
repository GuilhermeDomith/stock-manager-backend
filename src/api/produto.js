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

    app.post('/produto', async function(req, res){
        var produto = req.body;
        let salvar_produto = produtoDao.inserir_produto

        if(produto.id)
            salvar_produto = produtoDao.editar_produto

        try{
            let result = await salvar_produto(produto)

            if(result.affectedRows == 0)
                res.status(400).json({
                    status: "Produto não pôde ser alterado ou não existe."
                })    
            else
                res.json({status: "Produto salvo."})

        }catch(err){
            res.status(400).json({status: err.sqlMessage})
        }
    })

    app.delete('/produto', async function(req, res){
        var id  = req.body.id
        
        try{
            let result = await produtoDao.delete_produto({ id })
            res.json({
                id: id,
                status:`produtos excluídos: ${result.affectedRows}`
            })
        } catch(err){
            res.status(400).json({ id: id, status: err.sqlMessage })
        }
    })

}
