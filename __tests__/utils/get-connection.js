const pool = require('../../src/config/pool-factory.js');

module.exports = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      else resolve(connection);
    });
  });
};
