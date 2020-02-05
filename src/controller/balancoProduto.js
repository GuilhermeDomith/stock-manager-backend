const produtoDao = require('../database/produto.js')
const historicoDao = require('../database/historico.js')
const dateformat = require('../utils/dateformat.js')

class BalancoProduto{

    constructor (id_produto){
        this.id_produto = id_produto
    }

    async realizarFechamentoEstoque(data_fech, quant_fech){
        try{
            let produto = await produtoDao.get_produto(this.id_produto)
            produto = (produto.length > 0)? produto[0] : null 
            
            let historico = { data_fech, quant_fech }

            // Obtém a última atualização do produto

            historico.data_abert =  produto.data_update
            historico.quant_abert = produto.quantidade
            historico.id_produto = this.id_produto
            historico.gasto_diario = this.calcularGastoDiario(historico)

            await historicoDao.registrar_historico(historico)
        }catch(err){
            throw err
        }

        return true
    }

    async realizarAberturaEstoque(data_abert, quant_abert) {
        try{
            let produto = await produtoDao.get_produto(this.id_produto)
            produto = (produto.length > 0)? produto[0] : null 

            produto.data_abert = data_abert
            produto.quantidade = quant_abert

            await produtoDao.editar_produto(produto)
        }catch(err){
            throw err
        }

        return true
    }

    async realizarBalancoProduto(data_fech, quant_fech, data_abert, quant_add){
        let quant_abert = quant_fech + quant_add

        await this.realizarFechamentoEstoque(data_fech, quant_fech)
        await this.realizarAberturaEstoque(data_abert, quant_abert)

        return true
    }

    calcularGastoDiario(historico){
        let dias_corridos = dateformat.subtractDates(
            historico.data_abert, 
            historico.data_fech 
        )
        
        if(dias_corridos <= 30){
            throw "O balanço do produto só pode ser " + 
            "realizado 30 dias após a sua última atualização."
        }

        let gasto = historico.quant_abert - historico.quant_fech
        console.log(gasto, dias_corridos)
        console.log(gasto / dias_corridos)
        return gasto / dias_corridos
    }
    
}

module.exports = BalancoProduto