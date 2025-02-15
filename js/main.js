// Control de versión y caché
(function() {
    const currentVersion = '1.0.1';
    const savedVersion = localStorage.getItem('appVersion');
    
    if (savedVersion !== currentVersion) {
        localStorage.setItem('appVersion', currentVersion);
        if (savedVersion) { // Solo recargar si había una versión anterior
            window.location.reload(true);
        }
    }
})();

// Función de navegación
function navigateTo(page) {
    window.location.href = page;
}

// Cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Botones de login y registro
    document.querySelectorAll('.button--login').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'InicioSesion.html';
        });
    });

    document.querySelectorAll('.button--register').forEach(btn => {
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
    document.querySelectorAll('.nav__main a').forEach(link => {
        link.addEventListener('click', function(e) {
            const isIndex = window.location.pathname.includes('index.html') || 
                          window.location.pathname.endsWith('/');
            
            if (isIndex && !link.href.includes('index.html')) {
                e.preventDefault();
                document.getElementById('alert--login-required-popup__modal').style.display = 'block';
            }
        });
    });

    // Manejo de elementos que requieren login (popup__modal personalizado)
    const elementsRequiringLogin = document.querySelectorAll(`
        .nav__main a:not([href="index.html"]), 
        .sidebar__sport-buttons button, 
        .notifications, 
        .language, 
        .alert--login-required,
        .bets__recent .alert--login-required
    `);

    // Asegurarnos de que la detección de la página funciona en GitHub Pages
    function isIndexPage() {
        const path = window.location.pathname;
        return path.includes('index.html') || 
               path.endsWith('/') || 
               path.endsWith('/BettingsGPM/') ||
               path === '/BettingsGPM';
    }

    elementsRequiringLogin.forEach(element => {
        element.addEventListener('click', function(e) {
            if (isIndexPage()) {
                e.preventDefault();
                document.getElementById('alert--login-required-popup__modal').style.display = 'block';
            }
        });
    });

    // Manejo de los modales
    document.getElementById('cancel-login')?.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    document.getElementById('confirm-login')?.addEventListener('click', function() {
        window.location.href = 'InicioSesion.html';
    });

    document.querySelectorAll('.button--logout').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('logout-modal').style.display = 'block';
            });
        }
    });

    document.getElementById('cancel-logout')?.addEventListener('click', function() {
        const logoutModal = document.getElementById('logout-modal');
        if (logoutModal) {
            logoutModal.style.display = 'none';
        }
    });

    document.getElementById('confirm-logout')?.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(e) {
        const logoutModal = document.getElementById('logout-popup__modal');
        const loginModal = document.getElementById('alert--login-required-popup__modal');
        
        if (e.target === logoutModal) {
            logoutModal.style.display = 'none';
        }
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Añadir funcionalidad al header__logo
    const header__logo = document.querySelector('.header__logo');
    if (header__logo) {
        header__logo.style.cursor = 'pointer';
        header__logo.addEventListener('click', function() {
            // Obtener el nombre de la página actual
            const currentPage = window.location.pathname.split('/').pop();
            
            // Si estamos en la página de inicio de sesión o registro
            if (currentPage === 'InicioSesion.html' || currentPage === 'Registro.html') {
                window.location.href = 'index.html';
            } 
            // Para cualquier otra página (excepto index.html)
            else if (currentPage !== 'index.html') {
                window.location.href = 'InicioConSesion.html';
            }
        });
    }

    // Funcionalidad botones hamburguesa
    const hamburgerNav = document.querySelector('.hamburger-nav');
    const hamburgerHeader = document.querySelector('.hamburger-header');
    const mainNav = document.querySelector('.main-nav');
    const topMenu = document.querySelector('.top-menu');

    if (hamburgerNav && mainNav) {
        hamburgerNav.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Cerrar el otro menú si está abierto
            hamburgerHeader?.classList.remove('active');
            topMenu?.classList.remove('active');
        });
    }

    if (hamburgerHeader && topMenu) {
        hamburgerHeader.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            topMenu.classList.toggle('active');
            
            // Cerrar el otro menú si está abierto
            hamburgerNav?.classList.remove('active');
            mainNav?.classList.remove('active');
        });
    }

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-buttons') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.top-menu')) {
            hamburgerNav?.classList.remove('active');
            hamburgerHeader?.classList.remove('active');
            mainNav?.classList.remove('active');
            topMenu?.classList.remove('active');
        }
    });
}); 
// Manejo del modal de cierre de sesión
const logoutModal = document.getElementById('logout-popup__modal');
const cancelLogout = document.getElementById('cancel-logout');
const confirmLogout = document.getElementById('confirm-logout');

if (logoutModal && cancelLogout && confirmLogout) {
    cancelLogout.addEventListener('click', function() {
        logoutModal.style.display = 'none';
    });

    confirmLogout.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    window.addEventListener('click', function(e) {
        if (e.target === logoutModal) {
            logoutModal.style.display = 'none';
        }
    });
}

// Manejo del Modal de "Necesita Iniciar Sesión"
const loginRequiredModal = document.getElementById('alert--login-required-popup__modal');
const loginRequiredClose = document.getElementById('login-required-close');

if (loginRequiredModal && loginRequiredClose) {
    loginRequiredClose.addEventListener('click', function() {
        loginRequiredModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === loginRequiredModal) {
            loginRequiredModal.style.display = 'none';
        }
    });
}

// Mostrar la alerta cuando el usuario intenta acceder sin sesión activa
document.querySelectorAll('.nav__menu a').forEach(link => {
    link.addEventListener('click', function(event) {
        if (!sessionStorage.getItem('isLoggedIn')) {
            event.preventDefault();
            loginRequiredModal.style.display = 'block';
        }
    });
});

// Manejo del Modal de "Necesita Iniciar Sesión"
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

document.getElementById('cancel-login')?.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

document.getElementById('confirm-login')?.addEventListener('click', function() {
    window.location.href = 'InicioSesion.html';
});

// Manejo del Modal de Cierre de Sesión
document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('logout-modal').style.display = 'block';
    });
});

document.getElementById('cancel-logout')?.addEventListener('click', function() {
        const logoutModal = document.getElementById('logout-modal');
        if (logoutModal) {
            logoutModal.style.display = 'none';
        }
    });

document.getElementById('confirm-logout')?.addEventListener('click', function() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
});

// Funcionalidad de los botones de Inicio de Sesión y Registro
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

// Funcionalidad del botón "Volver" en Inicio de Sesión
document.getElementById('back-to-index')?.addEventListener('click', function() {
    window.location.href = 'index.html';
});


// Funcionalidad del Logo: Redirección según la página
document.querySelectorAll('.header__logo').forEach(logo => {
    logo.addEventListener('click', function() {
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('index.html') || currentPage.includes('InicioSesion.html') || currentPage.includes('Registro.html')) {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'InicioConSesion.html';
        }
    });
});


// Funcionalidad del Logo: Redirección según la página
document.querySelectorAll('.logo img').forEach(logo => {
    logo.addEventListener('click', function() {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'index.html' || currentPage === 'InicioSesion.html' || currentPage === 'Registro.html' || currentPage === '') {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'InicioConSesion.html';
        }
    });
});
