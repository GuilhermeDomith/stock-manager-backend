const dateformat = require('../utils/dateformat.js');
const executeQuery = require('../utils/db-query-promise');

class HistoryDao {
  constructor(connection) {
    this.connection = connection;
  }

  async insert(history) {
    var sql = `INSERT INTO history 
        (id_product, date_open, date_close, quantity_open, quantity_close, daily_spend) 
        VALUES ("$1", "$2", "$3", "$4", "$5", "$6");`;

    let date_open = history.date_open;
    let date_close = history.date_close;

    date_open = dateformat.dateToString(date_open, 'yyyymmdd');
    date_close = dateformat.dateToString(date_close, 'yyyymmdd');

    sql = sql
      .replace('$1', history.id_product)
      .replace('$2', date_open)
      .replace('$3', date_close)
      .replace('$4', history.quantity_open)
      .replace('$5', history.quantity_close)
      .replace('$6', history.daily_spend);

    const result = await executeQuery(this.connection, sql);

    if (result.affectedRows === 0)
      throw new Error('Não foi possível inserir o histórico do produto.');

    history.id = result.insertId;
    return history;
  }

  async calcMeanDailySpendOfProduct(id_product, number_of_hist = 3) {
    var sql = `SELECT AVG(daily_spend) as mean_spend
            FROM history AS hist INNER JOIN product as prod 
            WHERE hist.id_product=prod.id && id_product="$1" 
            ORDER BY date_close
            DESC LIMIT $2;`;

    sql = sql.replace('$1', id_product).replace('$2', number_of_hist);

    const result = await executeQuery(this.connection, sql);
    return result.length > 0 ? result[0].mean_spend : null;
  }
}

module.exports = HistoryDao;
