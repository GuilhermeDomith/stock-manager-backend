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

        let data_abert = historico.data_abert
        let data_fech = historico.data_fech

        if(typeof(data_abert) != "string")
            data_abert = dateformat.dateToString(data_abert, 'yyyymmdd')

        if(typeof(data_fech) != "string")
            data_fech = dateformat.dateToString(data_fech, 'yyyymmdd')
        
        sql = sql.replace('$1', historico.id_produto)
            .replace('$2', data_abert)
            .replace('$3', historico.quant_abert)
            .replace('$4', data_fech)
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