const app = require('./src/app.js');

const server = {
  host: 'localhost',
  port: 3000,
};

app.listen(server, function () {
  console.log(`Server is running on http://${server.host}:${server.port}`);
});
