const ProductDao = require('../dao/product.dao.js');
const HistoryDao = require('../dao/history.dao.js');
const dateformat = require('../utils/dateformat.js');

class StockBalance {
  constructor(connection, id_product) {
    this.id_product = id_product;
    this.productDao = new ProductDao(connection);
    this.historyDao = new HistoryDao(connection);
  }

  async performStockBalancing(date_close, qty_close, date_open, qty_add) {
    let qty_open = qty_close + qty_add;

    await this.performClosingStock(new Date(date_close), qty_close);
    await this.performOpeningStock(new Date(date_open), qty_open);

    return true;
  }

  async performClosingStock(date_close, quantity_close) {
    let product = await this.productDao.get(this.id_product);
    let history = { date_close, quantity_close };

    history.id_product = this.id_product;
    history.date_open = product.last_update;
    history.quantity_open = product.quantity;
    history.daily_spend = this.calcDailySpend(history);

    await this.historyDao.insert(history);
    return true;
  }

  async performOpeningStock(data_abert, quant_abert) {
    let product = await this.productDao.get(this.id_product);

    product.last_update = data_abert;
    product.quantity = quant_abert;
    product.mean_spend = await this.historyDao.calcMeanDailySpendOfProduct(
      this.id_product
    );
    product.date_to_finish = StockBalance.calcDateToFinish(product);

    await this.productDao.update(product.id, product);

    return true;
  }

  calcDailySpend(history) {
    let diffDays = dateformat.subtractDates(
      history.date_open,
      history.date_close
    );

    if (diffDays < 15) {
      throw new Error(
        'O balanço do produto só pode ser ' +
          'realizado 15 dias após a sua última atualização.'
      );
    }

    const quantitySpent = history.quantity_open - history.quantity_close;
    return quantitySpent / diffDays;
  }

  static calcDateToFinish(product) {
    product.last_update = new Date(product.last_update);

    let meanSpend = product.mean_spend
    meanSpend = meanSpend != null && meanSpend > 0 ? meanSpend : 1;

    const duringDays = product.quantity / meanSpend;
    const duringMillis = dateformat.convertDaysAsMillis(duringDays);

    const dateToFinish = new Date(product.last_update.getTime() + duringMillis);
    return dateToFinish;
  }
}

module.exports = StockBalance;
