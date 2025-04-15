const express = require('express');
const router = express.Router();

// GET /api/products - Obtenre todos los productos
router.get('/', (req, res) => {
    res.send('Lsitdo de todos los productos')
});

// GET /api/products/:id - Obtener un producto específico
router.get('/:id', (req, res) => {
    res.send(`Información del product con ID: ${req.params.is} (temporal)`);
});

// POST /api/products - Crear un nuevo producto (requiere autenticación de administrador)
router.post('/', (req, res) => {
    res.send('Crear un nuevo producto (temporal)');
});

// PUT /api/products/:id - Actualizar un producto existente (requiere autenticación de administrador)
router.put('/:id', (req, res) => {
    res.send(`Actualizar el producto con ID: ${req.params.id} (temporal)`);
  });

// DELETE /api/products/:id - Eliminar un producto (requiere autenticación de administrador)
router.delete('/:id', (req, res) => {
  res.send(`Eliminar el producto con ID: ${req.params.id} (temporal)`);
});

module.exports = router;