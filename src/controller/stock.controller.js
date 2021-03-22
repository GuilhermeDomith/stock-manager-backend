const StockBalance = require('../services/stock-balance.js');
const StockDao = require('../dao/stock.dao.js');
const ProductDao = require('../dao/product.dao.js');
const HistoryDao = require('../dao/history.dao.js');
const { success, error } = require('../utils/responses');

class StockController {
  async updateStockOfProduct(req, res) {
    var { id } = req.params;
    var stock = req.body;

    const balance = new StockBalance(req.connection, id);

    try {
      await balance.performStockBalancing(
        stock.availableOnDate,
        stock.availableQuantity,
        stock.addOnDate,
        stock.addQuantity
      );

      success(res, {
        message: 'O Balanço do produto foi realizado e seu estoque atualizado.',
      });
    } catch (err) {
      error(res, { message: err.message || err });
    }
  }

  async restoreLastStockOfProduct(req, res) {
    var { id } = req.params;

    const productDao = new ProductDao(req.connection);
    const historyDao = new HistoryDao(req.connection);

    try {
      const product = await productDao.get(id);
      const history = await historyDao.getLastByProduct(id);

      if (history != null) {
        await historyDao.delete(history.id);

        product.quantity = history.quantity_open;
        product.last_update = history.date_open;
        const m = await historyDao.calcMeanDailySpendOfProduct(product.id);
        product.mean_spend = m;
        product.date_to_finish = StockBalance.calcDateToFinish(product);

        await productDao.update(product.id, product);
      }

      success(res);
    } catch (err) {
      error(res, { message: err.message || err });
    }
  }

  async listStock(req, res) {
    const stockDao = new StockDao(req.connection);
    try {
      const products = await stockDao.listStock();
      success(res, { data: products });
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async listLowStock(req, res) {
    const stockDao = new StockDao(req.connection);
    try {
      const products = await stockDao.listLowStock();
      success(res, { data: products });
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }
}


module.exports = new StockController();
