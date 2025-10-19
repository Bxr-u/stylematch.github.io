// Tests JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de tests cargada');
    
    // Cargar progreso de tests
    loadTestProgress();
    
    // Inicializar interactividad
    initTests();
});

function loadTestProgress() {
    // Simular datos de progreso (en producción vendría de una API)
    const testProgress = {
        colorTest: {
            completed: false,
            progress: 0,
            result: null
        },
        styleTest: {
            completed: false,
            progress: 0,
            result: null
        }
    };
    
    // Actualizar UI con el progreso
    updateTestUI(testProgress);
}

function updateTestUI(progress) {
    // Actualizar test de colorimetría
    const colorTest = document.querySelector('.color-test');
    updateTestCard(colorTest, progress.colorTest);
    
    // Actualizar test de estilo
    const styleTest = document.querySelector('.style-test');
    updateTestCard(styleTest, progress.styleTest);
}

function updateTestCard(card, testData) {
    const progressFill = card.querySelector('.progress-fill');
    const progressText = card.querySelector('.progress-text');
    const startBtn = card.querySelector('.btn-primary');
    const resultBtn = card.querySelector('.btn-secondary');
    
    progressFill.style.width = `${testData.progress}%`;
    progressText.textContent = `${testData.progress}% completado`;
    
    if (testData.completed) {
        startBtn.style.display = 'none';
        resultBtn.style.display = 'block';
        progressText.textContent = '✅ Completado';
        progressFill.style.background = '#4CAF50';
    }
}

function initTests() {
    // Agregar eventos a los botones de test
    const testButtons = document.querySelectorAll('.test-actions .btn-primary');
    
    testButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Guardar qué test se está iniciando
            const testType = this.closest('.test-card').classList.contains('color-test') ? 'color' : 'style';
            localStorage.setItem('currentTest', testType);
            
            // Mostrar confirmación
            StyleMatch.showNotification(`Iniciando test de ${testType === 'color' ? 'colorimetría' : 'estilo personal'}`, 'info');
        });
    });
}

// Funciones de gestión de tests
const TestManager = {
    startTest: function(testType) {
        console.log(`Iniciando test: ${testType}`);
        // Redirigir a la página del test correspondiente
        window.location.href = `test-${testType}.html`;
    },
    
    saveProgress: function(testType, questionIndex, answers) {
        // Guardar progreso en localStorage (temporal)
        const progress = JSON.parse(localStorage.getItem('testProgress') || '{}');
        progress[testType] = {
            currentQuestion: questionIndex,
            answers: answers,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('testProgress', JSON.stringify(progress));
    },
    
    calculateResults: function(testType, answers) {
        console.log(`Calculando resultados para: ${testType}`, answers);
        // Lógica de cálculo de resultados (simplificada)
        return {
            season: 'Otoño cálido',
            palette: ['#d4a574', '#8b5a2b', '#e6c9a8', '#5c3d1e'],
            recommendations: ['Colores tierra', 'Tonos cálidos', 'Oro viejo']
        };
    }
};