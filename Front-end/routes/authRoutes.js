// frontend/routes/authRoutes.js
import express from 'express';
import { redirectIfAuthenticated, injectUserData } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas públicas (no requieren autenticación)
router.get("/", redirectIfAuthenticated, (req, res) => {
    // Manejar alertas via query parameters en lugar de session
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true,
        timer: req.query.timer ? parseInt(req.query.timer) : undefined
    } : {};
    
    res.render("login", alertData);
});

// Ruta explícita para login (redirige a la principal)
router.get("/login", redirectIfAuthenticated, (req, res) => {
    res.redirect('/');
});

// Ruta para el formulario de registro
router.get("/Registro", redirectIfAuthenticated, (req, res) => {
    const alertData = req.query.alert ? {
        alert: true,
        alertTitle: req.query.title || 'Info',
        alertMessage: req.query.message || '',
        alertIcon: req.query.icon || 'info',
        showConfirmButton: true
    } : {};
    
    res.render("Registro", alertData);
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    // Limpiar token del frontend
    res.clearCookie('token');
    
    // Redirigir al login con mensaje de éxito
    res.redirect('/?alert=true&title=Sesión cerrada&message=Has cerrado sesión correctamente&icon=success');
});

export default router;