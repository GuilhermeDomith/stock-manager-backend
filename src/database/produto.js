const connection = require('./connection.js')

function queryPromisse(connection, sql){
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) reject(err)
            else resolve(result)
        })
    })
}

function produtoDao(){

    this.inserir_produto = function(produto){
        var sql = `INSERT INTO produto (descricao, quantidade, data_update) 
                VALUES ("$1", "$2", "$3");`
        
        sql = sql.replace('$1', produto.descricao)
            .replace('$2', produto.quantidade)
            .replace('$3', produto.data_update)
        
        return queryPromisse(connection, sql)
    }

    this.editar_produto = function(produto, callback){
        var sql = `UPDATE produto as p SET 
            p.descricao="$1", p.quantidade="$2", p.data_update="$3"
            WHERE p.id="$4";`
        
        sql = sql.replace('$1', produto.descricao)
            .replace('$2', produto.quantidade)
            .replace('$3', produto.data_update)
            .replace('$4', produto.id)
        
        return queryPromisse(connection, sql)
    }

    this.listar_produtos = function (){
        let sql = "SELECT * FROM produto;"
        return queryPromisse(connection, sql)
    }

    this.delete_produto = function (produto, callback){
        var sql = `DELETE FROM produto WHERE id="$1"`
        sql = sql.replace('$1', produto.id)
        return queryPromisse(connection, sql)
    }

    this.atualizar_gasto_medio = function(id_produto, gasto_medio, data_termino, callback){
        var sql = `UPDATE produto as p 
            SET p.gasto_medio_diario="$1", p.data_termino="$2"
            WHERE id="$3";`
        
        sql = sql.replace('$1', gasto_medio)
            .replace('$2', data_termino)
            .replace('$3', id_produto)
        
        return queryPromisse(connection, sql)
    }
    
    this.get_produto = function (id){
        let sql = `SELECT * FROM produto WHERE id="$1"`
        sql = sql.replace("$1", id)
        return queryPromisse(connection, sql)
    }

    return this;

}

module.exports = produtoDao()