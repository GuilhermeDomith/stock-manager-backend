const connection = require('../../src/database/connection.js')


function queryPromisse(connection, sql){
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) reject(err)
            else resolve(result)
        })
    })
}

module.exports = async () => {
    try{
        let sql = 'SET FOREIGN_KEY_CHECKS=0;' +
        'TRUNCATE TABLE historico_estoque;' +
        'TRUNCATE TABLE produto;' +
        'SET FOREIGN_KEY_CHECKS=1;'

        let result = await queryPromisse(connection, sql)
        console.log('Truncade query successfully executed.')
        return true
    }catch(err){
        console.log(err)
        console.error('Error while running truncade query.')
        return false
    }
}