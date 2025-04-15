const express = require('express');
const router = express.Router();

// POST /api/orders - Crear un nuevo pedido (requiere autenticación de cliente)
router.post('/', (req, res) => {
  res.send('Crear un nuevo pedido (temporal)');
});

// GET /api/orders/me - Obtener los pedidos del usuario autenticado (requiere autenticación de cliente)
router.get('/me', (req, res) => {
  res.send('Listado de mis pedidos (temporal)');
});

// GET /api/orders/:id - Obtener un pedido específico (requiere autenticación de cliente o administrador)
router.get('/:id', (req, res) => {
  res.send(`Información del pedido con ID: ${req.params.id} (temporal)`);
});

// GET /api/orders - Listar todos los pedidos (solo para administradores)
router.get('/', (req, res) => {
  res.send('Listado de todos los pedidos (temporal)');
});

// PUT /api/orders/:id - Actualizar el estado de un pedido (requiere autenticación de administrador)
router.put('/:id', (req, res) => {
  res.send(`Actualizar el estado del pedido con ID: ${req.params.id} (temporal)`);
});

module.exports = router;