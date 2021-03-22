const StockBalance = require('../services/stock-balance.js');
const ProductDao = require('../dao/product.dao.js');
const { success, error } = require('../utils/responses.js');

class ProductController {
  async insertProduct(req, res) {
    let product = req.body;
    const productDao = new ProductDao(req.connection);

    try {
      product.date_to_finish = StockBalance.calcDateToFinish(product);
      product = await productDao.insert(product);
      success(res, { data: product });
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const product = req.body;
    const productDao = new ProductDao(req.connection);

    try {
      await productDao.update(id, product);
      success(res);
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async listAllProducts(req, res) {
    const productDao = new ProductDao(req.connection);

    try {
      const products = await productDao.list();
      success(res, { data: products });
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async getProduct(req, res) {
    const { id } = req.params;
    const productDao = new ProductDao(req.connection);

    try {
      const product = await productDao.get(id);
      success(res, { data: product });
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const productDao = new ProductDao(req.connection);

    try {
      await productDao.delete(id);
      success(res);
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }
}

module.exports = new ProductController();
