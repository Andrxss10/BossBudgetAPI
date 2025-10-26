// frontend/app.js
// SOLO librerías necesarias para el frontend
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de paths para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001; // Puerto diferente al backend

// ✅ MANTENER - Configurar EJS
app.set('view engine', 'ejs');

// ✅ MANTENER - Middleware para leer datos de formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ MANTENER - Servir archivos estáticos desde 'public'
app.use(express.static('public'));

// Configurar carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// ✅ MANTENER (pero transformadas) - Rutas de vistas
// Importar rutas del frontend (las crearemos después)
import otherRoutes from './routes/otherRoutes.js';
app.use('/', otherRoutes);

import authRoutes from './routes/authRoutes.js';
app.use('/', authRoutes);

import presupuestoRoutes from './routes/presupuestoRoutes.js';
app.use('/', presupuestoRoutes);

import gastosRoutes from './routes/gastosRoutes.js';
app.use('/', gastosRoutes);

import ingresosRoutes from './routes/ingresosRoutes.js';
app.use('/', ingresosRoutes);

import passRoutes from './routes/passRoutes.js';
app.use('/', passRoutes);

// Ruta de prueba para verificar que funciona
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Frontend funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor del frontend
app.listen(port, () => {
    console.log(`🎨 Frontend corriendo en http://localhost:${port}`);
    console.log(`✅ Health check: http://localhost:${port}/health`);
});