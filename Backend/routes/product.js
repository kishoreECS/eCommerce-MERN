const express = require('express');
const { getProducts, createProduct, getById, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.get('/products', isAuthenticatedUser, getProducts);
router.post('/productCreate', isAuthenticatedUser, createProduct);
router.get('/product/:id', isAuthenticatedUser, getById);
router.put('/productUpdate/:id', isAuthenticatedUser, updateProduct);
router.delete('/productDelete/:id', isAuthenticatedUser, deleteProduct);

module.exports = router;
 