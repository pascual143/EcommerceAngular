const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// GET /api/products - Obtener todos los productos
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Obtener un producto específico
router.get('/:id', productController.getProductById);

// POST /api/products - Crear un nuevo producto (requiere autenticación de administrador)
router.post('/', productController.createProduct);

// PUT /api/products/:id - Actualizar un producto existente (requiere autenticación de administrador)
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id - Eliminar un producto (requiere autenticación de administrador)
router.delete('/:id', productController.deleteProduct);

module.exports = router;