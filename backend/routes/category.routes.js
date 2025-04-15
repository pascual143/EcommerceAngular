const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// GET /api/categories - Obtener todas las categorías (público)
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:id - Obtener una categoría específica (público)
router.get('/:id', categoryController.getCategoryById);

// POST /api/categories - Crear una nueva categoría (requiere autenticación y rol de administrador)
router.post('/', authMiddleware, adminMiddleware, categoryController.createCategory);

// PUT /api/categories/:id - Actualizar una categoría existente (requiere autenticación y rol de administrador)
router.put('/:id', authMiddleware, adminMiddleware, categoryController.updateCategory);

// DELETE /api/categories/:id - Eliminar una categoría (requiere autenticación y rol de administrador)
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.deleteCategory);

module.exports = router;