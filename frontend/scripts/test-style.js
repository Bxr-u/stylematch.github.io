// Test de Estilo Personal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Test de estilo personal cargado');
    // Verificar autenticación
     const user = checkAuth();
    if (!user) return;
    
    // Inicializar el test
    initStyleTest();
});

const styleTestQuestions = [
    {
        id: 1,
        question: "¿Cómo describirías tu estilo personal?",
        description: "Selecciona la opción que mejor represente tu forma de vestir",
        type: "single",
        options: [
            {
                id: "style_1",
                text: "Clásico y Elegante",
                description: "Prendas atemporales, siluetas estructuradas, colores neutros",
                icon: "👔",
                style: "clasico"
            },
            {
                id: "style_2", 
                text: "Moderno y Minimalista",
                description: "Líneas limpias, colores sólidos, sin muchos accesorios",
                icon: "🕴️",
                style: "moderno"
            },
            {
                id: "style_3",
                text: "Bohemio y Relajado",
                description: "Telas fluidas, estampados, accesorios naturales",
                icon: "🌿",
                style: "bohemio"
            },
            {
                id: "style_4",
                text: "Deportivo y Cómodo",
                description: "Ropa funcional, tejidos cómodos, calzado deportivo",
                icon: "👟",
                style: "deportivo"
            },
            {
                id: "style_5",
                text: "Atrevido y Creativo",
                description: "Mezcla de patrones, colores vibrantes, piezas únicas",
                icon: "🎭",
                style: "creativo"
            }
        ]
    },
    {
        id: 2,
        question: "¿Qué tipo de prendas usas más frecuentemente?",
        description: "Selecciona todas las opciones que apliquen",
        type: "multiple",
        options: [
            {
                id: "garment_1",
                text: "Vestidos",
                description: "Para ocasiones especiales o diario",
                icon: "👗"
            },
            {
                id: "garment_2",
                text: "Pantalones formales",
                description: "Para trabajo o eventos",
                icon: "👖"
            },
            {
                id: "garment_3", 
                text: "Faldas",
                description: "De diferentes largos y estilos",
                icon: "💃"
            },
            {
                id: "garment_4",
                text: "Jeans",
                description: "Básicos de tu guardarropa",
                icon: "👖"
            },
            {
                id: "garment_5",
                text: "Blusas/Camisas",
                description: "Desde básicas hasta estampadas",
                icon: "👚"
            },
            {
                id: "garment_6",
                text: "Suéteres/Cardigans",
                description: "Para capas y abrigo",
                icon: "🧥"
            }
        ]
    },
    {
        id: 3,
        question: "¿Qué colores predominan en tu guardarropa?",
        description: "Selecciona los colores que más usas",
        type: "multiple",
        options: [
            {
                id: "color_1",
                text: "Neutros",
                description: "Negro, blanco, gris, beige",
                color: "#2C2C2C"
            },
            {
                id: "color_2",
                text: "Colores tierra",
                description: "Marrón, verde oliva, terracota",
                color: "#8B5A2B"
            },
            {
                id: "color_3", 
                text: "Pasteles",
                description: "Rosa claro, azul cielo, lavanda",
                color: "#FFB6C1"
            },
            {
                id: "color_4",
                text: "Colores vibrantes",
                description: "Rojo, azul real, amarillo",
                color: "#FF6B6B"
            },
            {
                id: "color_5",
                text: "Joyería",
                description: "Esmeralda, zafiro, rubí",
                color: "#2E8B57"
            }
        ]
    },
    {
        id: 4,
        question: "¿En qué entorno pasas la mayor parte de tu tiempo?",
        description: "Esto ayuda a adaptar las recomendaciones a tu vida diaria",
        type: "single",
        options: [
            {
                id: "environment_1",
                text: "Oficina/Formal",
                description: "Trabajo en entorno corporativo",
                icon: "🏢"
            },
            {
                id: "environment_2", 
                text: "Casual/Creativo",
                description: "Estudio, trabajo desde casa, arte",
                icon: "🎨"
            },
            {
                id: "environment_3",
                text: "Activo/Deportivo",
                description: "Gimnasio, actividades al aire libre",
                icon: "⚽"
            },
            {
                id: "environment_4",
                text: "Social/Eventos",
                description: "Reuniones, fiestas, actividades sociales",
                icon: "🎉"
            }
        ]
    },
    {
        id: 5,
        question: "¿Cómo te gusta sentirte con tu ropa?",
        description: "La comodidad y confianza son clave",
        type: "single",
        options: [
            {
                id: "feeling_1",
                text: "Elegante y Pulido",
                description: "Bien arreglado y profesional",
                icon: "✨"
            },
            {
                id: "feeling_2", 
                text: "Cómodo y Relajado",
                description: "Sin restricciones, natural",
                icon: "😌"
            },
            {
                id: "feeling_3",
                text: "Creativo y Único",
                description: "Expresivo y diferente",
                icon: "🎨"
            },
            {
                id: "feeling_4",
                text: "Práctico y Funcional",
                description: "Listo para la acción",
                icon: "⚡"
            }
        ]
    },
    {
        id: 6,
        question: "¿Qué accesorios sueles usar?",
        description: "Selecciona todos los que uses regularmente",
        type: "multiple",
        options: [
            {
                id: "accessory_1",
                text: "Joyería fina",
                description: "Collares, aretes, pulseras delicadas",
                icon: "💎"
            },
            {
                id: "accessory_2", 
                text: "Joyería statement",
                description: "Piezas grandes y llamativas",
                icon: "🌟"
            },
            {
                id: "accessory_3",
                text: "Bufandas/Pañuelos",
                description: "Para el cuello o como accesorios",
                icon: "🧣"
            },
            {
                id: "accessory_4",
                text: "Gafas de sol",
                description: "Diferentes estilos y formas",
                icon: "🕶️"
            },
            {
                id: "accessory_5",
                text: "Bolsos/Mochilas",
                description: "Desde clutch hasta mochilas",
                icon: "👜"
            },
            {
                id: "accessory_6",
                text: "Relojes",
                description: "De pulsera o otros estilos",
                icon: "⌚"
            }
        ]
    }
];

let currentQuestionIndex = 0;
let userAnswers = {};

function initStyleTest() {
    // Cargar progreso guardado
    loadProgress();
    
    // Mostrar primera pregunta
    showQuestion(currentQuestionIndex);
    
    // Configurar navegación
    setupNavigation();
}

function loadProgress() {
    const savedProgress = localStorage.getItem('styleTestProgress');
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
    localStorage.setItem('styleTestProgress', JSON.stringify(progress));
}

function showQuestion(questionIndex) {
    const question = styleTestQuestions[questionIndex];
    if (!question) return;
    
    // Actualizar progreso
    updateProgress(questionIndex);
    
    // Actualizar pregunta
    document.getElementById('questionTitle').textContent = question.question;
    document.getElementById('questionDescription').textContent = question.description;
    
    // Mostrar opciones
    showOptions(question.options, question.type, questionIndex);
    
    // Actualizar navegación
    updateNavigation(questionIndex);
}

function updateProgress(questionIndex) {
    const progress = ((questionIndex + 1) / styleTestQuestions.length) * 100;
    const progressText = `Pregunta ${questionIndex + 1} de ${styleTestQuestions.length}`;
    
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = progressText;
}

function showOptions(options, type, questionIndex) {
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    options.forEach(option => {
        const isSelected = userAnswers[`q${questionIndex + 1}`] && 
                          userAnswers[`q${questionIndex + 1}`].includes(option.id);
        
        const optionElement = document.createElement('div');
        optionElement.className = `option-card ${isSelected ? 'selected' : ''}`;
        optionElement.innerHTML = `
            <div class="option-content">
                ${option.color ? `<div class="color-option" style="background: ${option.color}"></div>` : ''}
                ${option.icon ? `<div class="option-icon">${option.icon}</div>` : ''}
                <div class="option-text">${option.text}</div>
                ${option.description ? `<div class="option-description">${option.description}</div>` : ''}
            </div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(option.id, type, questionIndex));
        container.appendChild(optionElement);
    });
}

function selectOption(optionId, type, questionIndex) {
    const questionKey = `q${questionIndex + 1}`;
    
    if (type === 'single') {
        // Para selección única
        userAnswers[questionKey] = [optionId];
        
        // Actualizar UI
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.option-card').classList.add('selected');
        
    } else if (type === 'multiple') {
        // Para selección múltiple
        if (!userAnswers[questionKey]) {
            userAnswers[questionKey] = [];
        }
        
        const index = userAnswers[questionKey].indexOf(optionId);
        if (index === -1) {
            userAnswers[questionKey].push(optionId);
            event.target.closest('.option-card').classList.add('selected');
        } else {
            userAnswers[questionKey].splice(index, 1);
            event.target.closest('.option-card').classList.remove('selected');
        }
    }
    
    // Habilitar botón siguiente si hay al menos una respuesta
    const hasAnswer = userAnswers[questionKey] && userAnswers[questionKey].length > 0;
    document.getElementById('nextBtn').disabled = !hasAnswer;
    
    saveProgress();
}

function updateNavigation(questionIndex) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Botón anterior
    prevBtn.disabled = questionIndex === 0;
    
    // Botón siguiente/submit
    const hasAnswer = userAnswers[`q${questionIndex + 1}`] && 
                     userAnswers[`q${questionIndex + 1}`].length > 0;
    
    if (questionIndex === styleTestQuestions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        submitBtn.disabled = !hasAnswer;
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        nextBtn.disabled = !hasAnswer;
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
        if (currentQuestionIndex < styleTestQuestions.length - 1) {
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
        const results = calculateStyleResults();
        
        // Guardar resultados
        localStorage.setItem('styleTestResults', JSON.stringify(results));
        localStorage.removeItem('styleTestProgress'); // Limpiar progreso
        
        // Redirigir a página de resultados
        window.location.href = 'result-style.html';
    }, 3000);
}

function calculateStyleResults() {
    const answers = userAnswers;
    let dominantStyle = 'Clásico';
    let styleScore = {
        'clasico': 0,
        'moderno': 0,
        'bohemio': 0,
        'deportivo': 0,
        'creativo': 0
    };
    
    // Analizar respuestas para determinar estilo dominante
    if (answers.q1 && answers.q1[0]) {
        const firstStyle = styleTestQuestions[0].options.find(opt => opt.id === answers.q1[0]);
        if (firstStyle && firstStyle.style) {
            styleScore[firstStyle.style] += 3;
        }
    }
    
    // Ponderar otras respuestas
    if (answers.q4 && answers.q4[0]) {
        const environment = styleTestQuestions[3].options.find(opt => opt.id === answers.q4[0]);
        if (environment) {
            // Ajustar score según entorno
            if (environment.text.includes('Oficina')) styleScore.clasico += 2;
            if (environment.text.includes('Casual')) styleScore.bohemio += 2;
            if (environment.text.includes('Activo')) styleScore.deportivo += 2;
            if (environment.text.includes('Social')) styleScore.creativo += 2;
        }
    }
    
    if (answers.q5 && answers.q5[0]) {
        const feeling = styleTestQuestions[4].options.find(opt => opt.id === answers.q5[0]);
        if (feeling) {
            // Ajustar score según feeling
            if (feeling.text.includes('Elegante')) styleScore.clasico += 2;
            if (feeling.text.includes('Cómodo')) styleScore.bohemio += 2;
            if (feeling.text.includes('Creativo')) styleScore.creativo += 2;
            if (feeling.text.includes('Práctico')) styleScore.deportivo += 2;
        }
    }
    
    // Encontrar estilo dominante
    let maxScore = 0;
    for (const [style, score] of Object.entries(styleScore)) {
        if (score > maxScore) {
            maxScore = score;
            dominantStyle = capitalizeFirst(style);
        }
    }
    
    return {
        dominantStyle: dominantStyle,
        styleScore: styleScore,
        recommendations: getStyleRecommendations(dominantStyle),
        answers: userAnswers,
        completedAt: new Date().toISOString()
    };
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getStyleRecommendations(style) {
    const recommendations = {
        'Clasico': [
            'Invierte en piezas atemporales de buena calidad',
            'Juega con accesorios para modernizar looks clásicos',
            'Mantén una paleta de colores neutra y elegante'
        ],
        'Moderno': [
            'Enfócate en siluetas limpias y estructuradas',
            'Experimenta con texturas interesantes',
            'Mantén la simplicidad en accesorios'
        ],
        'Bohemio': [
            'Mezcla telas fluidas con accesorios naturales',
            'Juega con estampados y capas',
            'Incorpora elementos artesanales y únicos'
        ],
        'Deportivo': [
            'Combina comodidad con estilo',
            'Invierte en calzado versátil y cómodo',
            'Usa capas para transiciones entre actividades'
        ],
        'Creativo': [
            'Experimenta con combinaciones inesperadas',
            'No temas mezclar patrones y texturas',
            'Busca piezas únicas que cuenten una historia'
        ]
    };
    
    return recommendations[style] || [
        'Enfócate en piezas que te hagan sentir auténtico/a',
        'Equilibra tendencias con tu comodidad personal',
        'Invierte en básicos de calidad'
    ];
}