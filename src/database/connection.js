var mysql = require('mysql')

var db_info = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: (process.env.NODE_ENV === "test")? true : false
}

function connect(){
    var connection = mysql.createConnection(db_info)

    connection.connect(function(error){
        if(error) throw error
        console.log(`Conexão com '${db_info.database}' realizada com sucesso!`)
    })

    return connection;
}

module.exports = connect()