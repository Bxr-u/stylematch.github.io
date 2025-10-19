// Panel de Administración JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Panel de administración cargado');
    
    // Inicializar el panel de administración
    initAdminPanel();
});

// Datos de ejemplo (en producción vendrían de una API)
const adminData = {
    usuarios: [
        {
            id: 1,
            nombre: "Ana García",
            email: "ana.garcia@email.com",
            fechaRegistro: "2024-01-15",
            testsCompletados: 2,
            estado: "activo",
            ultimaConexion: "2024-03-20 14:30"
        },
        {
            id: 2,
            nombre: "Carlos López",
            email: "carlos.lopez@email.com",
            fechaRegistro: "2024-02-01",
            testsCompletados: 1,
            estado: "activo",
            ultimaConexion: "2024-03-19 10:15"
        },
        {
            id: 3,
            nombre: "María Rodríguez",
            email: "maria.rodriguez@email.com",
            fechaRegistro: "2024-01-20",
            testsCompletados: 0,
            estado: "inactivo",
            ultimaConexion: "2024-02-15 09:45"
        }
    ],
    costureros: [
        {
            id: 1,
            nombre: "María González",
            especialidad: "Vestidos de Noche",
            ciudad: "Tlaxcala",
            rating: 4.8,
            proyectos: 120,
            estado: "activo"
        },
        {
            id: 2,
            nombre: "Juan Pérez",
            especialidad: "Ropa Casual",
            ciudad: "Apizaco",
            rating: 4.5,
            proyectos: 85,
            estado: "activo"
        },
        {
            id: 3,
            nombre: "Ana Rodríguez",
            especialidad: "Trajes Tradicionales",
            ciudad: "Huamantla",
            rating: 4.9,
            proyectos: 200,
            estado: "activo"
        }
    ],
    prendas: [
        {
            id: 1,
            nombre: "Blazer Clásico de Lana",
            categoria: "superior",
            estilo: "clasico",
            colorimetria: "otonio",
            costurero: "María González",
            estado: "activa",
            recomendada: true
        },
        {
            id: 2,
            nombre: "Vestido Fluido Bohemio",
            categoria: "vestido",
            estilo: "bohemio",
            colorimetria: "primavera",
            costurero: "Ana Rodríguez",
            estado: "activa",
            recomendada: true
        },
        {
            id: 3,
            nombre: "Jeans Slim Elásticos",
            categoria: "inferior",
            estilo: "deportivo",
            colorimetria: "invierno",
            costurero: "Juan Pérez",
            estado: "activa",
            recomendada: false
        }
    ],
    preguntas: {
        colorimetria: [
            {
                id: 1,
                pregunta: "¿Cómo describes tu tono de piel?",
                orden: 1,
                opciones: [
                    { texto: "Muy claro", descripcion: "Piel muy pálida" },
                    { texto: "Claro", descripcion: "Piel clara" },
                    { texto: "Medio", descripcion: "Piel morena clara" },
                    { texto: "Oscuro", descripcion: "Piel morena" },
                    { texto: "Muy oscuro", descripcion: "Piel muy morena o negra" }
                ],
                activa: true
            },
            {
                id: 2,
                pregunta: "¿Tu piel tiene tonos cálidos o fríos?",
                orden: 2,
                opciones: [
                    { texto: "Cálidos", descripcion: "Venas verdes, plata no favorece" },
                    { texto: "Fríos", descripcion: "Venas azules, oro no favorece" },
                    { texto: "Neutral", descripcion: "Venas azul-verdosas" }
                ],
                activa: true
            }
        ],
        estilo: [
            {
                id: 1,
                pregunta: "¿Cómo describirías tu estilo personal?",
                orden: 1,
                opciones: [
                    { texto: "Clásico y Elegante", descripcion: "Prendas atemporales" },
                    { texto: "Moderno y Minimalista", descripcion: "Líneas limpias" },
                    { texto: "Bohemio y Relajado", descripcion: "Telas fluidas" },
                    { texto: "Deportivo y Cómodo", descripcion: "Ropa funcional" },
                    { texto: "Atrevido y Creativo", descripcion: "Mezcla de patrones" }
                ],
                activa: true
            }
        ]
    }
};

function initAdminPanel() {
    // Configurar navegación
    setupNavigation();
    
    // Cargar datos del dashboard
    loadDashboardData();
    
    // Cargar secciones
    loadUsuariosSection();
    loadCosturerosSection();
    loadPrendasSection();
    loadPreguntasSection();
    
    // Configurar modales
    setupModals();
    
    // Configurar formularios
    setupForms();
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar active al link clickeado
            this.classList.add('active');
            
            // Ocultar todas las secciones
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar la sección correspondiente
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

function loadDashboardData() {
    // Actualizar estadísticas
    document.getElementById('totalUsers').textContent = adminData.usuarios.length;
    document.getElementById('totalCostureros').textContent = adminData.costureros.length;
    document.getElementById('totalPrendas').textContent = adminData.prendas.length;
    document.getElementById('totalTests').textContent = adminData.usuarios.reduce((sum, user) => sum + user.testsCompletados, 0);
}

function loadUsuariosSection() {
    const tableBody = document.getElementById('usersTableBody');
    
    tableBody.innerHTML = adminData.usuarios.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>${formatDate(user.fechaRegistro)}</td>
            <td>${user.testsCompletados}</td>
            <td><span class="status-badge status-${user.estado}">${user.estado}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewUser(${user.id})">Ver</button>
                    <button class="btn-action btn-edit" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn-action btn-delete" onclick="deleteUser(${user.id})">Eliminar</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Configurar búsqueda
    document.getElementById('searchUsers').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = adminData.usuarios.filter(user => 
            user.nombre.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        
        tableBody.innerHTML = filteredUsers.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${formatDate(user.fechaRegistro)}</td>
                <td>${user.testsCompletados}</td>
                <td><span class="status-badge status-${user.estado}">${user.estado}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-view" onclick="viewUser(${user.id})">Ver</button>
                        <button class="btn-action btn-edit" onclick="editUser(${user.id})">Editar</button>
                        <button class="btn-action btn-delete" onclick="deleteUser(${user.id})">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join('');
    });
}

function loadCosturerosSection() {
    const tableBody = document.getElementById('costurerosTableBody');
    
    tableBody.innerHTML = adminData.costureros.map(costurero => `
        <tr>
            <td>${costurero.id}</td>
            <td>${costurero.nombre}</td>
            <td>${costurero.especialidad}</td>
            <td>${costurero.ciudad}</td>
            <td>${costurero.rating}/5</td>
            <td>${costurero.proyectos}</td>
            <td><span class="status-badge status-${costurero.estado}">${costurero.estado}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewCosturero(${costurero.id})">Ver</button>
                    <button class="btn-action btn-edit" onclick="editCosturero(${costurero.id})">Editar</button>
                    <button class="btn-action btn-delete" onclick="deleteCosturero(${costurero.id})">Eliminar</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Configurar búsqueda
    document.getElementById('searchCostureros').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCostureros = adminData.costureros.filter(costurero => 
            costurero.nombre.toLowerCase().includes(searchTerm) ||
            costurero.especialidad.toLowerCase().includes(searchTerm) ||
            costurero.ciudad.toLowerCase().includes(searchTerm)
        );
        
        tableBody.innerHTML = filteredCostureros.map(costurero => `
            <tr>
                <td>${costurero.id}</td>
                <td>${costurero.nombre}</td>
                <td>${costurero.especialidad}</td>
                <td>${costurero.ciudad}</td>
                <td>${costurero.rating}/5</td>
                <td>${costurero.proyectos}</td>
                <td><span class="status-badge status-${costurero.estado}">${costurero.estado}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-view" onclick="viewCosturero(${costurero.id})">Ver</button>
                        <button class="btn-action btn-edit" onclick="editCosturero(${costurero.id})">Editar</button>
                        <button class="btn-action btn-delete" onclick="deleteCosturero(${costurero.id})">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join('');
    });
}

function loadPrendasSection() {
    const grid = document.querySelector('.prendas-grid-admin');
    
    grid.innerHTML = adminData.prendas.map(prenda => `
        <div class="prenda-card-admin">
            <div class="prenda-header-admin">
                <h4 class="prenda-title-admin">${prenda.nombre}</h4>
                <span class="status-badge status-${prenda.estado}">${prenda.estado}</span>
            </div>
            
            <div class="prenda-meta-admin">
                <span class="meta-badge">${prenda.categoria}</span>
                <span class="meta-badge">${prenda.estilo}</span>
                <span class="meta-badge">${prenda.colorimetria}</span>
                ${prenda.recomendada ? '<span class="meta-badge" style="background: var(--primary); color: white;">Recomendada</span>' : ''}
            </div>
            
            <p><strong>Costurero:</strong> ${prenda.costurero}</p>
            
            <div class="action-buttons">
                <button class="btn-action btn-edit" onclick="editPrenda(${prenda.id})">Editar</button>
                <button class="btn-action btn-delete" onclick="deletePrenda(${prenda.id})">Eliminar</button>
                <button class="btn-action ${prenda.recomendada ? 'btn-delete' : 'btn-view'}" 
                        onclick="toggleRecomendada(${prenda.id})">
                    ${prenda.recomendada ? 'Quitar Recomendación' : 'Marcar Recomendada'}
                </button>
            </div>
        </div>
    `).join('');
    
    // Configurar filtros
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            let filteredPrendas = adminData.prendas;
            
            if (filter === 'recomendada') {
                filteredPrendas = filteredPrendas.filter(prenda => prenda.recomendada);
            } else if (filter === 'activa') {
                filteredPrendas = filteredPrendas.filter(prenda => prenda.estado === 'activa');
            } else if (filter === 'inactiva') {
                filteredPrendas = filteredPrendas.filter(prenda => prenda.estado === 'inactiva');
            }
            
            grid.innerHTML = filteredPrendas.map(prenda => `
                <div class="prenda-card-admin">
                    <div class="prenda-header-admin">
                        <h4 class="prenda-title-admin">${prenda.nombre}</h4>
                        <span class="status-badge status-${prenda.estado}">${prenda.estado}</span>
                    </div>
                    
                    <div class="prenda-meta-admin">
                        <span class="meta-badge">${prenda.categoria}</span>
                        <span class="meta-badge">${prenda.estilo}</span>
                        <span class="meta-badge">${prenda.colorimetria}</span>
                        ${prenda.recomendada ? '<span class="meta-badge" style="background: var(--primary); color: white;">Recomendada</span>' : ''}
                    </div>
                    
                    <p><strong>Costurero:</strong> ${prenda.costurero}</p>
                    
                    <div class="action-buttons">
                        <button class="btn-action btn-edit" onclick="editPrenda(${prenda.id})">Editar</button>
                        <button class="btn-action btn-delete" onclick="deletePrenda(${prenda.id})">Eliminar</button>
                        <button class="btn-action ${prenda.recomendada ? 'btn-delete' : 'btn-view'}" 
                                onclick="toggleRecomendada(${prenda.id})">
                            ${prenda.recomendada ? 'Quitar Recomendación' : 'Marcar Recomendada'}
                        </button>
                    </div>
                </div>
            `).join('');
        });
    });
}

function loadPreguntasSection() {
    // Configurar tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + 'Content').classList.add('active');
        });
    });
    
    // Cargar preguntas de colorimetría
    const colorList = document.getElementById('colorPreguntasList');
    colorList.innerHTML = adminData.preguntas.colorimetria.map(pregunta => `
        <div class="pregunta-item">
            <div class="pregunta-header">
                <h4 class="pregunta-text">${pregunta.pregunta}</h4>
                <span class="pregunta-orden">Orden: ${pregunta.orden}</span>
            </div>
            <div class="opciones-list">
                ${pregunta.opciones.map(opcion => `
                    <div class="opcion-item">
                        <strong>${opcion.texto}</strong>
                        ${opcion.descripcion ? ` - ${opcion.descripcion}` : ''}
                    </div>
                `).join('')}
            </div>
            <div class="action-buttons" style="margin-top: 1rem;">
                <button class="btn-action btn-edit" onclick="editPregunta(${pregunta.id}, 'colorimetria')">Editar</button>
                <button class="btn-action btn-delete" onclick="deletePregunta(${pregunta.id}, 'colorimetria')">Eliminar</button>
                <button class="btn-action ${pregunta.activa ? 'btn-delete' : 'btn-view'}" 
                        onclick="togglePregunta(${pregunta.id}, 'colorimetria')">
                    ${pregunta.activa ? 'Desactivar' : 'Activar'}
                </button>
            </div>
        </div>
    `).join('');
    
    // Cargar preguntas de estilo
    const styleList = document.getElementById('stylePreguntasList');
    styleList.innerHTML = adminData.preguntas.estilo.map(pregunta => `
        <div class="pregunta-item">
            <div class="pregunta-header">
                <h4 class="pregunta-text">${pregunta.pregunta}</h4>
                <span class="pregunta-orden">Orden: ${pregunta.orden}</span>
            </div>
            <div class="opciones-list">
                ${pregunta.opciones.map(opcion => `
                    <div class="opcion-item">
                        <strong>${opcion.texto}</strong>
                        ${opcion.descripcion ? ` - ${opcion.descripcion}` : ''}
                    </div>
                `).join('')}
            </div>
            <div class="action-buttons" style="margin-top: 1rem;">
                <button class="btn-action btn-edit" onclick="editPregunta(${pregunta.id}, 'estilo')">Editar</button>
                <button class="btn-action btn-delete" onclick="deletePregunta(${pregunta.id}, 'estilo')">Eliminar</button>
                <button class="btn-action ${pregunta.activa ? 'btn-delete' : 'btn-view'}" 
                        onclick="togglePregunta(${pregunta.id}, 'estilo')">
                    ${pregunta.activa ? 'Desactivar' : 'Activar'}
                </button>
            </div>
        </div>
    `).join('');
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
}

function setupForms() {
    // Formulario de preguntas
    const preguntaForm = document.getElementById('preguntaForm');
    const addOpcionBtn = document.getElementById('addOpcion');
    
    addOpcionBtn.addEventListener('click', function() {
        const container = document.getElementById('opcionesContainer');
        const opcionItem = document.createElement('div');
        opcionItem.className = 'opcion-item';
        opcionItem.innerHTML = `
            <input type="text" placeholder="Texto de la opción" class="opcion-text" required>
            <input type="text" placeholder="Descripción (opcional)" class="opcion-desc">
            <button type="button" class="btn-remove-opcion">🗑️</button>
        `;
        container.appendChild(opcionItem);
        
        // Agregar evento al botón de eliminar
        opcionItem.querySelector('.btn-remove-opcion').addEventListener('click', function() {
            if (container.children.length > 1) {
                opcionItem.remove();
            }
        });
    });
    
    preguntaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const tipo = document.getElementById('preguntaTipo').value;
        const orden = document.getElementById('preguntaOrden').value;
        const texto = document.getElementById('preguntaTexto').value;
        
        const opciones = Array.from(document.querySelectorAll('.opcion-item')).map(item => ({
            texto: item.querySelector('.opcion-text').value,
            descripcion: item.querySelector('.opcion-desc').value
        }));
        
        // Aquí se enviaría la data a la API
        console.log('Nueva pregunta:', { tipo, orden, texto, opciones });
        StyleMatch.showNotification('Pregunta guardada exitosamente', 'success');
        preguntaForm.reset();
        
        // Limpiar opciones excepto la primera
        const container = document.getElementById('opcionesContainer');
        while (container.children.length > 1) {
            container.lastChild.remove();
        }
    });
}

// Funciones de utilidad
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Funciones de acción (simuladas)
function viewUser(userId) {
    const user = adminData.usuarios.find(u => u.id === userId);
    if (!user) return;
    
    document.getElementById('userModalBody').innerHTML = `
        <h2>Detalles del Usuario</h2>
        <div class="user-details">
            <p><strong>Nombre:</strong> ${user.nombre}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Fecha de Registro:</strong> ${formatDate(user.fechaRegistro)}</p>
            <p><strong>Tests Completados:</strong> ${user.testsCompletados}</p>
            <p><strong>Estado:</strong> <span class="status-badge status-${user.estado}">${user.estado}</span></p>
            <p><strong>Última Conexión:</strong> ${user.ultimaConexion}</p>
        </div>
    `;
    
    document.getElementById('userModal').style.display = 'block';
}

function editUser(userId) {
    StyleMatch.showNotification(`Editando usuario ${userId}`, 'info');
}

function deleteUser(userId) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        StyleMatch.showNotification('Usuario eliminado', 'success');
    }
}

function viewCosturero(costureroId) {
    const costurero = adminData.costureros.find(c => c.id === costureroId);
    if (!costurero) return;
    
    document.getElementById('costureroModalBody').innerHTML = `
        <h2>Detalles del Costurero</h2>
        <div class="costurero-details">
            <p><strong>Nombre:</strong> ${costurero.nombre}</p>
            <p><strong>Especialidad:</strong> ${costurero.especialidad}</p>
            <p><strong>Ciudad:</strong> ${costurero.ciudad}</p>
            <p><strong>Rating:</strong> ${costurero.rating}/5</p>
            <p><strong>Proyectos Completados:</strong> ${costurero.proyectos}</p>
            <p><strong>Estado:</strong> <span class="status-badge status-${costurero.estado}">${costurero.estado}</span></p>
        </div>
    `;
    
    document.getElementById('costureroModal').style.display = 'block';
}

function editCosturero(costureroId) {
    StyleMatch.showNotification(`Editando costurero ${costureroId}`, 'info');
}

function deleteCosturero(costureroId) {
    if (confirm('¿Estás seguro de que quieres eliminar este costurero?')) {
        StyleMatch.showNotification('Costurero eliminado', 'success');
    }
}

function editPrenda(prendaId) {
    StyleMatch.showNotification(`Editando prenda ${prendaId}`, 'info');
}

function deletePrenda(prendaId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta prenda?')) {
        StyleMatch.showNotification('Prenda eliminada', 'success');
    }
}

function toggleRecomendada(prendaId) {
    StyleMatch.showNotification('Estado de recomendación actualizado', 'success');
}

function editPregunta(preguntaId, tipo) {
    StyleMatch.showNotification(`Editando pregunta ${preguntaId} de ${tipo}`, 'info');
}

function deletePregunta(preguntaId, tipo) {
    if (confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
        StyleMatch.showNotification('Pregunta eliminada', 'success');
    }
}

function togglePregunta(preguntaId, tipo) {
    StyleMatch.showNotification('Estado de pregunta actualizado', 'success');
}

function generateReport(type) {
    const output = document.getElementById('reportOutput');
    let reportContent = '';
    
    switch(type) {
        case 'users':
            reportContent = `
                <h3>Reporte de Usuarios</h3>
                <p><strong>Total de usuarios:</strong> ${adminData.usuarios.length}</p>
                <p><strong>Usuarios activos:</strong> ${adminData.usuarios.filter(u => u.estado === 'activo').length}</p>
                <p><strong>Tests completados en total:</strong> ${adminData.usuarios.reduce((sum, user) => sum + user.testsCompletados, 0)}</p>
                <p><strong>Fecha de generación:</strong> ${new Date().toLocaleString()}</p>
            `;
            break;
        case 'tests':
            reportContent = `
                <h3>Reporte de Tests</h3>
                <p><strong>Tests de colorimetría completados:</strong> ${adminData.usuarios.reduce((sum, user) => sum + user.testsCompletados, 0)}</p>
                <p><strong>Preguntas activas en tests:</strong> ${adminData.preguntas.colorimetria.length + adminData.preguntas.estilo.length}</p>
                <p><strong>Fecha de generación:</strong> ${new Date().toLocaleString()}</p>
            `;
            break;
        case 'costureros':
            reportContent = `
                <h3>Reporte de Costureros</h3>
                <p><strong>Total de costureros:</strong> ${adminData.costureros.length}</p>
                <p><strong>Rating promedio:</strong> ${(adminData.costureros.reduce((sum, c) => sum + c.rating, 0) / adminData.costureros.length).toFixed(1)}/5</p>
                <p><strong>Proyectos totales:</strong> ${adminData.costureros.reduce((sum, c) => sum + c.proyectos, 0)}</p>
                <p><strong>Fecha de generación:</strong> ${new Date().toLocaleString()}</p>
            `;
            break;
        case 'prendas':
            reportContent = `
                <h3>Reporte de Prendas</h3>
                <p><strong>Total de prendas:</strong> ${adminData.prendas.length}</p>
                <p><strong>Prendas recomendadas:</strong> ${adminData.prendas.filter(p => p.recomendada).length}</p>
                <p><strong>Prendas activas:</strong> ${adminData.prendas.filter(p => p.estado === 'activa').length}</p>
                <p><strong>Fecha de generación:</strong> ${new Date().toLocaleString()}</p>
            `;
            break;
    }
    
    output.innerHTML = reportContent;
    StyleMatch.showNotification(`Reporte de ${type} generado`, 'success');
}
       