const express = require('express');
const router = express.Router();

// GET /api/categories - Obtener todas las categorías
router.get('/', (req, res) => {
  res.send('Listado de todas las categorías (temporal)');
});

// GET /api/categories/:id - Obtener una categoría específica
router.get('/:id', (req, res) => {
  res.send(`Información de la categoría con ID: ${req.params.id} (temporal)`);
});

// POST /api/categories - Crear una nueva categoría (requiere autenticación de administrador)
router.post('/', (req, res) => {
  res.send('Crear una nueva categoría (temporal)');
});

// PUT /api/categories/:id - Actualizar una categoría existente (requiere autenticación de administrador)
router.put('/:id', (req, res) => {
  res.send(`Actualizar la categoría con ID: ${req.params.id} (temporal)`);
});

// DELETE /api/categories/:id - Eliminar una categoría (requiere autenticación de administrador)
router.delete('/:id', (req, res) => {
  res.send(`Eliminar la categoría con ID: ${req.params.id} (temporal)`);
});

module.exports = router;