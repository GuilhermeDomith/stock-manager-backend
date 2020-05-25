const queryPromise = require('../../src/utils/db-query-promise.js');
const getConnection = require('./get-connection.js');

module.exports = async () => {
  try {
    const sql =
      'SET FOREIGN_KEY_CHECKS=0;' +
      'TRUNCATE TABLE history;' +
      'TRUNCATE TABLE product;' +
      'SET FOREIGN_KEY_CHECKS=1;';

    const connection = await getConnection();
    return queryPromise(connection, sql);
  } catch (err) {
    console.log(err);
    console.error('Error while running truncade query.');
    return false;
  }
};
