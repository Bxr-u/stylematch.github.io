// Resultados del Test de Estilo Personal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de resultados de estilo cargada');
    // Verificar autenticación
     const user = checkAuth();
    if (!user) return;
    
    // Cargar y mostrar resultados
    loadAndDisplayResults();
});

function loadAndDisplayResults() {
    const results = JSON.parse(localStorage.getItem('styleTestResults'));
    
    if (!results) {
        // Si no hay resultados, redirigir al test
        StyleMatch.showNotification('No se encontraron resultados. Realiza el test primero.', 'error');
        setTimeout(() => {
            window.location.href = 'test-style.html';
        }, 2000);
        return;
    }
    
    // Mostrar resultados en la UI
    displayResults(results);
}

function displayResults(results) {
    // Mostrar estilo dominante
    document.getElementById('styleName').textContent = `Estilo ${results.dominantStyle}`;
    document.getElementById('styleDescription').innerHTML = 
        `<p>${getStyleDescription(results.dominantStyle)}</p>`;
    
    // Mostrar características del estilo
    displayStyleBreakdown(results.dominantStyle);
    
    // Mostrar recomendaciones
    displayRecommendations(results.recommendations);
    
    // Mostrar inspiración de outfits
    displayOutfitInspiration(results.dominantStyle);
    
    // Actualizar progreso en el dashboard
    updateDashboardProgress();
}

function getStyleDescription(style) {
    const descriptions = {
        'Clasico': 'Tu estilo se caracteriza por la elegancia atemporal, prendas bien estructuradas y una paleta de colores sofisticada. Valoras la calidad sobre la cantidad y prefieres piezas que perduren en el tiempo.',
        'Moderno': 'Tu estilo es minimalista y contemporáneo, con enfoque en líneas limpias, siluetas definidas y una paleta de colores neutra. Prefieres la funcionalidad y el diseño inteligente.',
        'Bohemio': 'Tu estilo es libre, artístico y conectado con la naturaleza. Te gustan las telas fluidas, los estampados únicos y los accesorios con historia. Tu guardarropa cuenta una historia personal.',
        'Deportivo': 'Tu estilo prioriza la comodidad y funcionalidad sin sacrificar el estilo. Combinas prendas activas con piezas casuales para un look moderno y práctico para tu vida en movimiento.',
        'Creativo': 'Tu estilo es expresivo, audaz y único. No temes experimentar con combinaciones inesperadas, colores vibrantes y piezas que reflejan tu personalidad artística.'
    };
    
    return descriptions[style] || 'Tu estilo es único y se adapta a diferentes situaciones. Valoras la autenticidad y la expresión personal a través de la moda.';
}

function displayStyleBreakdown(style) {
    const container = document.getElementById('breakdownGrid');
    container.innerHTML = '';
    
    const characteristics = getStyleCharacteristics(style);
    
    characteristics.forEach(char => {
        const charElement = document.createElement('div');
        charElement.className = 'characteristic-card';
        charElement.innerHTML = `
            <div class="char-icon">${char.icon}</div>
            <h3>${char.title}</h3>
            <p>${char.description}</p>
        `;
        container.appendChild(charElement);
    });
}

function getStyleCharacteristics(style) {
    const characteristics = {
        'Clasico': [
            {
                icon: '👔',
                title: 'Siluetas Estructuradas',
                description: 'Prendas con corte definido y proporciones equilibradas'
            },
            {
                icon: '🎨',
                title: 'Colores Neutros',
                description: 'Negro, blanco, beige, azul marino y gris'
            },
            {
                icon: '⏱️',
                title: 'Atemporal',
                description: 'Piezas que trascienden tendencias temporales'
            },
            {
                icon: '💎',
                title: 'Calidad Premium',
                description: 'Materiales duraderos y confección impecable'
            }
        ],
        'Moderno': [
            {
                icon: '📐',
                title: 'Líneas Limpias',
                description: 'Siluetas geométricas y minimalistas'
            },
            {
                icon: '🎯',
                title: 'Funcionalidad',
                description: 'Diseño inteligente y propósito claro'
            },
            {
                icon: '🌫️',
                title: 'Paleta Monocromática',
                description: 'Juegos de tonalidades en la misma familia'
            },
            {
                icon: '⚡',
                title: 'Innovación Textil',
                description: 'Materiales tecnológicos y sostenibles'
            }
        ],
        'Bohemio': [
            {
                icon: '🌊',
                title: 'Telas Fluidas',
                description: 'Seda, lino, algodón y materiales naturales'
            },
            {
                icon: '🎨',
                title: 'Estampados Únicos',
                description: 'Patrones étnicos, florales y artesanales'
            },
            {
                icon: '✨',
                title: 'Capas y Texturas',
                description: 'Superposición creativa de prendas'
            },
            {
                icon: '🌿',
                title: 'Accesorios Naturales',
                description: 'Madera, piedras, metales envejecidos'
            }
        ],
        'Deportivo': [
            {
                icon: '👟',
                title: 'Comodidad Primero',
                description: 'Tejidos elásticos y calzado funcional'
            },
            {
                icon: '🔄',
                title: 'Versatilidad',
                description: 'Transiciones fácil entre actividades'
            },
            {
                icon: '🌈',
                title: 'Colores Energéticos',
                description: 'Tonos vibrantes que reflejan dinamismo'
            },
            {
                icon: '🎒',
                title: 'Práctico y Funcional',
                description: 'Bolsillos, ajustes y características útiles'
            }
        ],
        'Creativo': [
            {
                icon: '🎭',
                title: 'Expresión Única',
                description: 'Combinaciones personales y arriesgadas'
            },
            {
                icon: '🔄',
                title: 'Mezcla Inesperada',
                description: 'Patrones, texturas y épocas diferentes'
            },
            {
                icon: '🎪',
                title: 'Colores Audaces',
                description: 'Combinaciones vibrantes y contrastantes'
            },
            {
                icon: '💫',
                title: 'Piezas Statement',
                description: 'Prendas que capturan la atención'
            }
        ]
    };
    
    return characteristics[style] || [
        {
            icon: '🌟',
            title: 'Autenticidad',
            description: 'Tu estilo refleja tu personalidad única'
        },
        {
            icon: '🔄',
            title: 'Versatilidad',
            description: 'Te adaptas a diferentes ocasiones'
        },
        {
            icon: '💡',
            title: 'Intuición',
            description: 'Sabes lo que te hace sentir bien'
        }
    ];
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendationsGrid');
    container.innerHTML = '';
    
    recommendations.forEach((rec, index) => {
        const recCard = document.createElement('div');
        recCard.className = 'recommendation-card';
        recCard.innerHTML = `
            <h3>💡 ${rec}</h3>
            <p>${getRecommendationContext(rec)}</p>
        `;
        container.appendChild(recCard);
    });
}

function getRecommendationContext(recommendation) {
    // Contexto adicional para cada recomendación
    const contexts = {
        'Invierte en piezas atemporales de buena calidad': 'Estas piezas serán el fundamento de tu guardarropa por años.',
        'Juega con accesorios para modernizar looks clásicos': 'Un bolso o zapatos contemporáneos pueden actualizar cualquier outfit.',
        'Mantén una paleta de colores neutra y elegante': 'Los neutros son versátiles y siempre lucen sofisticados.',
        'Enfócate en siluetas limpias y estructuradas': 'La simplicidad bien ejecutada siempre hace una declaración.',
        'Experimenta con texturas interesantes': 'Diferentes texturas añaden profundidad sin necesidad de color.',
        'Mezcla telas fluidas con accesorios naturales': 'Crea un balance entre comodidad y estilo.',
        'Juega con estampados y capas': 'Añade dimensión visual a tus outfits.',
        'Combina comodidad con estilo': 'No tienes que sacrificar uno por el otro.',
        'Experimenta con combinaciones inesperadas': 'La moda es sobre expresión personal.'
    };
    
    return contexts[recommendation] || 'Este consejo te ayudará a desarrollar aún más tu estilo personal.';
}

function displayOutfitInspiration(style) {
    const container = document.getElementById('outfitGrid');
    container.innerHTML = '';
    
    const outfits = getOutfitInspiration(style);
    
    outfits.forEach(outfit => {
        const outfitElement = document.createElement('div');
        outfitElement.className = 'outfit-card';
        outfitElement.innerHTML = `
            <div class="outfit-icon">${outfit.icon}</div>
            <h3>${outfit.occasion}</h3>
            <p>${outfit.description}</p>
            <div class="outfit-items">
                ${outfit.items.map(item => `<span class="outfit-item">${item}</span>`).join('')}
            </div>
        `;
        container.appendChild(outfitElement);
    });
}

function getOutfitInspiration(style) {
    const inspiration = {
        'Clasico': [
            {
                icon: '🏢',
                occasion: 'Oficina Elegante',
                description: 'Professional y sofisticado',
                items: ['Blazer estructurado', 'Pantalón de vestir', 'Camisa clásica', 'Zapatos de cuero']
            },
            {
                icon: '🍽️',
                occasion: 'Cena Formal',
                description: 'Atemporal y refinado',
                items: ['Vestido little black', 'Tacones elegantes', 'Joyeria discreta', 'Bolso clutch']
            }
        ],
        'Moderno': [
            {
                icon: '🏙️',
                occasion: 'Ciudad Contemporánea',
                description: 'Minimalista y funcional',
                items: ['Abrigo oversize', 'Jeans rectos', 'Top básico', 'Zapatos arquitectónicos']
            },
            {
                icon: '🎨',
                occasion: 'Galería de Arte',
                description: 'Moderno y conceptual',
                items: ['Conjunto monocromático', 'Zapatos de diseño', 'Bolso estructurado', 'Gafas modernas']
            }
        ],
        'Bohemio': [
            {
                icon: '🌅',
                occasion: 'Mercado Artesanal',
                description: 'Relajado y artistico',
                items: ['Vestido maxi estampado', 'Sandalias planas', 'Bolso de crochet', 'Sombrero de ala ancha']
            },
            {
                icon: '🎵',
                occasion: 'Festival al Aire Libre',
                description: 'Libre y expresivo',
                items: ['Falda midi fluida', 'Top crochet', 'Botas western', 'Joyeria tribal']
            }
        ],
        'Deportivo': [
            {
                icon: '🏃‍♀️',
                occasion: 'Día Activo',
                description: 'Funcional y cómodo',
                items: ['Leggings técnicos', 'Top deportivo', 'Zapatillas running', 'Mochila hidratación']
            },
            {
                icon: '☕',
                occasion: 'Brunch Casual',
                description: 'Deportivo elegante',
                items: ['Sudadera premium', 'Jeans elásticos', 'Tenis fashion', 'Gorra baseball']
            }
        ],
        'Creativo': [
            {
                icon: '🎪',
                occasion: 'Evento de Moda',
                description: 'Audaz y expresivo',
                items: ['Prenda statement', 'Zapatos esculturales', 'Accesorios artísticos', 'Maquillaje creativo']
            },
            {
                icon: '🎭',
                occasion: 'Noche en la Ciudad',
                description: 'Dramático y único',
                items: ['Combinación de patrones', 'Texturas contrastantes', 'Joyeria grande', 'Zapatos inesperados']
            }
        ]
    };
    
    return inspiration[style] || [
        {
            icon: '🌟',
            occasion: 'Ocasión Versátil',
            description: 'Adaptable y personal',
            items: ['Prenda favorita', 'Zapatos cómodos', 'Accesorio significativo', 'Toque personal']
        }
    ];
}

function updateDashboardProgress() {
    // Actualizar el progreso del test de estilo como completado
    const dashboardProgress = JSON.parse(localStorage.getItem('dashboardProgress') || '{}');
    dashboardProgress.styleTest = {
        completed: true,
        completedAt: new Date().toISOString(),
        result: JSON.parse(localStorage.getItem('styleTestResults')).dominantStyle
    };
    localStorage.setItem('dashboardProgress', JSON.stringify(dashboardProgress));
}