var mysql = require('mysql')
var db_info = {
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'controle_de_estoque'
}

module.exports.connect = function(){
    var connection = mysql.createConnection(db_info)

    connection.connect(function(error){
        if(error) throw error
        console.log(`Conexão com '${db_info.database}' realizada com sucesso!`)
    })

    return connection;
}