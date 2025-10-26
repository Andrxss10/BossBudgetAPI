const express = require('express');
const router = express.Router();
const ingresoController = require('../controllers/ingresoController');
const authMiddleware = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Crear ingreso para un presupuesto específico
router.post('/presupuesto/:idPresupuesto', ingresoController.crearIngreso);

// Obtener ingresos de un presupuesto
router.get('/presupuesto/:idPresupuesto', ingresoController.obtenerIngresosPorPresupuesto);

// Obtener total de ingresos de un presupuesto
router.get('/presupuesto/:idPresupuesto/total', ingresoController.obtenerTotalIngresos);

// Obtener ingreso específico
router.get('/:id', ingresoController.obtenerIngreso);

// Actualizar ingreso
router.put('/:id', ingresoController.actualizarIngreso);

// Eliminar ingreso
router.delete('/:id', ingresoController.eliminarIngreso);

module.exports = router;