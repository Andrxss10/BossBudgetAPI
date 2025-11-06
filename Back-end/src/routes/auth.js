const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/auth'); // ✅ Import correcto
const multer = require('multer');

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Rutas públicas
router.post('/login', authController.login);
router.post('/registrar', upload.single('foto'), authController.registrar);

// ✅ Ruta /verify — validación de token
/*router.get('/verify', authMiddleware, async (req, res) => {
  try {
    console.log('🔍 Verificando token → Usuario:', req.user);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: req.user.userId || req.user.id,
          correo: req.user.correo,
          nombreUsuario: req.user.nombreUsuario,
          rol: req.user.rol
        }
      }
    });
  } catch (error) {
    console.error('❌ Error en /verify:', error.message);
    res.status(401).json({
      success: false,
      error: 'Token inválido o expirado'
    });
  }
});*/

// Rutas protegidas
router.get('/perfil', authMiddleware, authController.obtenerPerfil);
router.post('/logout', authController.logout);

module.exports = router;
