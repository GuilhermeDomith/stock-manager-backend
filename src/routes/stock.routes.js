const express = require('express');
const router = express.Router();
const controller = require('../controller/stock.controller.js');

router.get('/', controller.listStock);
router.get('/low/', controller.listLowStock);
router.post('/products/:id', controller.updateStockOfProduct);
router.post('/products/:id/restore', controller.restoreLastStockOfProduct);

module.exports = router;
