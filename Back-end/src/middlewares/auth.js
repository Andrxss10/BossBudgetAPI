// back-end/src/middlewares/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clave_super_secreta';

// 🧩 Lista negra temporal (Set en memoria)
const tokenBlacklist = new Map();

/**
 * Middleware para verificar y validar el JWT
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token de acceso requerido'
      });
    }

    const token = authHeader.replace('Bearer ', '');

    // 🧱 1. Verificar si el token está en la lista negra
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({
        success: false,
        error: 'Token revocado. Inicie sesión nuevamente.'
      });
    }

    // 🧱 2. Verificar firma y expiración
    const decoded = jwt.verify(token, JWT_SECRET);

    // 🧱 3. Adjuntar datos del usuario a la request
    req.user = decoded;
    next();

  } catch (error) {
    console.error('❌ Error en authMiddleware:', error.message);
    res.status(401).json({
      success: false,
      error: 'Token inválido o expirado'
    });
  }
};

/**
 * Agrega un token a la blacklist (por ejemplo, al hacer logout)
 * Guarda su expiración para borrarlo automáticamente cuando ya no sea necesario.
 */
// back-end/src/middlewares/auth.js - Mejora la función
const revokeToken = async (token) => { // ✅ Hacerla async
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      console.log('⚠️ Token no válido para revocar');
      return;
    }

    // Guardamos su expiración (timestamp en ms)
    const expiry = decoded.exp * 1000;
    tokenBlacklist.set(token, expiry);

    // Limpieza automática
    setTimeout(() => {
      tokenBlacklist.delete(token);
      console.log('🧹 Token eliminado de blacklist por expiración');
    }, expiry - Date.now());
    
    console.log(`✅ Token revocado. Expira en: ${new Date(expiry).toLocaleString()}`);
    
  } catch (err) {
    console.error('❌ Error al revocar token:', err.message);
    throw err; // ✅ Propagar el error
  }
};

module.exports = { authMiddleware, revokeToken };
