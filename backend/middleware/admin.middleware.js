const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); // El usuario tiene el rol de administrador, permitir el acceso
    } else {
      return res.status(403).json({ message: 'No autorizado, se requiere rol de administrador' }); // 403 Forbidden
    }
  };
  
  module.exports = isAdmin;