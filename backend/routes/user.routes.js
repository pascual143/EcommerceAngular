const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware'); // Importa el middleware de administrador

// POST /api/users/register - Registrar un nuevo usuario
router.post('/register', userController.register);

// POST /api/users/login - Iniciar sesión de un usuario
router.post('/login', userController.login);

// GET /api/users/profile - Obtener la información del usuario autenticado (requiere autenticación)
router.get('/profile', authMiddleware, userController.getProfile);

// PUT /api/users/profile - Actualizar la información del usuario autenticado (requiere autenticación)
router.put('/profile', authMiddleware, userController.updateProfile);

// GET /api/users/:id - Obtener la información de un usuario específico (requiere autenticación y autorización de administrador)
router.get('/:id', authMiddleware, adminMiddleware, userController.getUserById);

// PUT /api/users/:id - Actualizar la información de un usuario específico (requiere autenticación y autorización de administrador)
router.put('/:id', authMiddleware, adminMiddleware, userController.updateUser);

// GET /api/users - Listar todos los usuarios (requiere autenticación y autorización de administrador)
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);

module.exports = router;