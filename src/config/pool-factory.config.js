var mysql = require('mysql');

const db_info = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: process.env.NODE_ENV === 'test' ? true : false,
};

const pool = mysql.createPool(db_info);

// Closes all database connnections when the server is shut down
process.on('SIGINT', () =>
  pool.end((err) => {
    if (err) return console.log(err);
    console.log('pool connections has been cloded.');
    process.exit(0);
  })
);

module.exports = pool;
