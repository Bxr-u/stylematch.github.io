// Directorio de Costureros JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Directorio de costureros cargado');
    
    // Inicializar el directorio
    initCostureros();
});

// Datos de ejemplo de costureros (en producción vendrían de una API)
const costurerosData = [
    {
        id: 1,
        nombre: "María González",
        especialidad: "Vestidos de Noche y Ropa Formal",
        experiencia: "15 años",
        telefono: "+52 222 123 4567",
        email: "maria.costurera@email.com",
        ciudad: "Tlaxcala",
        direccion: "Calle Reforma #123, Centro",
        descripcion: "Especialista en vestidos elegantes para ocasiones especiales. Trabajo con telas de alta calidad y atención personalizada a cada cliente.",
        avatar: "👩‍🦳",
        estilos: ["clasico", "elegante"],
        servicios: ["Vestidos de noche", "Trajes formales", "Alteraciones"],
        rating: 4.8,
        proyectos: 120,
        tiempoRespuesta: "2-4 horas",
        redes: {
            whatsapp: "+522221234567",
            facebook: "maria.costurera.tlax",
            instagram: "@maria_costura_elegante"
        }
    },
    {
        id: 2,
        nombre: "Juan Pérez",
        especialidad: "Ropa Casual y Deportiva",
        experiencia: "8 años",
        telefono: "+52 222 765 4321",
        email: "juan.moderno@email.com",
        ciudad: "Apizaco",
        direccion: "Av. Hidalgo #456",
        descripcion: "Creo ropa cómoda y moderna para el día a día. Especializado en prendas funcionales que combinan estilo y comodidad.",
        avatar: "👨‍💼",
        estilos: ["moderno", "deportivo"],
        servicios: ["Ropa casual", "Prendas deportivas", "Uniformes"],
        rating: 4.5,
        proyectos: 85,
        tiempoRespuesta: "1-2 horas",
        redes: {
            whatsapp: "+522227654321",
            facebook: "juan.moderno.apz",
            instagram: "@juan_estilo_moderno"
        }
    },
    {
        id: 3,
        nombre: "Ana Rodríguez",
        especialidad: "Trajes Tradicionales y Artesanales",
        experiencia: "20 años",
        telefono: "+52 222 555 8899",
        email: "ana.artesana@email.com",
        ciudad: "Huamantla",
        direccion: "Plaza Principal #789",
        descripcion: "Preservando las técnicas tradicionales de confección. Creo piezas únicas que cuentan la historia de nuestra cultura tlaxcalteca.",
        avatar: "👵",
        estilos: ["bohemio", "tradicional"],
        servicios: ["Trajes típicos", "Bordados artesanales", "Prendas únicas"],
        rating: 4.9,
        proyectos: 200,
        tiempoRespuesta: "4-6 horas",
        redes: {
            whatsapp: "+522225558899",
            facebook: "ana.artesania.tradicional",
            instagram: "@ana_arte_tradicional"
        }
    },
    {
        id: 4,
        nombre: "Carlos Martínez",
        especialidad: "Ropa Creativa y Avanzada",
        experiencia: "12 años",
        telefono: "+52 222 444 3322",
        email: "carlos.creativo@email.com",
        ciudad: "Tlaxcala",
        direccion: "Calle Juárez #321",
        descripcion: "Diseñador innovador que combina técnicas modernas con elementos vanguardistas. Especializado en piezas statement únicas.",
        avatar: "👨‍🎨",
        estilos: ["creativo", "moderno"],
        servicios: ["Diseño personalizado", "Prendas artísticas", "Consultoría de estilo"],
        rating: 4.7,
        proyectos: 95,
        tiempoRespuesta: "3-5 horas",
        redes: {
            whatsapp: "+522224443322",
            facebook: "carlos.diseno.creativo",
            instagram: "@carlos_creativo_design"
        }
    },
    {
        id: 5,
        nombre: "Laura Hernández",
        especialidad: "Vestidos de Novia y Etiqueta",
        experiencia: "18 años",
        telefono: "+52 222 777 1122",
        email: "laura.novias@email.com",
        ciudad: "Chiautempan",
        direccion: "Av. Independencia #654",
        descripcion: "Creo los vestidos de novia más soñados. Especialista en encajes, bordados y diseños personalizados para tu día especial.",
        avatar: "👰",
        estilos: ["clasico", "elegante"],
        servicios: ["Vestidos de novia", "Traje de etiqueta", "Accesorios nupciales"],
        rating: 4.9,
        proyectos: 150,
        tiempoRespuesta: "24-48 horas",
        redes: {
            whatsapp: "+522227771122",
            facebook: "laura.novias.chi",
            instagram: "@laura_novias_elegancia"
        }
    }
];

let filteredCostureros = [];
let currentFilters = {
    city: 'all',
    specialty: 'all',
    search: ''
};

function initCostureros() {
    // Cargar costureros
    loadCostureros();
    
    // Configurar filtros
    setupFilters();
    
    // Configurar modal
    setupModal();
}

function loadCostureros() {
    // Mostrar estado de carga
    showLoadingState();
    
    // Simular carga de datos
    setTimeout(() => {
        // Aplicar recomendaciones personalizadas si existen
        applyPersonalizedRecommendations();
        
        // Mostrar costureros
        displayCostureros(costurerosData);
        filteredCostureros = [...costurerosData];
        
        // Actualizar contador
        updateResultsCount(costurerosData.length);
        
        // Ocultar loading
        hideLoadingState();
    }, 1000);
}

function applyPersonalizedRecommendations() {
    // Obtener resultados de tests del usuario
    const styleResults = JSON.parse(localStorage.getItem('styleTestResults'));
    
    if (styleResults) {
        const userStyle = styleResults.dominantStyle.toLowerCase();
        
        // Marcar costureros como recomendados basado en el estilo
        costurerosData.forEach(costurero => {
            costurero.recomendado = costurero.estilos.includes(userStyle);
        });
        
        // Ordenar: recomendados primero
        costurerosData.sort((a, b) => b.recomendado - a.recomendado);
    }
}

function displayCostureros(costureros) {
    const grid = document.getElementById('costurerosGrid');
    
    if (costureros.length === 0) {
        showEmptyState();
        return;
    }
    
    grid.innerHTML = '';
    
    costureros.forEach(costurero => {
        const costureroCard = createCostureroCard(costurero);
        grid.appendChild(costureroCard);
    });
    
    hideEmptyState();
}

function createCostureroCard(costurero) {
    const card = document.createElement('div');
    card.className = `costurero-card ${costurero.recomendado ? 'recomendado' : ''}`;
    card.innerHTML = `
        <div class="costurero-header">
            <div class="costurero-avatar">
                ${costurero.avatar}
            </div>
            <h3 class="costurero-name">${costurero.nombre}</h3>
            <p class="costurero-specialty">${costurero.especialidad}</p>
            ${costurero.recomendado ? '<div class="recomendation-badge">⭐ Recomendado</div>' : ''}
        </div>
        
        <div class="costurero-content">
            <div class="costurero-info">
                <div class="info-item">
                    <i>🏙️</i>
                    <span>${costurero.ciudad}</span>
                </div>
                <div class="info-item">
                    <i>⏱️</i>
                    <span>${costurero.experiencia} de experiencia</span>
                </div>
                <div class="info-item">
                    <i>⭐</i>
                    <span>${costurero.rating}/5 (${costurero.proyectos} proyectos)</span>
                </div>
            </div>
            
            <p class="costurero-description">${costurero.descripcion}</p>
            
            <div class="costurero-stats">
                <div class="stat">
                    <span class="stat-number">${costurero.rating}</span>
                    <span class="stat-label">Rating</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${costurero.proyectos}</span>
                    <span class="stat-label">Proyectos</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${costurero.tiempoRespuesta}</span>
                    <span class="stat-label">Respuesta</span>
                </div>
            </div>
            
            <div class="costurero-actions">
                <button class="btn btn-primary btn-full contactar-btn" data-id="${costurero.id}">
                    Contactar
                </button>
                <button class="btn btn-secondary btn-full ver-detalles-btn" data-id="${costurero.id}">
                    Ver Perfil
                </button>
            </div>
        </div>
    `;
    
    // Agregar eventos
    card.querySelector('.contactar-btn').addEventListener('click', () => showContactModal(costurero.id));
    card.querySelector('.ver-detalles-btn').addEventListener('click', () => showCostureroDetails(costurero.id));
    
    return card;
}

function setupFilters() {
    const cityFilter = document.getElementById('cityFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const searchInput = document.getElementById('searchInput');
    const resetBtn = document.getElementById('resetFilters');
    const resetEmptyBtn = document.getElementById('resetEmptyFilters');
    
    // Event listeners para filtros
    cityFilter.addEventListener('change', applyFilters);
    specialtyFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
    resetBtn.addEventListener('click', resetFilters);
    
    if (resetEmptyBtn) {
        resetEmptyBtn.addEventListener('click', resetFilters);
    }
}

function applyFilters() {
    const city = document.getElementById('cityFilter').value;
    const specialty = document.getElementById('specialtyFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    currentFilters = { city, specialty, search };
    
    let filtered = [...costurerosData];
    
    // Aplicar filtros
    if (city !== 'all') {
        filtered = filtered.filter(costurero => costurero.ciudad.toLowerCase() === city);
    }
    
    if (specialty !== 'all') {
        filtered = filtered.filter(costurero => 
            costurero.especialidad.toLowerCase().includes(specialty) ||
            costurero.servicios.some(servicio => servicio.toLowerCase().includes(specialty))
        );
    }
    
    if (search) {
        filtered = filtered.filter(costurero => 
            costurero.nombre.toLowerCase().includes(search) ||
            costurero.especialidad.toLowerCase().includes(search) ||
            costurero.descripcion.toLowerCase().includes(search)
        );
    }
    
    filteredCostureros = filtered;
    displayCostureros(filtered);
    updateResultsCount(filtered.length);
}

function resetFilters() {
    document.getElementById('cityFilter').value = 'all';
    document.getElementById('specialtyFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    
    applyFilters();
}

function updateResultsCount(count) {
    const resultsText = count === 1 ? '1 costurero encontrado' : `${count} costureros encontrados`;
    document.getElementById('resultsCount').textContent = resultsText;
}

function setupModal() {
    const modal = document.getElementById('contactModal');
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

function showContactModal(costureroId) {
    const costurero = costurerosData.find(c => c.id === costureroId);
    if (!costurero) return;
    
    const modalBody = document.getElementById('contactModalBody');
    modalBody.innerHTML = `
        <div class="contact-modal-content">
            <div class="contact-header">
                <div class="contact-avatar">
                    ${costurero.avatar}
                </div>
                <h2>Contactar a ${costurero.nombre}</h2>
                <p>${costurero.especialidad}</p>
            </div>
            
            <div class="contact-body">
                <div class="contact-methods">
                    <a href="https://wa.me/${costurero.redes.whatsapp}?text=Hola ${costurero.nombre}, vi tu perfil en StyleMatch y me interesa tus servicios" 
                       class="contact-method" target="_blank">
                        <div class="method-icon">💬</div>
                        <div class="method-info">
                            <h4>WhatsApp</h4>
                            <p>Respuesta rápida: ${costurero.tiempoRespuesta}</p>
                        </div>
                    </a>
                    
                    <a href="tel:${costurero.telefono}" class="contact-method">
                        <div class="method-icon">📞</div>
                        <div class="method-info">
                            <h4>Llamada Telefónica</h4>
                            <p>${costurero.telefono}</p>
                        </div>
                    </a>
                    
                    <a href="mailto:${costurero.email}?subject=Consulta desde StyleMatch" class="contact-method">
                        <div class="method-icon">✉️</div>
                        <div class="method-info">
                            <h4>Correo Electrónico</h4>
                            <p>${costurero.email}</p>
                        </div>
                    </a>
                </div>
                
                <div class="contact-details">
                    <h4>Información de Contacto</h4>
                    <div class="detail-item">
                        <strong>Ubicación:</strong>
                        <span>${costurero.ciudad}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Experiencia:</strong>
                        <span>${costurero.experiencia}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Rating:</strong>
                        <span>${costurero.rating}/5 (${costurero.proyectos} proyectos)</span>
                    </div>
                    <div class="detail-item">
                        <strong>Servicios:</strong>
                        <span>${costurero.servicios.join(', ')}</span>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="window.open('https://wa.me/${costurero.redes.whatsapp}?text=Hola ${costurero.nombre}, vi tu perfil en StyleMatch y me interesa tus servicios', '_blank')">
                        💬 Contactar por WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contactModal').style.display = 'block';
}

function showCostureroDetails(costureroId) {
    const costurero = costurerosData.find(c => c.id === costureroId);
    if (!costurero) return;
    
    // Podría abrir una página de perfil detallado
    // Por ahora, mostramos el modal de contacto
    showContactModal(costureroId);
}

// Estados de UI
function showLoadingState() {
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('costurerosGrid').style.display = 'none';
}

function hideLoadingState() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('costurerosGrid').style.display = 'grid';
}

function showEmptyState() {
    document.getElementById('emptyState').style.display = 'block';
    document.getElementById('costurerosGrid').style.display = 'none';
    document.getElementById('loadingState').style.display = 'none';
}

function hideEmptyState() {
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('costurerosGrid').style.display = 'grid';
}

// Agregar CSS adicional para costureros
const additionalCosturerosStyles = `
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
    
    .costurero-card.recomendado {
        border: 2px solid var(--primary);
    }
    
    .costurero-header {
        position: relative;
    }
`;

// Inject additional styles
const costurerosStyleSheet = document.createElement('style');
costurerosStyleSheet.textContent = additionalCosturerosStyles;
document.head.appendChild(costurerosStyleSheet);