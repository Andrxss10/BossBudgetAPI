const express = require('express');
const router = express.Router();
const presupuestoController = require('../controllers/presupuestoController');
const authMiddleware = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Crear presupuesto
router.post('/', presupuestoController.crearPresupuesto);

// Obtener presupuestos del usuario
router.get('/', presupuestoController.obtenerPresupuestosUsuario);

// Obtener presupuesto específico
router.get('/:id', presupuestoController.obtenerPresupuesto);

// Actualizar presupuesto
router.put('/:id', presupuestoController.actualizarPresupuesto);

// Eliminar presupuesto
router.delete('/:id', presupuestoController.eliminarPresupuesto);

module.exports = router;