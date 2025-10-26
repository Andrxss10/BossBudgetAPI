const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Rutas públicas
router.post('/login', authController.login);
router.post('/registrar', upload.single('foto'), authController.registrar);

// Rutas protegidas
router.get('/perfil', authMiddleware, authController.obtenerPerfil);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;