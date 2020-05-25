const dateformat = require('../utils/dateformat.js');
const executeQuery = require('../utils/db-query-promise.js');

class ProductDao {
  constructor(connection) {
    this.connection = connection;
  }

  async insert(product) {
    var sql = `INSERT INTO product 
            (description, quantity, last_update, mean_spend, date_to_finish) 
            VALUES ("$1", "$2", "$3", "$4", "$5");`;

    let last_update = dateformat.dateToString(product.last_update, 'yyyymmdd');
    let date_to_finish = dateformat.dateToString(
      product.date_to_finish,
      'yyyymmdd'
    );

    sql = sql
      .replace('$1', product.description)
      .replace('$2', product.quantity)
      .replace('$3', last_update)
      .replace('$4', product.mean_spend)
      .replace('$5', date_to_finish);

    const result = await executeQuery(this.connection, sql);

    if (result.affectedRows === 0)
      throw new Error('Não foi possível inserir o produto.');

    product.id = result.insertId;
    return product;
  }

  async update(id, product) {
    var sql = `UPDATE product as p SET 
            p.description="$1", p.quantity="$2", p.last_update="$3",
            p.mean_spend="$4", p.date_to_finish="$5"
            WHERE p.id="$6";`;

    let last_update = dateformat.dateToString(product.last_update, 'yyyymmdd');
    let date_to_finish = dateformat.dateToString(
      product.date_to_finish,
      'yyyymmdd'
    );

    sql = sql
      .replace('$1', product.description)
      .replace('$2', product.quantity)
      .replace('$3', last_update)
      .replace('$4', product.mean_spend)
      .replace('$5', date_to_finish)
      .replace('$6', id);

    const result = await executeQuery(this.connection, sql);

    if (result.affectedRows == 0)
      throw new Error('Não foi possível atualizar o produto.');

    return product;
  }

  async list() {
    const sql = 'SELECT * FROM product;';
    return await executeQuery(this.connection, sql);
  }

  async delete(id) {
    let sql = `DELETE FROM product WHERE id="$1";`;
    sql = sql.replace('$1', id);

    const result = await executeQuery(this.connection, sql);

    if (result.affectedRows === 0)
      throw new Error('Não foi possível excluir o produto.');

    return result;
  }

  async get(id) {
    let sql = `SELECT * FROM product WHERE id=$1;`;
    sql = sql.replace('$1', id);

    const result = await executeQuery(this.connection, sql);
    const product = result.length > 0 ? result[0] : null;
    return product;
  }
}

module.exports = ProductDao;
