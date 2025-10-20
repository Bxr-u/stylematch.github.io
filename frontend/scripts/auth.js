// Authentication JavaScript con APIs reales
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginReal);
    }
    
    // Register form handler
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterReal);
        
        // Password confirmation validation mejorada
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            const validatePasswords = () => {
                if (confirmPassword.value && password.value !== confirmPassword.value) {
                    confirmPassword.style.borderColor = 'red';
                    return false;
                } else {
                    confirmPassword.style.borderColor = 'var(--primary)';
                    return true;
                }
            };
            
            confirmPassword.addEventListener('input', validatePasswords);
            password.addEventListener('input', validatePasswords);
        }
    }
});

async function handleLoginReal(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!validateEmail(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }
    
    if (!password) {
        showNotification('Por favor ingresa tu contraseña', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Iniciando sesión...';
    submitBtn.disabled = true;
    
    try {
        console.log('📤 Intentando login con:', { email, password });
        const result = await apiService.login({ email, password });
        console.log('✅ Respuesta del login:', result);
        
        if (result.success) {
            // Guardar datos de usuario en localStorage
            localStorage.setItem('user', JSON.stringify({
                id: result.user_id,
                nombre: result.nombre,
                email: result.email
            }));
            
            showNotification('¡Bienvenido de nuevo!', 'success');
            console.log('🔄 Redirigiendo a dashboard...');
            
            // Redirección con timeout para ver la notificación
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showNotification(result.message || 'Error al iniciar sesión', 'error');
        }
    } catch (error) {
        console.error('❌ Error en login:', error);
        showNotification(error.message || 'Error al iniciar sesión', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function handleRegisterReal(e) {
    e.preventDefault();
    
    const formData = {
        nombre: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

     console.log('📤 Datos a enviar:', formData);
    
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validations
    if (!formData.nombre) {
        showNotification('Por favor ingresa tu nombre completo', 'error');
        return;
    }
    
    if (!validateEmail(formData.email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }
    
    if (formData.password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    if (formData.password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creando cuenta...';
    submitBtn.disabled = true;
    
    try {
        const result = await apiService.register(formData);
        
        if (result.success) {
            showNotification('¡Cuenta creada exitosamente! Redirigiendo...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showNotification(result.message || 'Error al crear la cuenta', 'error');
        }
    } catch (error) {
        showNotification(error.message || 'Error al crear la cuenta', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}
// Al final de auth.js, agrega:
console.log('auth.js cargado - verificando localStorage');
console.log('Usuario en localStorage:', localStorage.getItem('user'));