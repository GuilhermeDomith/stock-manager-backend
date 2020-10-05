const express = require('express');
const router = express.Router();
const controller = require('../controller/product.controller.js');

router.post('/', controller.insertProduct);
router.put('/:id', controller.updateProduct);
router.get('/', controller.listAllProducts);
router.get('/:id', controller.getProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
