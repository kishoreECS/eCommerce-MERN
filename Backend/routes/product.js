const express = require('express');
const { getProducts, createProduct, getById, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/products', getProducts);
router.post('/productCreate', createProduct);
router.get('/product/:id', getById);
router.put('/productUpdate/:id', updateProduct);
router.delete('/productDelete/:id', deleteProduct);

module.exports = router;
 