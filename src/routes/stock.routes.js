const express = require('express');
const router = express.Router();
const controller = require('../controller/stock.controller.js');

router.post('/products/:id', controller.updateStockOfProduct);
router.post('/products/', controller.listStockOfProducts);

module.exports = router;
