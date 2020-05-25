const StockBalance = require('../services/stock-balance.js');

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

      res.json({
        status: 'O Balanço do produto foi realizado e seu estoque atualizado.',
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: err.sqlMessage || err });
    }
  }

  async listStockOfProducts(req, res) {}
}

module.exports = new StockController();
