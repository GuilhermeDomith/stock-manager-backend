const connection = require('../config/pool-factory.js')
const dateformat = require('../utils/dateformat.js')

function queryPromisse(connection, sql){
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) reject(err)
            else resolve(result)
        })
    })
}

class produtoDao{

    constructor(){}

    inserir_produto(produto){
        var sql = `INSERT INTO product (description, quantity, last_update) 
                VALUES ("$1", "$2", "$3");`

        let data_update = produto.data_update

        if(typeof(data_update) != "string")
            data_update = dateformat.dateToString(data_update, 'yyyymmdd')
        
        sql = sql.replace('$1', produto.descricao)
            .replace('$2', produto.quantidade)
            .replace('$3', data_update)
        
        return queryPromisse(connection, sql)
    }

    editar_produto(produto, callback){
        var sql = `UPDATE product as p SET 
            p.description="$1", p.quantity="$2", p.last_update="$3"
            WHERE p.id="$4";`
        
        let data_update = produto.data_update

        if(typeof(data_update) != "string")
            data_update = dateformat.dateToString(data_update, 'yyyymmdd')
        
        sql = sql.replace('$1', produto.descricao)
            .replace('$2', produto.quantidade)
            .replace('$3', data_update)
            .replace('$4', produto.id)
        
        return queryPromisse(connection, sql)
    }

    listar_produtos(){
        let sql = "SELECT * FROM product;"
        return queryPromisse(connection, sql)
    }

    delete_produto(produto, callback){
        var sql = `DELETE FROM product WHERE id="$1"`
        sql = sql.replace('$1', produto.id)
        return queryPromisse(connection, sql)
    }

    atualizar_gasto_medio(id_produto, gasto_medio, data_termino, callback){
        var sql = `UPDATE product as p 
            SET p.mean_spend="$1", p.date_to_finish="$2"
            WHERE id="$3";`

        if(typeof(data_termino) != "string")
            data_termino = dateformat.dateToString(data_termino, 'yyyymmdd')
        
        sql = sql.replace('$1', gasto_medio)
            .replace('$2', data_termino)
            .replace('$3', id_produto)
        
        return queryPromisse(connection, sql)
    }
    
    get_produto(id){
        let sql = `SELECT * FROM product WHERE id="$1"`
        sql = sql.replace("$1", id)
        return queryPromisse(connection, sql)
    }
}

module.exports = new produtoDao()