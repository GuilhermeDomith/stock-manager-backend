const executeQuery = require('../utils/db-query-promise.js');

class StockDao {
  constructor(connection) {
    this.connection = connection;
  }

  async listStock() {
    const sql = 'SELECT * FROM product ORDER BY description;';
    return await executeQuery(this.connection, sql);
  }

  async listLowStock() {
    const sql = `SELECT *, DATEDIFF(date_to_finish, CURDATE()) AS 'days_to_finish' 
      FROM product 
      WHERE date_to_finish < DATE_ADD(CURDATE(), INTERVAL 90 DAY)
      ORDER BY days_to_finish;`;
    return await executeQuery(this.connection, sql);
  }
}

module.exports = StockDao;
