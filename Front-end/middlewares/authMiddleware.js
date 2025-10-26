// frontend/middleware/authMiddleware.js

// Middleware para verificar si el usuario está autenticado (JWT)
export const isAuthenticated = (req, res, next) => {
    // Verificar token en cookies
    const token = req.cookies?.token;
    
    if (token) {
        // Si hay token, permitir acceso
        // (La validación real del token la hace el backend en cada API call)
        return next();
    } else {
        // Redirigir al login si no hay token
        res.redirect('/login');
    }
};

// Middleware para redirigir usuarios ya autenticados
// (evita que vean login/registro si ya están logueados)
export const redirectIfAuthenticated = (req, res, next) => {
    const token = req.cookies?.token;
    
    if (token) {
        // Si ya está autenticado, redirigir al dashboard
        return res.redirect('/dashboard');
    }
    next();
};

// Opcional: Middleware para inyectar info del usuario en las vistas
export const injectUserData = (req, res, next) => {
    const token = req.cookies?.token;
    
    if (token) {
        // Podrías decodificar el token básicamente para obtener info del usuario
        // PERO la validación real siempre la hace el backend
        try {
            // Decodificación básica del JWT (sin verificar firma)
            const payload = JSON.parse(atob(token.split('.')[1]));
            res.locals.user = {
                id: payload.id,
                email: payload.email,
                nombre: payload.nombre
                // Agrega más campos según tu JWT
            };
        } catch (error) {
            // Si hay error decodificando, limpiar cookie inválida
            res.clearCookie('token');
        }
    } else {
        res.locals.user = null;
    }
    next();
};