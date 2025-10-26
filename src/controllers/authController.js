const authService = require('../services/authService');

class AuthController {
    
    // Login
    async login(req, res) {
        try {
            const { email, pass } = req.body;
            const resultado = await authService.login(email, pass);
            
            res.json({
                success: true,
                message: 'Login exitoso',
                data: resultado
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            });
        }
    }

    // Registro
    async registrar(req, res) {
        try {
            const datosUsuario = {
                username: req.body.username,
                nombres: req.body.nom,
                apellidos: req.body.apell,
                password: req.body.pass,
                email: req.body.email,
                profesion: req.body.prof,
                nacimiento: req.body.nacimiento,
                expectativas: req.body.expec
            };

            const imagenNombre = req.file ? req.file.filename : null;
            
            const resultado = await authService.registrar(datosUsuario, imagenNombre);
            
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: resultado
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }

    // Obtener perfil (protegido)
    async obtenerPerfil(req, res) {
        try {
            const usuario = await authService.obtenerPerfil(req.user.correo);
            
            res.json({
                success: true,
                data: usuario
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            });
        }
    }

    // Logout (manejado en el frontend eliminando el token)
    async logout(req, res) {
        res.json({
            success: true,
            message: 'Sesión cerrada exitosamente'
        });
    }
}

module.exports = new AuthController();