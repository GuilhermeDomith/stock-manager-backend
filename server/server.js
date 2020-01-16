app = require('./app.js')

var server = {
    host: 'localhost',
    port: 3000
}

app.listen(server, function(){
    console.log(`Servidor executando na porta ${server.port}`)
})