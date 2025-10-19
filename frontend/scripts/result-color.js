// Resultados del Test de Colorimetría JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de resultados cargada');
    
    // Cargar y mostrar resultados
    loadAndDisplayResults();
});

function loadAndDisplayResults() {
    const results = JSON.parse(localStorage.getItem('colorTestResults'));
    
    if (!results) {
        // Si no hay resultados, redirigir al test
        StyleMatch.showNotification('No se encontraron resultados. Realiza el test primero.', 'error');
        setTimeout(() => {
            window.location.href = 'test-color.html';
        }, 2000);
        return;
    }
    
    // Mostrar resultados en la UI
    displayResults(results);
}

function displayResults(results) {
    // Mostrar temporada
    document.getElementById('seasonName').textContent = results.season;
    document.getElementById('seasonDescription').innerHTML = 
        `<p>${getSeasonDescription(results.season)}</p>`;
    
    // Mostrar paleta de colores
    displayColorPalette(results.palette);
    
    // Mostrar recomendaciones
    displayRecommendations(results.recommendations);
    
    // Actualizar progreso en el dashboard
    updateDashboardProgress();
}

function getSeasonDescription(season) {
    const descriptions = {
        'Primavera': 'Tus colores ideales son brillantes, cálidos y luminosos que complementan tu tono de piel dorado y cabello claro.',
        'Verano': 'Tus colores ideales son suaves, fríos y serenos que complementan tu tono de piel rosado y cabello cenizo.',
        'Otoño Cálido': 'Tus colores ideales son cálidos, terrosos y ricos que complementan tu tono de piel dorado y cabello castaño.',
        'Invierno': 'Tus colores ideales son intensos, fríos y contrastantes que complementan tu tono de piel azulado y cabello oscuro.'
    };
    
    return descriptions[season] || 'Tus colores ideales han sido calculados basados en tus características únicas.';
}

function displayColorPalette(palette) {
    const container = document.getElementById('colorPalette');
    container.innerHTML = '';
    
    palette.forEach((color, index) => {
        const colorItem = document.createElement('div');
        colorItem.className = 'color-item';
        colorItem.innerHTML = `
            <div class="color-swatch" style="background: ${color}"></div>
            <div class="color-name">${color.toUpperCase()}</div>
        `;
        container.appendChild(colorItem);
    });
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendationsGrid');
    container.innerHTML = '';
    
    recommendations.forEach((rec, index) => {
        const recCard = document.createElement('div');
        recCard.className = 'recommendation-card';
        recCard.innerHTML = `
            <h3>💡 ${rec}</h3>
            <p>${getRecommendationDescription(rec)}</p>
        `;
        container.appendChild(recCard);
    });
}

function getRecommendationDescription(recommendation) {
    const descriptions = {
        'Colores tierra y cálidos': 'Opta por tonos como beige, marrón, terracota y oliva que armonizan con tu paleta.',
        'Estampados étnicos': 'Los patrones tribales y étnicos complementan tu estilo cálido y terroso.',
        'Oro viejo y cobre': 'Los accesorios en estos metales cálidos realzarán tu belleza natural.',
        'Colores brillantes y cálidos': 'Elige tonos como coral, melocotón y amarillo dorado.',
        'Estampados florales': 'Los patrones florales suaves y delicados son perfectos para ti.',
        'Oro amarillo': 'Los accesorios en oro amarillo complementarán tu calidez natural.'
    };
    
    return descriptions[recommendation] || 'Esta recomendación se basa en tu análisis de colorimetría personal.';
}

function updateDashboardProgress() {
    // Actualizar el progreso del test de colorimetría como completado
    const dashboardProgress = JSON.parse(localStorage.getItem('dashboardProgress') || '{}');
    dashboardProgress.colorTest = {
        completed: true,
        completedAt: new Date().toISOString(),
        result: JSON.parse(localStorage.getItem('colorTestResults')).season
    };
    localStorage.setItem('dashboardProgress', JSON.stringify(dashboardProgress));
}