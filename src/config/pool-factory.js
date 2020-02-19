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

    return new Promise((resolve, reject) => {
        connection.connect(async function(error){
            if(error) {
                reject(error)
                //throw `Erro ao conectar com database '${db_info.database}'`
            }else{
                console.log(`Conexão com '${db_info.database}' realizada com sucesso!`)
                resolve(connection)
            }
        })
    });
}

module.exports = connect()