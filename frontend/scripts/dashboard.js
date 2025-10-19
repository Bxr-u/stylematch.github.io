// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard de StyleMatch cargado');
    
    // Simular datos del usuario
    loadUserData();
    
    // Inicializar componentes del dashboard
    initDashboard();
});

function loadUserData() {
    // En una implementación real, esto vendría de una API
    const userData = {
        name: 'Ana García',
        testsCompleted: 2,
        recommendations: 12,
        costureros: 5,
        colorPalette: ['#d4a574', '#8b5a2b', '#e6c9a8', '#fdf6e3']
    };
    
    // Actualizar la UI con los datos del usuario
    document.querySelector('.dashboard-header h1').textContent = `¡Hola, ${userData.name}!`;
    document.querySelector('.card-badge:nth-child(1)').textContent = `${userData.testsCompleted} completados`;
    document.querySelector('.card-badge:nth-child(2)').textContent = `${userData.recommendations} prendas`;
    document.querySelector('.card-badge:nth-child(3)').textContent = `${userData.costureros} disponibles`;
}

function initDashboard() {
    // Agregar interactividad a las cards
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return; // No hacer nada si se hace clic en un enlace
            
            const actionBtn = this.querySelector('.btn');
            if (actionBtn) {
                actionBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    actionBtn.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Actualizar progreso en tiempo real
    updateProgress();
}

function updateProgress() {
    // Simular actualización de progreso
    setTimeout(() => {
        const progressItems = document.querySelectorAll('.progress-item');
        progressItems.forEach((item, index) => {
            if (!item.classList.contains('completed')) {
                setTimeout(() => {
                    item.classList.add('completed');
                    item.querySelector('.status').textContent = '✅ Completado';
                }, index * 1000);
            }
        });
    }, 2000);
}

// Funciones del dashboard
const Dashboard = {
    loadRecommendations: function() {
        console.log('Cargando recomendaciones...');
        // Implementar llamada a API
    },
    
    updateAvatar: function(newColors) {
        console.log('Actualizando avatar con colores:', newColors);
        // Implementar actualización de avatar
    },
    
    markTestComplete: function(testType) {
        console.log(`Test ${testType} marcado como completo`);
        // Implementar lógica de completado
    }
};