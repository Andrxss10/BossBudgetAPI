// frontend/routes/passRoutes.js
import express from 'express';
import { redirectIfAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

// -------------------------- VISTAS (SOLO RENDER) --------------------------

// Vista de olvidé contraseña
router.get('/forgot-password', redirectIfAuthenticated, (req, res) => {
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true
    } : {};
    
    res.render('forgot-password', {
        ...alertData,
        title: 'Recuperar Contraseña',
        error: null,
        success: null
    });
});

// Vista de resetear contraseña
router.get('/reset-password', redirectIfAuthenticated, (req, res) => {
    const { token } = req.query;
    
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true
    } : {};
    
    res.render('reset-password', {
        ...alertData,
        title: 'Restablecer Contraseña',
        token: token,
        error: null,
        success: null
    });
});

export default router;