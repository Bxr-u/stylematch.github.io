// Directorio de Costureros - Versión Corregida
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 StyleMatch Costureros cargado');
    loadCostureros();
});

async function loadCostureros() {
    console.log('🔍 Cargando costureros...');
    showLoading();
    
    try {
        const response = await fetch('http://localhost/stylematch/stylematch.github.io/backend/api/costureros.php');
        
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const costureros = await response.json();
        console.log('✅ Costureros cargados:', costureros);
        
        if (costureros && costureros.length > 0) {
            displayCostureros(costureros);
            setupFilters(costureros);
        } else {
            showEmpty();
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
        showError('No se pudieron cargar los costureros: ' + error.message);
    }
}

function displayCostureros(costureros) {
    const grid = document.getElementById('costurerosGrid');
    const emptyState = document.getElementById('emptyState');
    const loadingState = document.getElementById('loadingState');
    
    if (!grid) {
        console.error('❌ No se encontró el elemento costurerosGrid');
        return;
    }
    
    // Ocultar estados
    if (loadingState) loadingState.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';
    
    // Mostrar grid
    grid.style.display = 'grid';
    
    // Generar HTML de las tarjetas
    grid.innerHTML = costureros.map(costurero => `
        <div class="costurero-card" style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div class="costurero-header" style="text-align: center; margin-bottom: 15px;">
                <div class="costurero-avatar" style="font-size: 3rem; margin-bottom: 10px;">${costurero.avatar || '🧵'}</div>
                <h3 style="color: #8b5a2b; margin: 5px 0;">${costurero.nombre}</h3>
                <p class="specialty" style="color: #666; margin: 0;">${costurero.especialidad}</p>
            </div>
            
            <div class="costurero-content">
                <div class="info" style="margin-bottom: 15px;">
                    <div class="info-item" style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                        <span>🏙️</span>
                        <span>${costurero.ciudad}</span>
                    </div>
                    <div class="info-item" style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                        <span>⏱️</span>
                        <span>${costurero.experiencia}</span>
                    </div>
                    <div class="info-item" style="display: flex; align-items: center; gap: 8px;">
                        <span>⭐</span>
                        <span>${costurero.rating}/5 (${costurero.proyectos} proyectos)</span>
                    </div>
                </div>
                
                <p class="description" style="color: #555; line-height: 1.4; margin-bottom: 15px;">${costurero.descripcion}</p>
                
                <button class="btn btn-primary" onclick="contactarCosturero('${costurero.telefono}', '${costurero.nombre}')" 
                        style="background: #d4a574; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 100%;">
                    📞 Contactar a ${costurero.nombre.split(' ')[0]}
                </button>
            </div>
        </div>
    `).join('');
    
    updateCount(costureros.length);
}

function setupFilters(allCostureros) {
    const cityFilter = document.getElementById('cityFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const searchInput = document.getElementById('searchInput');
    const resetBtn = document.getElementById('resetFilters');
    
    if (cityFilter) {
        cityFilter.addEventListener('change', () => applyFilters(allCostureros));
    }
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', () => applyFilters(allCostureros));
    }
    if (searchInput) {
        searchInput.addEventListener('input', () => applyFilters(allCostureros));
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', () => resetFilters(allCostureros));
    }
}

function applyFilters(allCostureros) {
    const city = document.getElementById('cityFilter')?.value || 'all';
    const specialty = document.getElementById('specialtyFilter')?.value || 'all';
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    let filtered = allCostureros;
    
    if (city !== 'all') {
        filtered = filtered.filter(c => c.ciudad.toLowerCase() === city);
    }
    
    if (specialty !== 'all') {
        filtered = filtered.filter(c => c.especialidad.toLowerCase().includes(specialty));
    }
    
    if (search) {
        filtered = filtered.filter(c => 
            c.nombre.toLowerCase().includes(search) ||
            c.especialidad.toLowerCase().includes(search) ||
            (c.descripcion && c.descripcion.toLowerCase().includes(search))
        );
    }
    
    displayCostureros(filtered);
}

function resetFilters(allCostureros) {
    document.getElementById('cityFilter').value = 'all';
    document.getElementById('specialtyFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    applyFilters(allCostureros);
}

function contactarCosturero(telefono, nombre) {
    const mensaje = `Hola ${nombre}, vi tu perfil en StyleMatch y me interesa tus servicios`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function updateCount(count) {
    const counter = document.getElementById('resultsCount');
    if (counter) {
        counter.textContent = count === 1 ? '1 costurero encontrado' : `${count} costureros encontrados`;
    }
}

function showLoading() {
    const loading = document.getElementById('loadingState');
    const grid = document.getElementById('costurerosGrid');
    const empty = document.getElementById('emptyState');
    
    if (loading) loading.style.display = 'block';
    if (grid) grid.style.display = 'none';
    if (empty) empty.style.display = 'none';
}

function hideLoading() {
    const loading = document.getElementById('loadingState');
    if (loading) loading.style.display = 'none';
}

function showEmpty() {
    const empty = document.getElementById('emptyState');
    const grid = document.getElementById('costurerosGrid');
    const loading = document.getElementById('loadingState');
    
    if (empty) empty.style.display = 'block';
    if (grid) grid.style.display = 'none';
    if (loading) loading.style.display = 'none';
}

function showError(message) {
    const empty = document.getElementById('emptyState');
    const grid = document.getElementById('costurerosGrid');
    const loading = document.getElementById('loadingState');
    
    if (empty) {
        empty.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">❌</div>
                <h3 style="color: #8b5a2b; margin-bottom: 10px;">Error al cargar</h3>
                <p style="color: #666; margin-bottom: 20px;">${message}</p>
                <button onclick="location.reload()" style="background: #d4a574; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    🔄 Recargar Página
                </button>
            </div>
        `;
        empty.style.display = 'block';
    }
    
    if (grid) grid.style.display = 'none';
    if (loading) loading.style.display = 'none';
}

// Hacer función global
window.contactarCosturero = contactarCosturero;