const produtoDao = require('../database/produto.js')
const historicoDao = require('../database/historico.js')
const dateformat = require('../utils/dateformat.js')

class EstimativaProduto{

    constructor(id_produto){
        this.id_produto = id_produto
    }

    async atualizarGastoMedioProduto(){
        try{
            let result = await historicoDao.obterGastoMedioProduto(this.id_produto)

            let dias_duracao = result[0].quantidade/result[0].gasto_medio
            let millis_duracao = dateformat.convertDaysAsMillis(dias_duracao)
            console.log(dias_duracao)

            let data_update = result[0].data_update

            let data_termino  = new Date(data_update.getTime() +  millis_duracao)
            data_termino = dateformat.dateToString(data_termino, 'yyyymmdd')

            await produtoDao.atualizar_gasto_medio(
                this.id_produto, result[0].gasto_medio, data_termino)
            console.log("Gasto médio do produto atualizado.")
        }catch(err){
            throw err
        }
        return true        
    }

    async obterGastoMedioDiario(){
        try{
            //let historicos = await historicoDao.obterHistoricosProduto(this.id_produto)
        }catch(err){
            throw err
        }
        return true        
    }

    obterGastoMaximoDiario(){}
    obterGastoMedianoDiario(){}

}

module.exports = EstimativaProduto