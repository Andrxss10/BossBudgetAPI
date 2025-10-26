const express = require('express');
const cors = require('cors');

// ✅ IMPORTAR las rutas API que vamos a crear
const authRoutes = require('./routes/auth');
const presupuestosRoutes = require('./routes/presupuestos');
const gastosRoutes = require('./routes/gastos');
const ingresosRoutes = require('./routes/ingresos');
const passwordRoutes = require('./routes/password');
// const userRoutes = require('./routes/users');

const app = express();

// ✅ CONFIGURACIÓN CORS MÁS PERMISIVA
app.use(cors({
    origin: "*", // ← PERMITE TODOS LOS ORÍGENES
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Agrega esto JUSTO DESPUÉS de app.use(cors(...))
app.use((req, res, next) => {
    console.log('=== CORS DEBUG ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Origin:', req.headers.origin);
    console.log('==================');
    next();
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ AQUÍ SE CONECTAN LAS RUTAS API
app.use('/api/auth', authRoutes);        // Ej: POST /api/auth/login
app.use('/api/presupuestos', presupuestosRoutes);   // Ej: GET /api/presupuestos
app.use('/api/gastos', gastosRoutes); // Ej: POST /api/gastos
app.use('/api/ingresos', ingresosRoutes);   // Ej: POST /api/ingresos
app.use('/api/password', passwordRoutes);   // Ej: GET /api/password
// app.use('/api/users', userRoutes);       // Ej: GET /api/users/profile

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'BossBudget API is running'
    });
});

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a BossBudget API',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            budgets: '/api/budgets'
        }
    });
});

// 404 handler
/*app.all('*', (req, res) => {   // ← Usando app.all
    res.status(404).json({ error: 'Endpoint no encontrado' });
});*/

// Error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;