require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAuth() {
    try {
        console.log('🧪 Probando endpoints de autenticación...\n');

        // 1. Test de health check
        console.log('1. Probando health check...');
        const healthResponse = await axios.get(`${API_URL}/health`);
        console.log('✅ Health check:', healthResponse.data);

        // 2. Test de registro
        console.log('\n2. Probando registro...');
        const registroData = {
            username: 'testuser',
            nom: 'Test',
            apell: 'User',
            pass: '123456',
            email: 'test@test.com',
            prof: 'Tester',
            nacimiento: '1990-01-01',
            expec: 'Probando la API'
        };

        try {
            const registroResponse = await axios.post(`${API_URL}/auth/registrar`, registroData);
            console.log('✅ Registro exitoso:', registroResponse.data.message);
            console.log('   Token:', registroResponse.data.data.token.substring(0, 20) + '...');
        } catch (error) {
            if (error.response?.data?.error?.includes('ya está registrado')) {
                console.log('⚠️  Usuario ya existe, probando login...');
            } else {
                throw error;
            }
        }

        // 3. Test de login
        console.log('\n3. Probando login...');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: 'test@test.com',
            pass: '123456'
        });
        console.log('✅ Login exitoso:', loginResponse.data.message);
        const token = loginResponse.data.data.token;
        console.log('   Token:', token.substring(0, 20) + '...');

        // 4. Test de perfil (protegido)
        console.log('\n4. Probando perfil protegido...');
        const perfilResponse = await axios.get(`${API_URL}/auth/perfil`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Perfil obtenido:', perfilResponse.data.data.NombreUsuario);

        // 5. Test de logout
        console.log('\n5. Probando logout...');
        const logoutResponse = await axios.post(`${API_URL}/auth/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Logout:', logoutResponse.data.message);

        console.log('\n🎉 ¡Todos los tests pasaron!');

    } catch (error) {
        console.error('❌ Error en test:', error.response?.data || error.message);
    }
}

testAuth();