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
            // Si el enlace tiene la clase active o href es #, prevenir la navegación
            if (this.classList.contains('active') || this.getAttribute('href') === '#') {
                e.preventDefault();
                
                if (this.getAttribute('href') === '#') {
                    alert('Sección en desarrollo');
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
        deposit.addEventListener('click', function() {
            alert('Sistema de depósito en desarrollo');
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