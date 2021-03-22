const df = require('../utils/dateformat.js');
const executeQuery = require('../utils/db-query-promise');

class HistoryDao {
  constructor(connection) {
    this.connection = connection;
  }

  async insert(history) {
    let sql = `INSERT INTO history 
        (id_product, date_open, date_close, quantity_open, quantity_close, daily_spend) 
        VALUES ("$1", "$2", "$3", "$4", "$5", "$6");`;

    sql = sql
      .replace('$1', history.id_product)
      .replace('$2', df.dateToString(history.date_open, 'yyyymmdd'))
      .replace('$3', df.dateToString(history.date_close, 'yyyymmdd'))
      .replace('$4', history.quantity_open)
      .replace('$5', history.quantity_close)
      .replace('$6', history.daily_spend);

    const result = await executeQuery(this.connection, sql);

    if (result.affectedRows === 0)
      throw new Error('Não foi possível inserir o histórico do produto.');

    history.id = result.insertId;
    return history;
  }

  async getLastByProduct(id) {
    let sql = `SELECT * FROM history 
      WHERE id_product="$1"
      ORDER BY id DESC
      LIMIT 1;`;

    sql = sql.replace('$1', id);
    const history = await executeQuery(this.connection, sql);

    if (history.length === 0) return null;
    return history[0];
  }


  async delete(id) {
    let sql = `DELETE FROM history WHERE id="$1";`;

    sql = sql.replace('$1', id);
    const result = await executeQuery(this.connection, sql);

    if (result.affectedRows === 0)
      throw new Error('Não foi possível excluir o histórico do produto.');

    return true;
  }

  async deleteAllByProduct(id) {
    let sql = `DELETE FROM history WHERE id_product="$1";`;

    sql = sql.replace('$1', id);
    const result = await executeQuery(this.connection, sql);

    if (result.affectedRows === 0)
      throw new Error('Não foi possível excluir o histórico do produto.');

    return true;
  }

  async list() {
    const sql = 'SELECT * FROM history;';
    return await executeQuery(this.connection, sql);
  }

  async listByProduct(id_product) {
    let sql = 'SELECT * FROM history WHERE id_product="$1";';

    sql = sql.replace('$1', id_product);
    return await executeQuery(this.connection, sql);
  }

  async calcMeanDailySpendOfProduct(id_product, number_of_hist = 3) {
    var sql = `SELECT AVG(daily_spend) as mean_spend
            FROM history AS hist INNER JOIN product as prod 
            WHERE hist.id_product=prod.id && id_product="$1" 
            ORDER BY date_close
            DESC LIMIT $2;`;

    sql = sql.replace('$1', id_product).replace('$2', number_of_hist);

    const result = await executeQuery(this.connection, sql);
    return result.length > 0 ? result[0].mean_spend || 0 : 0;
  }
}

module.exports = HistoryDao;
