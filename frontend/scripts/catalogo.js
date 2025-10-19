// Catálogo de Prendas JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Catálogo de prendas cargado');
    
    // Inicializar el catálogo
    initCatalogo();
});

// Datos de ejemplo de prendas (en producción vendrían de una API)
const prendasData = [
    {
        id: 1,
        nombre: "Blazer Clásico de Lana",
        descripcion: "Blazer estructurado en lana merino, perfecto para looks formales y casuales.",
        categoria: "superior",
        estilo: "clasico",
        colorimetria: "otonio",
        colores: ["#8B5A2B", "#2C2C2C", "#654321"],
        imagen: "👔",
        costurero: "María González",
        recomendada: true,
        tags: ["formal", "trabajo", "versatil"]
    },
    {
        id: 2,
        nombre: "Vestido Fluido Bohemio",
        descripcion: "Vestido midi con estampado floral y mangas abullonadas, ideal para eventos casuales.",
        categoria: "vestido",
        estilo: "bohemio",
        colorimetria: "primavera",
        colores: ["#FFB6C1", "#98FB98", "#DDA0DD"],
        imagen: "👗",
        costurero: "Ana Rodríguez",
        recomendada: true,
        tags: ["festival", "verano", "romantico"]
    },
    {
        id: 3,
        nombre: "Jeans Slim Elásticos",
        descripcion: "Jeans de corte slim con elastano para máxima comodidad y movimiento.",
        categoria: "inferior",
        estilo: "deportivo",
        colorimetria: "invierno",
        colores: ["#2C2C2C", "#696969", "#36454F"],
        imagen: "👖",
        costurero: "Juan Pérez",
        recomendada: false,
        tags: ["diario", "comodo", "basico"]
    },
    {
        id: 4,
        nombre: "Camisa Minimalista",
        descripcion: "Camisa de corte moderno en algodón orgánico, líneas limpias y acabados perfectos.",
        categoria: "superior",
        estilo: "moderno",
        colorimetria: "verano",
        colores: ["#F0F8FF", "#E6E6FA", "#FFFFFF"],
        imagen: "👕",
        costurero: "María González",
        recomendada: true,
        tags: ["oficina", "minimalista", "calidad"]
    },
    {
        id: 5,
        nombre: "Falda Plisada Creativa",
        descripcion: "Falda midi con pliegues asimétricos y combinación de texturas únicas.",
        categoria: "inferior",
        estilo: "creativo",
        colorimetria: "otonio",
        colores: ["#A52A2A", "#D2691E", "#8B4513"],
        imagen: "💃",
        costurero: "Ana Rodríguez",
        recomendada: true,
        tags: ["artistico", "statement", "unique"]
    },
    {
        id: 6,
        nombre: "Bolso Tote Estructurado",
        descripcion: "Bolso tote en cuero vegano con compartimentos organizados y diseño funcional.",
        categoria: "accesorio",
        estilo: "moderno",
        colorimetria: "invierno",
        colores: ["#2F4F4F", "#000000", "#36454F"],
        imagen: "👜",
        costurero: "María González",
        recomendada: false,
        tags: ["practico", "capacidad", "diario"]
    },
    {
        id: 7,
        nombre: "Sudadera Premium",
        descripcion: "Sudadera oversized en felpa de algodón, perfecta para estilo sporty-chic.",
        categoria: "superior",
        estilo: "deportivo",
        colorimetria: "primavera",
        colores: ["#FFD700", "#FFA07A", "#F0E68C"],
        imagen: "🧥",
        costurero: "Juan Pérez",
        recomendada: true,
        tags: ["comodo", "casual", "moda"]
    },
    {
        id: 8,
        nombre: "Conjunto Coordinado",
        descripcion: "Set de top y falda con estampado coordinado, ideal para looks put-together.",
        categoria: "vestido",
        estilo: "clasico",
        colorimetria: "verano",
        colores: ["#B19CD9", "#E6E6FA", "#C9A0DC"],
        imagen: "👚",
        costurero: "Ana Rodríguez",
        recomendada: false,
        tags: ["conjunto", "elegante", "facil"]
    }
];

let filteredPrendas = [];
let currentFilters = {
    category: 'all',
    style: 'all',
    color: 'all'
};

function initCatalogo() {
    // Cargar prendas
    loadPrendas();
    
    // Configurar filtros
    setupFilters();
    
    // Configurar modal
    setupModal();
}

function loadPrendas() {
    // Mostrar estado de carga
    showLoadingState();
    
    // Simular carga de datos (en producción sería una llamada a API)
    setTimeout(() => {
        // Aplicar recomendaciones personalizadas si existen
        applyPersonalizedRecommendations();
        
        // Mostrar prendas
        displayPrendas(prendasData);
        filteredPrendas = [...prendasData];
        
        // Actualizar contador
        updateResultsCount(prendasData.length);
        
        // Ocultar loading
        hideLoadingState();
    }, 1000);
}

function applyPersonalizedRecommendations() {
    // Obtener resultados de tests del usuario
    const colorResults = JSON.parse(localStorage.getItem('colorTestResults'));
    const styleResults = JSON.parse(localStorage.getItem('styleTestResults'));
    
    if (colorResults || styleResults) {
        // Marcar prendas como recomendadas basado en los tests
        prendasData.forEach(prenda => {
            let isRecommended = false;
            
            // Recomendar basado en colorimetría
            if (colorResults && prenda.colorimetria === colorResults.season.toLowerCase().split(' ')[0]) {
                isRecommended = true;
            }
            
            // Recomendar basado en estilo
            if (styleResults && prenda.estilo === styleResults.dominantStyle.toLowerCase()) {
                isRecommended = true;
            }
            
            prenda.recomendada = isRecommended;
        });
        
        // Ordenar: recomendadas primero
        prendasData.sort((a, b) => b.recomendada - a.recomendada);
    }
}

function displayPrendas(prendas) {
    const grid = document.getElementById('prendasGrid');
    
    if (prendas.length === 0) {
        showEmptyState();
        return;
    }
    
    grid.innerHTML = '';
    
    prendas.forEach(prenda => {
        const prendaCard = createPrendaCard(prenda);
        grid.appendChild(prendaCard);
    });
    
    hideEmptyState();
}

function createPrendaCard(prenda) {
    const card = document.createElement('div');
    card.className = `prenda-card ${prenda.recomendada ? 'recomendada' : ''}`;
    card.innerHTML = `
        <div class="prenda-image">
            ${prenda.imagen}
            ${prenda.recomendada ? '<div class="recomendation-badge">⭐ Recomendada</div>' : ''}
        </div>
        <div class="prenda-content">
            <h3 class="prenda-title">${prenda.nombre}</h3>
            <p class="prenda-description">${prenda.descripcion}</p>
            
            <div class="prenda-meta">
                <span class="prenda-style">${getStyleDisplayName(prenda.estilo)}</span>
                <div class="prenda-color">
                    ${prenda.colores.map(color => `
                        <div class="color-dot" style="background: ${color}" title="${color}"></div>
                    `).join('')}
                </div>
            </div>
            
            <div class="prenda-costurero">
                <small>Por: ${prenda.costurero}</small>
            </div>
            
            <div class="prenda-actions">
                <button class="btn btn-primary btn-small ver-detalles" data-id="${prenda.id}">
                    Ver Detalles
                </button>
                <button class="btn btn-secondary btn-small contactar-costurero" data-costurero="${prenda.costurero}">
                    Contactar
                </button>
            </div>
        </div>
    `;
    
    // Agregar eventos
    card.querySelector('.ver-detalles').addEventListener('click', () => showPrendaDetails(prenda.id));
    card.querySelector('.contactar-costurero').addEventListener('click', () => contactCosturero(prenda.costurero));
    
    return card;
}

function getStyleDisplayName(style) {
    const styles = {
        'clasico': 'Clásico',
        'moderno': 'Moderno',
        'bohemio': 'Bohemio',
        'deportivo': 'Deportivo',
        'creativo': 'Creativo'
    };
    return styles[style] || style;
}

function setupFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const styleFilter = document.getElementById('styleFilter');
    const colorFilter = document.getElementById('colorFilter');
    const resetBtn = document.getElementById('resetFilters');
    
    // Event listeners para filtros
    categoryFilter.addEventListener('change', applyFilters);
    styleFilter.addEventListener('change', applyFilters);
    colorFilter.addEventListener('change', applyFilters);
    resetBtn.addEventListener('click', resetFilters);
}

function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const style = document.getElementById('styleFilter').value;
    const color = document.getElementById('colorFilter').value;
    
    currentFilters = { category, style, color };
    
    let filtered = [...prendasData];
    
    // Aplicar filtros
    if (category !== 'all') {
        filtered = filtered.filter(prenda => prenda.categoria === category);
    }
    
    if (style !== 'all') {
        filtered = filtered.filter(prenda => prenda.estilo === style);
    }
    
    if (color !== 'all') {
        filtered = filtered.filter(prenda => prenda.colorimetria === color);
    }
    
    filteredPrendas = filtered;
    displayPrendas(filtered);
    updateResultsCount(filtered.length);
}

function resetFilters() {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('styleFilter').value = 'all';
    document.getElementById('colorFilter').value = 'all';
    
    applyFilters();
}

function updateResultsCount(count) {
    const resultsText = count === 1 ? '1 prenda encontrada' : `${count} prendas encontradas`;
    document.getElementById('resultsCount').textContent = resultsText;
}

function setupModal() {
    const modal = document.getElementById('prendaModal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showPrendaDetails(prendaId) {
    const prenda = prendasData.find(p => p.id === prendaId);
    if (!prenda) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-prenda">
            <div class="modal-prenda-image">
                ${prenda.imagen}
                ${prenda.recomendada ? '<div class="recomendation-badge">⭐ Recomendada para ti</div>' : ''}
            </div>
            
            <div class="modal-prenda-content">
                <h2>${prenda.nombre}</h2>
                <p class="modal-description">${prenda.descripcion}</p>
                
                <div class="modal-details">
                    <div class="detail-item">
                        <strong>Categoría:</strong>
                        <span>${getCategoryDisplayName(prenda.categoria)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Estilo:</strong>
                        <span>${getStyleDisplayName(prenda.estilo)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Colorimetría:</strong>
                        <span>${getColorDisplayName(prenda.colorimetria)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Costurero:</strong>
                        <span>${prenda.costurero}</span>
                    </div>
                </div>
                
                <div class="modal-colors">
                    <h4>Colores disponibles:</h4>
                    <div class="colors-grid">
                        ${prenda.colores.map(color => `
                            <div class="color-option-modal" style="background: ${color}">
                                <span>${color}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-tags">
                    ${prenda.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="contactCosturero('${prenda.costurero}')">
                        📞 Contactar a ${prenda.costurero}
                    </button>
                    <button class="btn btn-secondary" onclick="addToFavorites(${prenda.id})">
                        💖 Guardar en Favoritos
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('prendaModal').style.display = 'block';
}

function getCategoryDisplayName(category) {
    const categories = {
        'superior': 'Prenda Superior',
        'inferior': 'Prenda Inferior',
        'vestido': 'Vestido',
        'accesorio': 'Accesorio'
    };
    return categories[category] || category;
}

function getColorDisplayName(color) {
    const colors = {
        'primavera': 'Primavera',
        'verano': 'Verano',
        'otonio': 'Otoño',
        'invierno': 'Invierno'
    };
    return colors[color] || color;
}

function contactCosturero(costureroName) {
    StyleMatch.showNotification(`Redirigiendo para contactar a ${costureroName}`, 'info');
    // En una implementación real, esto abriría WhatsApp, email, etc.
    setTimeout(() => {
        window.open(`https://wa.me/5212221234567?text=Hola ${costureroName}, me interesa una prenda de StyleMatch`, '_blank');
    }, 1000);
}

function addToFavorites(prendaId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(prendaId)) {
        favorites.push(prendaId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        StyleMatch.showNotification('Prenda agregada a favoritos', 'success');
    } else {
        StyleMatch.showNotification('Ya está en favoritos', 'info');
    }
}

// Estados de UI
function showLoadingState() {
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('prendasGrid').style.display = 'none';
}

function hideLoadingState() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('prendasGrid').style.display = 'grid';
}

function showEmptyState() {
    document.getElementById('emptyState').style.display = 'block';
    document.getElementById('prendasGrid').style.display = 'none';
}

function hideEmptyState() {
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('prendasGrid').style.display = 'grid';
}

// Agregar CSS adicional para el modal
const additionalStyles = `
    .recomendation-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--primary);
        color: var(--white);
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .prenda-card.recomendada {
        border: 2px solid var(--primary);
    }
    
    .modal-prenda {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
    }
    
    .modal-prenda-image {
        background: linear-gradient(45deg, var(--accent), var(--primary));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        color: var(--white);
        position: relative;
        min-height: 200px;
    }
    
    .modal-description {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .modal-details {
        display: grid;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--accent);
    }
    
    .modal-colors h4 {
        margin-bottom: 1rem;
        color: var(--secondary);
    }
    
    .colors-grid {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
    }
    
    .color-option-modal {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        border: 2px solid var(--accent);
        font-size: 0.9rem;
    }
    
    .color-option-modal::before {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: inherit;
    }
    
    .modal-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
    }
    
    .tag {
        background: var(--accent);
        color: var(--text);
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
        .modal-prenda {
            grid-template-columns: 1fr;
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .modal-actions .btn {
            width: 100%;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);