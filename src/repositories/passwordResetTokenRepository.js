const db = require('../config/database');

class PasswordResetTokenRepository {
    
    // Crear token de recuperación
    async create(nombreUsuario, token, expiresAt) {
        const [result] = await db.execute(
            'INSERT INTO password_reset_tokens (NombreUsuario, token, expires_at) VALUES (?, ?, ?)',
            [nombreUsuario, token, expiresAt]
        );
        
        return {
            id: result.insertId,
            nombreUsuario,
            token,
            expiresAt
        };
    }

    // Buscar token válido
    async findValidToken(token) {
        const [rows] = await db.execute(
            'SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at > NOW()',
            [token]
        );
        
        if (rows.length === 0) return null;
        
        return {
            id: rows[0].id,
            nombreUsuario: rows[0].NombreUsuario,
            token: rows[0].token,
            expiresAt: rows[0].expires_at
        };
    }

    // Eliminar token
    async delete(token) {
        const [result] = await db.execute(
            'DELETE FROM password_reset_tokens WHERE token = ?',
            [token]
        );
        
        return result.affectedRows > 0;
    }

    // Eliminar tokens expirados
    async deleteExpired() {
        const [result] = await db.execute(
            'DELETE FROM password_reset_tokens WHERE expires_at <= NOW()'
        );
        
        return result.affectedRows;
    }
}

module.exports = new PasswordResetTokenRepository();