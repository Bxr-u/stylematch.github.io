// Authentication JavaScript - Expanded
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form handler
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Password confirmation validation
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', function() {
                if (password.value !== confirmPassword.value) {
                    this.style.borderColor = 'red';
                } else {
                    this.style.borderColor = 'var(--primary)';
                }
            });
        }
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!StyleMatch.validateEmail(email)) {
        StyleMatch.showNotification('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Iniciando sesión...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        StyleMatch.showNotification('¡Bienvenido de nuevo!', 'success');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        window.location.href = 'dashboard.html';
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    
    // Validations
    if (formData.password !== formData.confirmPassword) {
        StyleMatch.showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (formData.password.length < 6) {
        StyleMatch.showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    if (!StyleMatch.validateEmail(formData.email)) {
        StyleMatch.showNotification('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creando cuenta...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        StyleMatch.showNotification('¡Cuenta creada exitosamente!', 'success');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        window.location.href = 'login.html';
    }, 2000);
}