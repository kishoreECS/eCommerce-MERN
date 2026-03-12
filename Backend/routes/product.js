const express = require('express');
const { getProducts, createProduct, getById, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/authenticate");

router.get('/products', isAuthenticatedUser, getProducts);
router.get('/product/:id', isAuthenticatedUser, getById);
router.put('/productUpdate/:id', isAuthenticatedUser, updateProduct);
router.delete('/productDelete/:id', isAuthenticatedUser, deleteProduct);

// Admin Routes 
router.post('/admin/productCreate', isAuthenticatedUser, authorizeRoles("admin"), createProduct);

module.exports = router;
 