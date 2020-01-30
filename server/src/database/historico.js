const dateformat = require('../utils/dateformat.js')
const connection = require('./connection.js')

function queryPromisse(connection, sql){
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) reject(err)
            else resolve(result)
        })
    })
}

function historicoDao(){

    this.registrar_historico = function(historico){
        var sql = `INSERT INTO historico_estoque 
        (id_produto, data_abert, quant_abert, data_fech, quant_fech, gasto_diario) 
        VALUES ("$1", "$2", "$3", "$4", "$5", "$6");`
        
        sql = sql.replace('$1', historico.id_produto)
            .replace('$2', dateformat.dateToString(historico.data_abert, 'yyyymmdd') )
            .replace('$3', historico.quant_abert)
            .replace('$4', dateformat.dateToString(historico.data_fech, 'yyyymmdd') )
            .replace('$5', historico.quant_fech)
            .replace('$6', historico.gasto_diario)
        
        return queryPromisse(connection, sql)
    }

    this.obterGastoMedioProduto = function(id_produto){
        var sql = `SELECT id_produto, quantidade, data_update, AVG(gasto_diario) as gasto_medio
            FROM historico_estoque AS h INNER JOIN produto as p 
            WHERE h.id_produto=p.id && id_produto="$1" 
            ORDER BY data_fech
            DESC LIMIT 3;`
        
        sql = sql.replace('$1', id_produto)
        
        return queryPromisse(connection, sql)   
    }

    return this;

}

module.exports = historicoDao()