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

    // Manejo del depósito (caso especial)
    const deposit = document.querySelector('.deposit');
    if (deposit) {
        deposit.style.cursor = 'pointer';
        deposit.addEventListener('click', function(e) {
            e.preventDefault();
            const isIndex = window.location.pathname.includes('index.html') || 
                          window.location.pathname.endsWith('/');
            
            if (isIndex) {
                window.location.href = 'InicioConSesion.html';
            }
        });
    }

    // Manejo del saldo
    const balanceElement = document.querySelector('.balance');
    if (balanceElement) {
        const isLoggedIn = document.querySelector('.user-btn') !== null;
        if (isLoggedIn) {
            balanceElement.textContent = 'Saldo: $7,450';
            balanceElement.classList.add('has-balance');
        }
    }

    // Prevenir comportamiento por defecto en todos los enlaces del nav
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const isIndex = window.location.pathname.includes('index.html') || 
                          window.location.pathname.endsWith('/');
            
            if (isIndex && !link.href.includes('index.html')) {
                e.preventDefault();
                document.getElementById('login-required-modal').style.display = 'block';
            }
        });
    });

    // Manejo de elementos que requieren login (modal personalizado)
    const elementsRequiringLogin = document.querySelectorAll(`
        .main-nav a:not([href="index.html"]), 
        .sport-buttons button, 
        .notifications, 
        .language, 
        .login-required,
        .recent-bets .login-required
    `);

    elementsRequiringLogin.forEach(element => {
        element.addEventListener('click', function(e) {
            const isIndex = window.location.pathname.includes('index.html') || 
                          window.location.pathname.endsWith('/');
            
            if (isIndex) {
                e.preventDefault();
                document.getElementById('login-required-modal').style.display = 'block';
            }
            // Si no estamos en index, dejamos que el enlace funcione normalmente
        });
    });

    // Manejo de los modales
    document.getElementById('cancel-login')?.addEventListener('click', function() {
        document.getElementById('login-required-modal').style.display = 'none';
    });

    document.getElementById('confirm-login')?.addEventListener('click', function() {
        window.location.href = 'InicioSesion.html';
    });

    document.querySelectorAll('.logout-btn').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('logout-modal').style.display = 'block';
            });
        }
    });

    document.getElementById('cancel-logout')?.addEventListener('click', function() {
        document.getElementById('logout-modal').style.display = 'none';
    });

    document.getElementById('confirm-logout')?.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(e) {
        const logoutModal = document.getElementById('logout-modal');
        const loginModal = document.getElementById('login-required-modal');
        
        if (e.target === logoutModal) {
            logoutModal.style.display = 'none';
        }
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
}); 