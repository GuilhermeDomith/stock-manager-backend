var db = require('./database.js')
var connection = db.connect()

module.exports = function(callback){

    this.inserir_produto = function(produto, callback){
        var sql = `INSERT INTO produto(descricao, quantidade, data_update) 
                VALUES (A1, $2, $3);`
        
        sql = sql.replace('$1', produto.descricao)
        sql = sql.replace('$2', produto.quantidade)
        sql = sql.replace('$3', produto.data)
        
        connection.query(sql, callback)
    }

    this.listar_produtos = function (callback){
        connection.query("SELECT * FROM produto;", callback);
    }

    return this;

}