var db = require('./database.js')
var connection = db.connect()

module.exports = function(callback){

    this.inserir_produto = function(produto, callback){
        var sql = `INSERT INTO produto (descricao, quantidade, data_update) 
                VALUES ("$1", "$2", "$3");`
        
        sql = sql.replace('$1', produto.descricao)
            .replace('$2', produto.quantidade)
            .replace('$3', produto.data_update)
        
        console.log(sql)
        connection.query(sql, callback)
    }

    this.editar_produto = function(produto, callback){
        var sql = `UPDATE produto as p SET 
            p.descricao="$1", p.quantidade="$2", p.data_update="$3"
            WHERE p.id="$4";`
        
        sql = sql.replace('$1', produto.descricao)
            .replace('$2', produto.quantidade)
            .replace('$3', produto.data_update)
            .replace('$4', produto.id)
        
        console.log(sql)
        connection.query(sql, callback)
    }

    this.listar_produtos = function (callback){
        connection.query("SELECT * FROM produto;", callback);
    }

    this.delete_produto = function (produto, callback){
        var sql = `DELETE FROM produto WHERE id="$1"`
        sql = sql.replace('$1', produto.id)
        connection.query(sql, callback)
    }

    this.get_produto = function (id, callback){
        var sql = `SELECT * FROM produto WHERE id="$1"`
        sql = sql.replace("$1", id)
        connection.query(sql, callback)
    }

    return this;

}