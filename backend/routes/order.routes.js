const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// POST /api/orders - Crear un nuevo pedido (requiere autenticación de cliente)
router.post('/', authMiddleware, orderController.createOrder);

// GET /api/orders/me - Obtener los pedidos del usuario autenticado (requiere autenticación de cliente)
router.get('/me', authMiddleware, orderController.getUserOrders);

// GET /api/orders/:id - Obtener un pedido específico (requiere autenticación)
router.get('/:id', authMiddleware, orderController.getOrderById);

// GET /api/orders - Listar todos los pedidos (requiere autenticación y rol de administrador)
router.get('/', authMiddleware, adminMiddleware, orderController.getAllOrders);

// PUT /api/orders/:id - Actualizar el estado de un pedido (requiere autenticación y rol de administrador)
router.put('/:id', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

module.exports = router;