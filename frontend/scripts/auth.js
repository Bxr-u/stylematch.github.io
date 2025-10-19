// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (StyleMatch.validateEmail(email)) {
                // Simular login (reemplazar con llamada real al backend)
                console.log('Login attempt:', { email, password });
                
                // Mostrar loading
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Iniciando sesión...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Simular respuesta del servidor
                    StyleMatch.showNotification('Bienvenido de nuevo!', 'success');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Redirigir al dashboard (temporal)
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                StyleMatch.showNotification('Por favor ingresa un email válido', 'error');
            }
        });
    }
});