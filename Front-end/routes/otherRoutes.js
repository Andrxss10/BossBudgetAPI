// frontend/routes/otherRoutes.js
import express from 'express';
import { isAuthenticated, injectUserData } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas estas rutas requieren autenticación
router.get('/principal', isAuthenticated, injectUserData, async (req, res) => {
    try {
        // ✅ Datos del usuario ya vienen de injectUserData
        // ❌ ELIMINADO: Consultas directas a BD
        
        // Los presupuestos ahora los obtendrá el JavaScript del frontend
        // llamando a tu API del backend
        
        res.render('principal', {
            title: 'Dashboard Principal',
            user: res.locals.user,
            // Los presupuestos se cargarán via JavaScript
            presupuestos: [] // Vacío, se llenará con API call
        });
        
    } catch (error) {
        console.error('Error en principal:', error);
        res.redirect('/?alert=true&title=Error&message=Error al cargar el dashboard&icon=error');
    }
});

router.get('/Reportes', isAuthenticated, injectUserData, (req, res) => {
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true
    } : {};
    
    res.render('Reportes', {
        ...alertData,
        title: 'Reportes',
        user: res.locals.user
    });
});

router.get('/registroCredito', isAuthenticated, injectUserData, (req, res) => {
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true
    } : {};
    
    res.render('registroCredito', {
        ...alertData,
        title: 'Registro de Créditos',
        user: res.locals.user
    });
});

router.get('/TiposRecordatorios', isAuthenticated, injectUserData, (req, res) => {
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true
    } : {};
    
    res.render('TiposRecordatorios', {
        ...alertData,
        title: 'Tipos de Recordatorios',
        user: res.locals.user
    });
});

router.get('/RecuperarContraseña', isAuthenticated, injectUserData, (req, res) => {
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true
    } : {};
    
    res.render('RecuperarContraseña', {
        ...alertData,
        title: 'Recuperar Contraseña',
        user: res.locals.user
    });
});

router.get('/cuenta', isAuthenticated, injectUserData, (req, res) => {
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true
    } : {};
    
    res.render('cuenta', {
        ...alertData,
        title: 'Mi Cuenta',
        user: res.locals.user,
        // ✅ Los datos del usuario ya vienen de res.locals.user
        // ❌ ELIMINADO: req.session.name, req.session.email, etc.
        moneda: "USD" // Esto podría venir de una API también
    });
});

export default router;