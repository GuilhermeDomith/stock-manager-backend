const StockBalance = require('../services/stock-balance.js');
const ProductDao = require('../dao/product.dao.js');

class ProductController {
  async insertProduct(req, res) {
    let product = req.body;
    const productDao = new ProductDao(req.connection);

    try {
      product.date_to_finish = StockBalance.calcDateToFinish(product);
      product = await productDao.insert(product);

      res.json({ data: product, status: 'Produto salvo.' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: err.sqlMessage || err.error });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const product = req.body;
    const productDao = new ProductDao(req.connection);

    try {
      await productDao.update(id, product);
      res.json({ status: 'Produto salvo.' });
    } catch (err) {
      res.status(400).json({ status: err.sqlMessage || err.error });
    }
  }

  async listAllProducts(req, res) {
    const productDao = new ProductDao(req.connection);

    try {
      const products = await productDao.list();
      res.json(products);
    } catch (err) {
      res.status(400).json({ status: err.sqlMessage });
    }
  }

  async getProduct(req, res) {
    const { id } = req.params;
    const productDao = new ProductDao(req.connection);

    try {
      const product = await productDao.get(id);
      res.json(product);
    } catch (err) {
      res.status(400).json({ id, status: err.sqlMessage });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const productDao = new ProductDao(req.connection);

    try {
      await productDao.delete(id);
      res.send();
    } catch (err) {
      res.status(400).json({ id, status: err.sqlMessage });
    }
  }
}

module.exports = new ProductController();
