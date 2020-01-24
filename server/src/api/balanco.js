const produtoDao = require('../database/produto.js')
const historicoDao = require('../database/historico.js')
const dateformat = require('../utils/dateformat.js')

module.exports = function(app) {

    app.post('/balanco', function(req, res){
        var produto_balanco = req.body;

        produtoDao.get_produto(produto_balanco.id)
            .then((result) => criarHistoricoProduto(produto_balanco, result))
            .then((historico) => calcularGastoDiario(historico))
            .then((historico) => {
                historicoDao.registrar_historico(historico)
                    .then(() => {
                        atualizarEstoque(produto_balanco)
                            .then(handlerSuccessRealizarBalanco)
                            .catch((err) => handlerErrorRealizarBalanco(err, res))
                    })
                    .catch((err) => handlerErrorRealizarBalanco(err, res))
            })
            .catch((err) => handlerErrorRealizarBalanco(err, res))
    })

    function handlerErrorRealizarBalanco(err, res){
        res.status(400).json({status: err.sqlMessage || err})
    }

    function handlerSuccessRealizarBalanco(res){
        res.json({
            status: "O Balanço do produto foi realizado e seu estoque atualizado."
        })        
    }

    function criarHistoricoProduto(produto_balanco, result){
        let produto = result[0]

        produto_balanco.data_update = dateformat.stringToDate(
            produto_balanco.data_update, 'yyyymmdd')

        let historico = {
            id_produto: produto_balanco.id,
            data_abert: produto.data_update,
            quant_abert: produto.quantidade,
            data_fech: produto_balanco.data_update,
            quant_fech: produto_balanco.quantidade
        }

        return historico
    }

    function calcularGastoDiario(historico){
        let dias_corridos = dateformat.subtractDates(
            historico.data_abert, 
            historico.data_fech 
        )
        
        if(dias_corridos <= 30) 
            throw "O balanço do estoque só pode ser "
            + "realizado 30 dias após a última atualização do produto."

        let gasto = historico.quant_abert - historico.quant_fech
        historico.gasto_diario =  gasto / dias_corridos

        return historico
    }

    function atualizarEstoque(produto){
        produto.quantidade = parseInt(produto.quantidade) + parseInt(produto.quantidade_add)
        produto.data_update = dateformat.dateToString(
            produto.data_update, 'yyyymmdd')

        return produtoDao.editar_produto(produto)
    }

}