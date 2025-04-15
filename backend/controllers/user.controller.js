const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para generar un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, 'TU_SECRETO_JWT', { expiresIn: '1h' });
};

// Registrar un nuevo usuario (sin cambios)
exports.register = async (req, res) => { /* ... */ };

// Iniciar sesión de un usuario (sin cambios)
exports.login = async (req, res) => { /* ... */ };

// Obtener la información del perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    // `req.user` ahora contiene la información del usuario autenticado gracias al middleware
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // Esto no debería ocurrir si el middleware funciona correctamente
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil del usuario', error: error.message });
  }
};

// Obtener la información de un usuario específico por ID (solo para administradores) (sin cambios por ahora)
exports.getUserById = async (req, res) => { /* ... */ };

// Actualizar el perfil del usuario autenticado
exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Utiliza el ID del usuario autenticado
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // Esto no debería ocurrir si el middleware funciona correctamente
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
};

// Actualizar la información de un usuario específico por ID (solo para administradores) (sin cambios por ahora)
exports.updateUser = async (req, res) => { /* ... */ };

// Listar todos los usuarios (solo para administradores) (sin cambios por ahora)
exports.getAllUsers = async (req, res) => { /* ... */ };