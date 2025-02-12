// Función de navegación
function navigateTo(page) {
    window.location.href = page;
}

// Cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Botones de login y registro
    document.querySelectorAll('.login-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'InicioSesion.html';
        });
    });

    document.querySelectorAll('.register-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'Registro.html';
        });
    });

    // Enlaces de navegación
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Verificar si estamos en la página de inicio sin sesión
            const isIndex = window.location.pathname.includes('index.html') || 
                          window.location.pathname.endsWith('/');
            
            if (isIndex) {
                if (confirm('No has iniciado sesión, ¿desea hacerlo ahora?')) {
                    window.location.href = 'InicioSesion.html';
                }
            } else {
                // Comportamiento normal para otras páginas
                if (this.classList.contains('active') || this.getAttribute('href') === '#') {
                    if (this.getAttribute('href') === '#') {
                        alert('Sección en desarrollo');
                    }
                } else {
                    window.location.href = this.getAttribute('href');
                }
            }
        });
    });

    // Logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            const isLoggedIn = document.querySelector('.user-btn') !== null;
            window.location.href = isLoggedIn ? 'InicioConSesion.html' : 'index.html';
        });
    }

    // Botones de acceso en las tarjetas de apuestas
    const accessButtons = document.querySelectorAll('.access-button');
    accessButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Por ahora solo mostraremos una alerta
            alert('Funcionalidad de acceso a la apuesta en desarrollo');
        });
    });

    // Botones de deportes en el sidebar
    const sportButtons = document.querySelectorAll('.sport-buttons button');
    sportButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Por ahora solo mostraremos una alerta
            alert(`Categoría ${this.textContent} seleccionada`);
        });
    });

    // Manejo del botón de usuario (perfil)
    document.querySelectorAll('.user-btn').forEach(btn => {
        if (btn) {
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'Perfil.html';
            });
        }
    });

    // Manejo de otros elementos del top-menu
    const notifications = document.querySelector('.notifications');
    const deposit = document.querySelector('.deposit');
    const language = document.querySelector('.language');

    if (notifications) {
        notifications.addEventListener('click', function() {
            alert('Centro de notificaciones en desarrollo');
        });
    }

    if (deposit) {
        deposit.style.cursor = 'pointer';
        deposit.addEventListener('click', function() {
            // Verificar si estamos en index.html
            const isIndex = window.location.pathname.includes('index.html') || 
                          window.location.pathname.endsWith('/');
            
            if (isIndex) {
                window.location.href = 'InicioConSesion.html';
            } else {
                alert('Sistema de depósito en desarrollo');
            }
        });
    }

    if (language) {
        language.addEventListener('click', function() {
            alert('Selección de idioma en desarrollo');
        });
    }

    // Manejo del saldo
    const balanceElement = document.querySelector('.balance');
    if (balanceElement) {
        // Verificar si el usuario está en una página con sesión iniciada
        const isLoggedIn = document.querySelector('.user-btn') !== null;
        
        if (isLoggedIn) {
            balanceElement.textContent = 'Saldo: $7,450';
            balanceElement.classList.add('has-balance');
        }
    }
}); 