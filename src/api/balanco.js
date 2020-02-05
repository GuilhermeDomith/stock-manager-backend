const BalancoProduto = require('../controller/balancoProduto.js')
const EstimativaProduto = require('../controller/estimativaProduto.js')
const dateformat = require('../utils/dateformat.js')


module.exports = function(app) {

    app.post('/balanco', async function(req, res){
        let balanco = req.body;
        let balancoProduto = new BalancoProduto(balanco.id)
        let estimativaProduto = new EstimativaProduto(balanco.id)

        if(typeof(balanco.data_update) == "string")
            balanco.data_update = dateformat.stringToDate(balanco.data_update, 'yyyymmdd')

        try{
            await balancoProduto.realizarBalancoProduto(
                balanco.data_update, balanco.quantidade,
                balanco.data_update, balanco.quantidade_add )

            await estimativaProduto.atualizarGastoMedioProduto()

            res.json({
                status: "O Balanço do produto foi realizado e seu estoque atualizado."
            })   
        }catch(err){
            console.log(err)
            res.status(400).json({status: err.sqlMessage || err})
        }
    })

}