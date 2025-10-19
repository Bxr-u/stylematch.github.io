// Test de Colorimetría JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Test de colorimetría cargado');
    
    // Inicializar el test
    initColorTest();
});

const colorTestQuestions = [
    {
        id: 1,
        question: "¿Cómo describes tu tono de piel?",
        description: "Selecciona la opción que mejor describa tu tono de piel natural",
        type: "single",
        options: [
            {
                id: "skin_1",
                text: "Muy claro",
                description: "Piel muy pálida, generalmente se quema fácilmente con el sol",
                icon: "👶"
            },
            {
                id: "skin_2", 
                text: "Claro",
                description: "Piel clara, puede broncearse ligeramente",
                icon: "👩"
            },
            {
                id: "skin_3",
                text: "Medio",
                description: "Piel morena clara, se broncea con facilidad",
                icon: "💁"
            },
            {
                id: "skin_4",
                text: "Oscuro",
                description: "Piel morena, rara vez se quema",
                icon: "🙋"
            },
            {
                id: "skin_5",
                text: "Muy oscuro",
                description: "Piel muy morena o negra, nunca se quema",
                icon: "🙆"
            }
        ]
    },
    {
        id: 2,
        question: "¿Tu piel tiene tonos cálidos (amarillentos/dorados) o fríos (rosados/azulados)?",
        description: "Observa las venas de tu muñeca bajo luz natural",
        type: "single",
        options: [
            {
                id: "undertone_1",
                text: "Cálidos",
                description: "Venas verdes, la plata no te favorece tanto como el oro",
                icon: "🌞",
                color: "#FFB347"
            },
            {
                id: "undertone_2",
                text: "Fríos", 
                description: "Venas azules/moradas, el oro no te favorece tanto como la plata",
                icon: "❄️",
                color: "#AEC6CF"
            },
            {
                id: "undertone_3",
                text: "Neutral",
                description: "Venas azul-verdosas, ambos metales te quedan bien",
                icon: "⚖️",
                color: "#B19CD9"
            }
        ]
    },
    {
        id: 3,
        question: "¿Cuál es el color natural de tu cabello?",
        description: "Selecciona el color que mejor coincida con tu cabello natural",
        type: "single",
        options: [
            {
                id: "hair_1",
                text: "Rubio claro",
                icon: "👱‍♀️",
                color: "#F5E6C8"
            },
            {
                id: "hair_2",
                text: "Rubio oscuro",
                icon: "👩",
                color: "#D2B48C"
            },
            {
                id: "hair_3", 
                text: "Castaño claro",
                icon: "💁",
                color: "#A52A2A"
            },
            {
                id: "hair_4",
                text: "Castaño oscuro",
                icon: "🙋",
                color: "#654321"
            },
            {
                id: "hair_5",
                text: "Negro",
                icon: "🙆",
                color: "#2C2C2C"
            },
            {
                id: "hair_6",
                text: "Pelirrojo",
                icon: "🧑‍🦰", 
                color: "#A52A2A"
            }
        ]
    }
    // Se pueden agregar más preguntas...
];

let currentQuestionIndex = 0;
let userAnswers = {};

function initColorTest() {
    // Cargar progreso guardado
    loadProgress();
    
    // Mostrar primera pregunta
    showQuestion(currentQuestionIndex);
    
    // Configurar navegación
    setupNavigation();
}

function loadProgress() {
    const savedProgress = localStorage.getItem('colorTestProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentQuestionIndex = progress.currentQuestion || 0;
        userAnswers = progress.answers || {};
    }
}

function saveProgress() {
    const progress = {
        currentQuestion: currentQuestionIndex,
        answers: userAnswers,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('colorTestProgress', JSON.stringify(progress));
}

function showQuestion(questionIndex) {
    const question = colorTestQuestions[questionIndex];
    if (!question) return;
    
    // Actualizar progreso
    updateProgress(questionIndex);
    
    // Actualizar pregunta
    document.getElementById('questionTitle').textContent = question.question;
    document.getElementById('questionDescription').textContent = question.description;
    
    // Mostrar opciones
    showOptions(question.options, question.type);
    
    // Actualizar navegación
    updateNavigation(questionIndex);
}

function updateProgress(questionIndex) {
    const progress = ((questionIndex + 1) / colorTestQuestions.length) * 100;
    const progressText = `Pregunta ${questionIndex + 1} de ${colorTestQuestions.length}`;
    
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = progressText;
}

function showOptions(options, type) {
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = `option-card ${userAnswers[option.id] ? 'selected' : ''}`;
        optionElement.innerHTML = `
            <div class="option-content">
                ${option.color ? `<div class="color-option" style="background: ${option.color}"></div>` : ''}
                ${option.icon ? `<div class="option-icon">${option.icon}</div>` : ''}
                <div class="option-text">${option.text}</div>
                ${option.description ? `<div class="option-description">${option.description}</div>` : ''}
            </div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(option.id, type));
        container.appendChild(optionElement);
    });
}

function selectOption(optionId, type) {
    if (type === 'single') {
        // Deseleccionar todas las opciones primero
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Seleccionar la nueva opción
        const selectedCard = document.querySelector(`.option-card .option-text`);
        if (selectedCard) {
            selectedCard.closest('.option-card').classList.add('selected');
        }
        
        userAnswers[`q${currentQuestionIndex + 1}`] = optionId;
    }
    
    // Habilitar botón siguiente
    document.getElementById('nextBtn').disabled = false;
    
    saveProgress();
}

function updateNavigation(questionIndex) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Botón anterior
    prevBtn.disabled = questionIndex === 0;
    
    // Botón siguiente/submit
    if (questionIndex === colorTestQuestions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        submitBtn.disabled = !userAnswers[`q${questionIndex + 1}`];
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        nextBtn.disabled = !userAnswers[`q${questionIndex + 1}`];
    }
}

function setupNavigation() {
    // Botón anterior
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });
    
    // Botón siguiente
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentQuestionIndex < colorTestQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });
    
    // Botón enviar
    document.getElementById('submitBtn').addEventListener('click', submitTest);
}

function submitTest() {
    // Mostrar pantalla de carga
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('loadingContainer').style.display = 'block';
    
    // Simular procesamiento
    setTimeout(() => {
        // Calcular resultados
        const results = calculateColorResults();
        
        // Guardar resultados
        localStorage.setItem('colorTestResults', JSON.stringify(results));
        localStorage.removeItem('colorTestProgress'); // Limpiar progreso
        
        // Redirigir a página de resultados
        window.location.href = 'result-color.html';
    }, 3000);
}

function calculateColorResults() {
    // Lógica simplificada para determinar temporada de color
    // En producción, esto sería más complejo
    
    const answers = userAnswers;
    let season = 'Otoño Cálido'; // Default
    
    // Lógica básica de determinación (simplificada)
    if (answers.q1 === 'skin_1' && answers.q2 === 'undertone_2') {
        season = 'Invierno';
    } else if (answers.q1 === 'skin_2' && answers.q2 === 'undertone_1') {
        season = 'Primavera';
    } else if (answers.q1 === 'skin_3' && answers.q2 === 'undertone_1') {
        season = 'Otoño Cálido';
    } else if (answers.q1 === 'skin_4' && answers.q2 === 'undertone_2') {
        season = 'Verano';
    }
    
    return {
        season: season,
        palette: getColorPalette(season),
        recommendations: getRecommendations(season),
        answers: userAnswers,
        completedAt: new Date().toISOString()
    };
}

function getColorPalette(season) {
    const palettes = {
        'Primavera': ['#FFD700', '#FFA07A', '#98FB98', '#87CEEB', '#DDA0DD'],
        'Verano': ['#F0F8FF', '#E6E6FA', '#B0E0E6', '#FFB6C1', '#D8BFD8'],
        'Otoño Cálido': ['#D4A574', '#8B5A2B', '#E6C9A8', '#5C3D1E', '#A0522D'],
        'Invierno': ['#2F4F4F', '#696969', '#B22222', '#4B0082', '#006400']
    };
    
    return palettes[season] || palettes['Otoño Cálido'];
}

function getRecommendations(season) {
    const recommendations = {
        'Primavera': ['Colores brillantes y cálidos', 'Estampados florales', 'Oro amarillo'],
        'Verano': ['Colores suaves y fríos', 'Estampados delicados', 'Plata y platino'],
        'Otoño Cálido': ['Colores tierra y cálidos', 'Estampados étnicos', 'Oro viejo y cobre'],
        'Invierno': ['Colores intensos y fríos', 'Estampados geométricos', 'Plata y diamantes']
    };
    
    return recommendations[season] || ['Colores tierra', 'Tonos cálidos', 'Oro viejo'];
}