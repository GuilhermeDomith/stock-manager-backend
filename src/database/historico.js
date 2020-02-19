const dateformat = require('../utils/dateformat.js')
const connection = require('../config/pool-factory.js')

function queryPromisse(connection, sql){
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) reject(err)
            else resolve(result)
        })
    })
}

class historicoDao{

    constructor() {}

    registrar_historico(historico){
        var sql = `INSERT INTO historico_estoque 
        (id_product, date_open, date_close, quantity_open, quantity_close, daily_spend) 
        VALUES ("$1", "$2", "$3", "$4", "$5", "$6");`

        let data_abert = historico.data_abert
        let data_fech = historico.data_fech

        if(typeof(data_abert) != "string")
            data_abert = dateformat.dateToString(data_abert, 'yyyymmdd')

        if(typeof(data_fech) != "string")
            data_fech = dateformat.dateToString(data_fech, 'yyyymmdd')
        
        sql = sql.replace('$1', historico.id_produto)
            .replace('$2', data_abert)
            .replace('$3', data_fech)
            .replace('$4', historico.quant_abert)
            .replace('$5', historico.quant_fech)
            .replace('$6', historico.gasto_diario)
        
        return queryPromisse(connection, sql)
    }

    obterGastoMedioProduto(id_produto){
        var sql = `SELECT id_product, quantity, last_update, AVG(daily_spend) as gasto_medio
            FROM history AS hist INNER JOIN product as prod 
            WHERE hist.id_product=prod.id && id_product="$1" 
            ORDER BY date_close
            DESC LIMIT 3;`
        
        sql = sql.replace('$1', id_produto)
        
        return queryPromisse(connection, sql)   
    }
}

module.exports = new historicoDao()