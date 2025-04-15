const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
  try {
    // Obtener el token del encabezado Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No autorizado, token no proporcionado' }); 
    }

    // Verificar el token
    const decoded = jwt.verify(token, 'aaeBok5er&d_..imceqEyN'); 

    // Buscar al usuario por el ID decodificado del token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'No autorizado, usuario no encontrado' }); 
    }

    // Agregar el objeto usuario a la petición para que esté disponible en las rutas protegidas
    req.user = user;
    next(); // Pasar al siguiente middleware o al controlador de la ruta
  } catch (error) {
    res.status(401).json({ message: 'No autorizado, token inválido' }); 
  }
};

module.exports = auth;