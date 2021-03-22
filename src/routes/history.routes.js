const express = require('express');
const router = express.Router();
const controller = require('../controller/history.controller.js');

router.get('/', controller.listAllHistory);
router.get('/products/:id', controller.listAllHistoryByProduct);
router.get('/products/:id/last', controller.getLastHistoryByProduct);
router.delete('/:id', controller.deleteById);
router.delete('/products/:id', controller.deleteAllByProduct);

module.exports = router;
