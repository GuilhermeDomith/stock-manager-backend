const HistoryDao = require('../dao/history.dao.js');
const { success, error } = require('../utils/responses.js');

class HistoryController {
  async listAllHistory(req, res) {
    const historyDao = new HistoryDao(req.connection);

    try {
      const histories = await historyDao.list();
      success(res, { data: histories });
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async deleteById(req, res) {
    const { id } = req.params;
    const historyDao = new HistoryDao(req.connection);

    try {
      await historyDao.delete(id);
      success(res);
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async listAllHistoryByProduct(req, res) {
    const { id } = req.params;
    const historyDao = new HistoryDao(req.connection);

    try {
      const histories = await historyDao.listByProduct(id);
      success(res, { data: histories });
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async getLastHistoryByProduct(req, res) {
    const { id } = req.params;
    const historyDao = new HistoryDao(req.connection);

    try {
      const history = await historyDao.getLastByProduct(id);
      success(res, { data: history });
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }

  async deleteAllByProduct(req, res) {
    const { id } = req.params;
    const historyDao = new HistoryDao(req.connection);

    try {
      await historyDao.deleteAllByProduct(id);
      success(res);
    } catch (err) {
      error(res, { message: err.sqlMessage || err.message });
    }
  }
}

module.exports = new HistoryController();
