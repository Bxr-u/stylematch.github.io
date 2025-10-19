// Perfil de Usuario JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Perfil de usuario cargado');
    
    // Inicializar el perfil
    initProfile();
});

// Datos de ejemplo del usuario
const userProfile = {
    id: 1,
    nombre: "Ana García",
    email: "ana.garcia@email.com",
    telefono: "+52 222 123 4567",
    ciudad: "tlaxcala",
    bio: "Amante de la moda clásica con toques modernos. Me encanta experimentar con colores tierra y texturas interesantes.",
    avatar: "👤",
    preferencias: {
        estilos: ["classic", "bohemian"],
        notificaciones: {
            email: true,
            new_items: true,
            style_tips: false,
            costureros: true
        },
        privacidad: {
            profile_public: true,
            show_tests: false,
            contact_allow: true
        }
    },
    resultados: {
        colorimetria: {
            completado: true,
            resultado: "Otoño Cálido",
            fecha: "2024-03-15"
        },
        estilo: {
            completado: true,
            resultado: "Estilo Clásico",
            fecha: "2024-03-20"
        }
    },
    favoritos: {
        prendas: [
            {
                id: 1,
                nombre: "Blazer Clásico de Lana",
                categoria: "superior",
                costurero: "María González",
                fecha: "2024-03-18"
            },
            {
                id: 2,
                nombre: "Vestido Fluido Bohemio", 
                categoria: "vestido",
                costurero: "Ana Rodríguez",
                fecha: "2024-03-20"
            },
            {
                id: 4,
                nombre: "Camisa Minimalista",
                categoria: "superior",
                costurero: "María González",
                fecha: "2024-03-22"
            }
        ],
        costureros: [
            {
                id: 1,
                nombre: "María González",
                especialidad: "Vestidos de Noche",
                ciudad: "Tlaxcala",
                fecha: "2024-03-16"
            },
            {
                id: 3,
                nombre: "Ana Rodríguez",
                especialidad: "Trajes Tradicionales", 
                ciudad: "Huamantla",
                fecha: "2024-03-19"
            }
        ]
    }
};

function initProfile() {
    // Configurar navegación
    setupProfileNavigation();
    
    // Cargar datos del perfil
    loadProfileData();
    
    // Cargar secciones
    loadInformacionSection();
    loadPreferenciasSection();
    loadResultadosSection();
    loadFavoritosSection();
    
    // Configurar formularios
    setupForms();
    
    // Configurar modales
    setupModals();
}

function setupProfileNavigation() {
    const navLinks = document.querySelectorAll('.profile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar active al link clickeado
            this.classList.add('active');
            
            // Ocultar todas las secciones
            document.querySelectorAll('.profile-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar la sección correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function loadProfileData() {
    // Cargar avatar
    document.getElementById('userAvatar').textContent = userProfile.avatar;
    
    // Cargar información personal en el formulario
    document.getElementById('fullName').value = userProfile.nombre;
    document.getElementById('email').value = userProfile.email;
    document.getElementById('phone').value = userProfile.telefono;
    document.getElementById('city').value = userProfile.ciudad;
    document.getElementById('bio').value = userProfile.bio;
}

function loadInformacionSection() {
    // La información personal se carga en loadProfileData()
}

function loadPreferenciasSection() {
    // Cargar preferencias de estilo
    userProfile.preferencias.estilos.forEach(estilo => {
        const checkbox = document.querySelector(`input[name="style_prefs"][value="${estilo}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
    
    // Cargar preferencias de notificaciones
    Object.entries(userProfile.preferencias.notificaciones).forEach(([key, value]) => {
        const checkbox = document.querySelector(`input[name="notifications"][value="${key}"]`);
        if (checkbox) {
            checkbox.checked = value;
        }
    });
    
    // Cargar preferencias de privacidad
    Object.entries(userProfile.preferencias.privacidad).forEach(([key, value]) => {
        const checkbox = document.querySelector(`input[name="privacy"][value="${key}"]`);
        if (checkbox) {
            checkbox.checked = value;
        }
    });
}

function loadResultadosSection() {
    // Los resultados ya están cargados en el HTML estático
    // En una implementación real, se cargarían dinámicamente
}

function loadFavoritosSection() {
    // Configurar tabs de favoritos
    document.querySelectorAll('.fav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.fav-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.fav-tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + 'Fav').classList.add('active');
        });
    });
    
    // Cargar prendas favoritas
    loadPrendasFavoritas();
    
    // Cargar costureros favoritos
    loadCosturerosFavoritos();
}

function loadPrendasFavoritas() {
    const container = document.querySelector('#prendasFav .favorites-grid');
    
    if (userProfile.favoritos.prendas.length === 0) {
        showEmptyFavorites('prendas');
        return;
    }
    
    container.innerHTML = userProfile.favoritos.prendas.map(prenda => `
        <div class="favorite-item">
            <div class="favorite-icon">👗</div>
            <div class="favorite-info">
                <h4>${prenda.nombre}</h4>
                <p>${prenda.categoria} • ${prenda.costurero}</p>
                <small>Agregado: ${formatDate(prenda.fecha)}</small>
            </div>
            <div class="favorite-actions">
                <button class="btn-remove-favorite" onclick="removeFavorite('prenda', ${prenda.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function loadCosturerosFavoritos() {
    const container = document.querySelector('#costurerosFav .favorites-grid');
    
    if (userProfile.favoritos.costureros.length === 0) {
        showEmptyFavorites('costureros');
        return;
    }
    
    container.innerHTML = userProfile.favoritos.costureros.map(costurero => `
        <div class="favorite-item">
            <div class="favorite-icon">🧵</div>
            <div class="favorite-info">
                <h4>${costurero.nombre}</h4>
                <p>${costurero.especialidad} • ${costurero.ciudad}</p>
                <small>Agregado: ${formatDate(costurero.fecha)}</small>
            </div>
            <div class="favorite-actions">
                <button class="btn-remove-favorite" onclick="removeFavorite('costurero', ${costurero.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function setupForms() {
    // Formulario de información personal
    const personalInfoForm = document.getElementById('personalInfoForm');
    personalInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            nombre: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('phone').value,
            ciudad: document.getElementById('city').value,
            bio: document.getElementById('bio').value
        };
        
        // Aquí se enviaría la data a la API
        console.log('Actualizando perfil:', formData);
        StyleMatch.showNotification('Perfil actualizado exitosamente', 'success');
        
        // Actualizar datos locales
        Object.assign(userProfile, formData);
    });
    
    // Formulario de contraseña
    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            StyleMatch.showNotification('Las contraseñas no coinciden', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            StyleMatch.showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }
        
        // Aquí se enviaría la data a la API
        console.log('Cambiando contraseña');
        StyleMatch.showNotification('Contraseña cambiada exitosamente', 'success');
        passwordForm.reset();
    });
}

function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Configurar modal de avatar
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            const emoji = this.getAttribute('data-emoji');
            userProfile.avatar = emoji;
            document.getElementById('userAvatar').textContent = emoji;
            document.getElementById('avatarModal').style.display = 'none';
            StyleMatch.showNotification('Avatar actualizado', 'success');
        });
    });
}

// Funciones de acción
function changeAvatar() {
    document.getElementById('avatarModal').style.display = 'block';
}

function resetForm() {
    loadProfileData();
    StyleMatch.showNotification('Cambios descartados', 'info');
}

function savePreferences() {
    // Recopilar preferencias de estilo
    const stylePrefs = Array.from(document.querySelectorAll('input[name="style_prefs"]:checked'))
        .map(checkbox => checkbox.value);
    
    // Recopilar preferencias de notificaciones
    const notifications = {};
    document.querySelectorAll('input[name="notifications"]').forEach(checkbox => {
        notifications[checkbox.value] = checkbox.checked;
    });
    
    // Recopilar preferencias de privacidad
    const privacy = {};
    document.querySelectorAll('input[name="privacy"]').forEach(checkbox => {
        privacy[checkbox.value] = checkbox.checked;
    });
    
    // Actualizar datos locales
    userProfile.preferencias = {
        estilos: stylePrefs,
        notificaciones: notifications,
        privacidad: privacy
    };
    
    // Aquí se enviaría la data a la API
    console.log('Guardando preferencias:', userProfile.preferencias);
    StyleMatch.showNotification('Preferencias guardadas exitosamente', 'success');
}

function retakeTest(testType) {
    if (confirm(`¿Estás seguro de que quieres realizar nuevamente el test de ${testType === 'color' ? 'colorimetría' : 'estilo personal'}?`)) {
        if (testType === 'color') {
            window.location.href = 'test-color.html';
        } else {
            window.location.href = 'test-style.html';
        }
    }
}

function removeFavorite(type, id) {
    if (confirm(`¿Estás seguro de que quieres eliminar este ${type} de tus favoritos?`)) {
        if (type === 'prenda') {
            userProfile.favoritos.prendas = userProfile.favoritos.prendas.filter(p => p.id !== id);
            loadPrendasFavoritas();
        } else {
            userProfile.favoritos.costureros = userProfile.favoritos.costureros.filter(c => c.id !== id);
            loadCosturerosFavoritos();
        }
        StyleMatch.showNotification('Eliminado de favoritos', 'success');
    }
}

function showEmptyFavorites(type) {
    const emptyState = document.getElementById('emptyFavorites');
    const content = document.getElementById(type + 'Fav');
    
    if (content) {
        content.style.display = 'none';
    }
    emptyState.style.display = 'block';
}

function exportData() {
    if (confirm('¿Estás seguro de que quieres exportar todos tus datos? Se generará un archivo con tu información personal.')) {
        // Simular exportación de datos
        const dataStr = JSON.stringify(userProfile, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        // Crear enlace de descarga
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `stylematch-datos-${userProfile.nombre}-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        StyleMatch.showNotification('Datos exportados exitosamente', 'success');
    }
}

function deleteAccount() {
    if (confirm('¿ESTÁS ABSOLUTAMENTE SEGURO? Esta acción eliminará permanentemente tu cuenta y todos tus datos. Esta acción NO se puede deshacer.')) {
        if (confirm('¿REALMENTE estás seguro? Esta es tu última oportunidad para cancelar.')) {
            // Aquí se enviaría la solicitud de eliminación a la API
            console.log('Eliminando cuenta...');
            StyleMatch.showNotification('Cuenta eliminada. Serás redirigido...', 'error');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
}

// Funciones de utilidad
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}