const path = require('path');
const dotenv = require('dotenv');

// Carga manual de variables de entorno desde la raíz del backend
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('🧩 Variables de entorno cargadas:');
console.log('   JWT_SECRET:', process.env.JWT_SECRET || '❌ No encontrada');
console.log('   NODE_ENV:', process.env.NODE_ENV || '❌ No definida');
console.log('   Puerto:', process.env.PORT || 3000);

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 BossBudget API running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
