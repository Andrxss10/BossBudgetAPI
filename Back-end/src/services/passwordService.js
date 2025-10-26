const usuarioRepository = require('../repositories/usuarioRepository');
const passwordResetTokenRepository = require('../repositories/passwordResetTokenRepository');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER || 'bossbudgetproyect@gmail.com',
        pass: process.env.EMAIL_PASS || 'ipobxfavjakwqyge',
    },
});

class PasswordService {
    
    async solicitarRecuperacion(correo) {
        const usuario = await usuarioRepository.findByEmail(correo);
        if (!usuario) {
            throw new Error('No hay cuenta asociada a este correo');
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // 1 hora

        // Guardar token en la BD
        await passwordResetTokenRepository.create(
            usuario.NombreUsuario, 
            token, 
            expiresAt
        );

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        
        try {
            await transporter.sendMail({
                to: correo,
                subject: 'Recuperación de contraseña - BossBudget',
                html: `
                    <h2>Recuperación de Contraseña</h2>
                    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                    <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Restablecer Contraseña
                    </a>
                    <p>El enlace expira en 1 hora.</p>
                    <p>Si no solicitaste este cambio, ignora este mensaje.</p>
                `,
            });
        } catch (error) {
            console.error('Error enviando email:', error);
            throw new Error('Error al enviar el correo de recuperación');
        }

        return { 
            message: '¡Revisa tu correo para el enlace de recuperación!'
        };
    }

    async restablecerContraseña(token, nuevaContraseña) {
        if (!nuevaContraseña || nuevaContraseña.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        // Verificar token válido
        const tokenData = await passwordResetTokenRepository.findValidToken(token);
        if (!tokenData) {
            throw new Error('El token es inválido o ha expirado');
        }

        // Hashear nueva contraseña
        const contraseñaHasheada = await bcrypt.hash(nuevaContraseña, 10);

        // Actualizar contraseña del usuario
        const actualizado = await usuarioRepository.updatePassword(
            tokenData.nombreUsuario, 
            contraseñaHasheada
        );

        if (!actualizado) {
            throw new Error('Error al actualizar la contraseña');
        }

        // Eliminar token usado
        await passwordResetTokenRepository.delete(token);

        return { message: 'Contraseña actualizada correctamente' };
    }

    async verificarToken(token) {
        const tokenData = await passwordResetTokenRepository.findValidToken(token);
        return {
            valido: !!tokenData,
            nombreUsuario: tokenData?.nombreUsuario
        };
    }
}

module.exports = new PasswordService();