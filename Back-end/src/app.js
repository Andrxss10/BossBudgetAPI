// backend/src/app.js - REEMPLAZA con ESTE código
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rutas
const authRoutes = require('./routes/auth');
const presupuestosRoutes = require('./routes/presupuestos');
const gastosRoutes = require('./routes/gastos');
const ingresosRoutes = require('./routes/ingresos');
const passwordRoutes = require('./routes/password');

const app = express();

// REEMPLAZA tu configuración CORS actual con ESTA:
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// EN backend/src/app.js - AGREGA esto ANTES de las rutas
app.options('login', (req, res) => {
    console.log('🎯 Preflight OPTIONS request recibida');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.status(200).send();
});

// En backend/src/app.js, JUSTO DESPUÉS de app.use(cors(...))
app.use((req, res, next) => {
    console.log('🎯 CORS DEBUG - Headers que se enviarán:');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log('✅ Headers CORS configurados');
    next();
});

// ✅ 3. Middlewares básicos
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ 4. Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ 5. Logging para debug
app.use((req, res, next) => {
    console.log(`📍 ${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log(`🌐 Origin: ${req.headers.origin}`);
    next();
});

// ✅ 6. Health check (sin CORS issues)
app.get('/health', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json({ 
        status: 'OK', 
        message: 'BossBudget API is running',
        timestamp: new Date().toISOString()
    });
});

// ✅ 7. Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/presupuestos', presupuestosRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/ingresos', ingresosRoutes);
app.use('/api/password', passwordRoutes);

// ✅ 8. Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a BossBudget API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            presupuestos: '/api/presupuestos',
            health: '/health'
        }
    });
});

// ✅ 9. Manejo de errores
app.use((error, req, res, next) => {
    console.error('❌ Error:', error);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: error.message 
    });
});

/*// ✅ 10. 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Endpoint no encontrado',
        path: req.originalUrl
    });
});*/

module.exports = app;