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
            const text = this.textContent.trim();
            
            if (text === 'Inicio') {
                window.location.href = 'index.html';
            } else if (text === 'Apuestas') {
                window.location.href = 'Apuestas.html';
            }
        });
    });

    // Logo
    document.querySelector('.logo').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

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

    // Manejo del botón de usuario
    const userBtn = document.querySelector('.user-btn');
    if (userBtn) {
        userBtn.addEventListener('click', function() {
            // Por ahora solo mostraremos una alerta
            alert('Perfil de usuario en desarrollo');
        });
    }

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
}); 