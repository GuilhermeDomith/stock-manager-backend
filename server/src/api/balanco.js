const produtoDao = require('../database/produto.js')
const historicoDao = require('../database/historico.js')
const dateformat = require('../utils/dateformat.js')

module.exports = function(app) {

    app.post('/balanco', function(req, res){
        var produto_balanco = req.body;

        produtoDao.get_produto(produto_balanco.id)
            .then((produto) => criarHistoricoProduto(produto_balanco, produto))
            .then((historico) => calcularGastoDiario(historico))
            .then((historico) => guardarHistoricoProduto(historico))
            .then(() => atualizarEstoque(produto_balanco))
            .then(() => {
                res.json({status: "O Balanço do produto foi realizado e seu estoque atualizado."})
            })
            .catch((err) =>{
                res.json({status: err})
            })
    })

    function criarHistoricoProduto(produto_balanco, produto){
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

    function guardarHistoricoProduto(historico){
        historicoDao.registrar_historico(historico)
    }

    function atualizarEstoque(produto){
        produto.quantidade = parseInt(produto.quantidade) + parseInt(produto.quantidade_add)
        produto.data_update = dateformat.dateToString(
            produto.data_update, 'yyyymmdd')

        produtoDao.editar_produto(produto)
    }

}