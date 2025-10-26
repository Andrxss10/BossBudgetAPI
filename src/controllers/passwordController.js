const passwordService = require('../services/passwordService');

class PasswordController {
    
    // Solicitar recuperación de contraseña
    async solicitarRecuperacion(req, res) {
        try {
            const { email } = req.body;
            
            const resultado = await passwordService.solicitarRecuperacion(email);
            
            res.json({
                success: true,
                message: resultado.message
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }

    // Restablecer contraseña
    async restablecerContraseña(req, res) {
        try {
            const { token, password } = req.body;
            
            const resultado = await passwordService.restablecerContraseña(token, password);
            
            res.json({
                success: true,
                message: resultado.message
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }

    // Verificar token (opcional)
    async verificarToken(req, res) {
        try {
            const { token } = req.params;
            
            // En producción, verificarías en la BD
            const valido = token && token.length === 64; // Simulación
            
            res.json({
                success: true,
                valido: valido
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = new PasswordController();