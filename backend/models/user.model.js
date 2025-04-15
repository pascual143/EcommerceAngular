const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nombre de usuario (único)
  password: { type: String, required: true }, // Contraseña (debería ser hasheada)
  email: { type: String, required: true, unique: true }, // Correo electrónico (único)
  firstName: { type: String }, // Nombre
  lastName: { type: String }, // Apellido
  address: { type: String }, // Dirección
  role: { type: String, enum: ['client', 'admin'], default: 'client' }, // Rol del usuario
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;