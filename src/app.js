const express = require('express');
const cors = require('cors');

// ✅ IMPORTAR las rutas API que vamos a crear
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const presupuestoRoutes = require('./routes/presupuesto');
const creditosRoutes = require('./routes/creditos');
const gastosRoutes = require('./routes/gastos');
const ingresosRoutes = require('./routes/ingresos');

const app = express();

// Configuración de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ AQUÍ SE CONECTAN LAS RUTAS API
app.use('/api/auth', authRoutes);        // Ej: POST /api/auth/login
app.use('/api/users', userRoutes);       // Ej: GET /api/users/profile
app.use('/api/presupuesto', presupuestoRoutes);   // Ej: GET /api/budgets
app.use('/api/creditos', creditosRoutes);   // Ej: GET /api/credits
app.use('/api/gastos', gastosRoutes); // Ej: POST /api/expenses
app.use('/api/ingresos', ingresosRoutes);   // Ej: POST /api/incomes

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
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;