const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

// Ruta pública para solicitar recuperación
router.post('/forgot-password', passwordController.solicitarRecuperacion);

// Ruta pública para restablecer contraseña
router.post('/reset-password', passwordController.restablecerContraseña);

// Ruta para verificar token (opcional)
router.get('/verify-token/:token', passwordController.verificarToken);

module.exports = router;