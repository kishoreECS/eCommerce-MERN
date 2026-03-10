const express = require('express');
const { getProducts, createProduct, getById, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/authenticate");

router.get('/products', isAuthenticatedUser, getProducts);
router.post('/productCreate', isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.get('/product/:id', isAuthenticatedUser, getById);
router.put('/productUpdate/:id', isAuthenticatedUser, updateProduct);
router.delete('/productDelete/:id', isAuthenticatedUser, deleteProduct);

module.exports = router;
 