// API Service para StyleMatch
const apiService = {
    // RUTA ABSOLUTA CORRECTA
    baseUrl: 'http://localhost/stylematch/stylematch.github.io/backend/api',

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}/${endpoint}`;
        console.log('🔗 URL completa:', url);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            console.log('📡 Status:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const text = await response.text();
            console.log('📄 Respuesta:', text);
            
            // Si la respuesta está vacía, retornar objeto vacío
            if (!text.trim()) {
                return {};
            }
            
            let data;
            try {
                data = JSON.parse(text);
            } catch (parseError) {
                console.error('❌ JSON Parse Error. Respuesta:', text);
                throw new Error('El servidor no respondió con JSON válido');
            }
            
            return data;
        } catch (error) {
            console.error('💥 API Request Failed:', error);
            throw error;
        }
    },

    async register(userData) {
        console.log('📤 Registrando usuario:', userData);
        return this.request('register.php', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async login(credentials) {
        return this.request('login.php', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },
    // User endpoints
    async getUserProfile(userId) {
        return this.request(`users.php?id=${userId}`);
    },

    // Catalog endpoints
    async getPrendas() {
        return this.request('prendas.php');
    },

    async getCostureros() {
        return this.request('costureros.php');
    }
};

// Verificar que se cargó correctamente
console.log('apiService loaded successfully');