const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastoController');
const authMiddleware = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Crear gasto para un presupuesto específico
router.post('/presupuesto/:idPresupuesto', gastoController.crearGasto);

// Obtener gastos de un presupuesto
router.get('/presupuesto/:idPresupuesto', gastoController.obtenerGastosPorPresupuesto);

// Obtener gasto específico
router.get('/:id', gastoController.obtenerGasto);

// Actualizar gasto
router.put('/:id', gastoController.actualizarGasto);

// Eliminar gasto
router.delete('/:id', gastoController.eliminarGasto);

module.exports = router;