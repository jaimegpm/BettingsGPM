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

    // Manejo de notificaciones
    const notificationsButton = document.querySelector('.notifications');
    const notificationsMenu = document.querySelector('.notifications-menu');

    if (notificationsButton && notificationsMenu) {
        notificationsButton.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationsMenu.classList.toggle('active');
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!notificationsButton.contains(e.target)) {
                notificationsMenu.classList.remove('active');
            }
        });

        // Prevenir cierre al hacer clic dentro del menú
        notificationsMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Manejo del menú de depósito
    const depositButton = document.querySelector('.deposit');
    const depositMenu = document.querySelector('.deposit-menu');

    if (depositButton && depositMenu) {
        depositButton.addEventListener('click', function(e) {
            e.stopPropagation();
            depositMenu.classList.toggle('active');
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!depositButton.contains(e.target)) {
                depositMenu.classList.remove('active');
            }
        });

        // Prevenir cierre al hacer clic dentro del menú
        depositMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    const chatButton = document.querySelector('.ai-chat-button');
    const chatContainer = document.querySelector('.ai-chat-container');
    const minimizeButton = document.querySelector('.ai-chat-minimize');

    // Función para hacer vibrar el botón
    function pulseButton() {
        if (!chatContainer.classList.contains('active')) {  // Solo si el chat está cerrado
            chatButton.classList.add('pulse');
            setTimeout(() => {
                chatButton.classList.remove('pulse');
            }, 800);
        }
    }

    // Activar la vibración cada 2.5 segundos
    setInterval(pulseButton, 2500);

    // Primera vibración después de 2.5 segundos
    setTimeout(() => {
        pulseButton();
    }, 2500);

    chatButton.addEventListener('click', function() {
        // Añadir clase active al botón para la animación de pulso
        chatButton.classList.add('active');
        
        // Mostrar loading
        const loading = document.querySelector('.ai-loading');
        loading.classList.add('active');
        
        // Simular tiempo de carga
        setTimeout(() => {
            loading.classList.remove('active');
        }, 800);
        
        chatContainer.classList.toggle('active');
        
        // Remover la clase active del botón después de la animación
        setTimeout(() => {
            chatButton.classList.remove('active');
        }, 1000);
    });

    minimizeButton.addEventListener('click', function() {
        chatContainer.classList.remove('active');
    });

    hidePageLoader();
    
    // Función para determinar si estamos en la página principal sin sesión
    function isIndexPageWithoutSession() {
        const currentPage = window.location.pathname.split('/').pop();
        // Verificar si estamos en index.html o en la raíz del sitio
        const isIndexPage = currentPage === 'index.html' || 
                           currentPage === '' || 
                           currentPage === '/';
        
        // Verificar si no hay sesión iniciada
        const hasNoSession = !document.querySelector('.logout-btn') && 
                            !document.querySelector('.user-profile-menu');
        
        return isIndexPage && hasNoSession;
    }
    
    // Modificar la función handleNavWithLoader para excluir index.html sin sesión
    function handleNavWithLoader(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('click', function(e) {
                // No aplicar loader si estamos en index.html sin sesión
                if (isIndexPageWithoutSession()) {
                    return true; // Permitir comportamiento normal sin loader
                }
                
                // No aplicar a enlaces con comportamiento especial
                if (this.classList.contains('no-loader') || 
                    this.closest('.sport-buttons') || 
                    this.id === 'theme-switch') {
                    return true;
                }
                
                // Prevenir navegación inmediata
                e.preventDefault();
                
                // Obtener la URL de destino
                const href = this.getAttribute('href');
                if (!href || href === '#') return true;
                
                // Mostrar el loader
                const loader = document.getElementById('page-loader');
                if (loader) {
                    loader.style.display = 'flex';
                    loader.classList.remove('active');
                    void loader.offsetWidth;
                    loader.classList.add('active');
                }
                
                // Navegar después del retraso
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
                
                return false;
            });
        });
    }
    
    // Aplicar a todos los enlaces de navegación
    handleNavWithLoader('a[href]:not([href^="#"]):not([href^="javascript"]):not([href^="mailto"])');
    handleNavWithLoader('.nav__main a');
    handleNavWithLoader('.logo a');
    handleNavWithLoader('.guest-login');
    handleNavWithLoader('.register-link');
    handleNavWithLoader('.register-login-link');
    
    // Modificar el evento de clic global para excluir index.html sin sesión
    document.addEventListener('click', function(e) {
        // No mostrar loader si estamos en index.html sin sesión
        if (isIndexPageWithoutSession()) {
            return true; // Permitir comportamiento normal sin loader
        }
        
        // Resto del código de manejo de clics...
    });
    
    // Modificar el evento beforeunload para excluir index.html sin sesión
    window.addEventListener('beforeunload', function(e) {
        // No mostrar loader si estamos en index.html sin sesión
        if (isIndexPageWithoutSession()) {
            return;
        }
        
        const loader = document.getElementById('page-loader');
        if (loader && !document.querySelector('.sport-buttons:hover')) {
            loader.style.display = 'flex';
            loader.classList.add('active');
        }
    });

    // Desactivar el loader para los botones de deportes específicamente
    const sportButtons = document.querySelectorAll('.sport-buttons button');
    
    sportButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevenir comportamiento por defecto
            e.preventDefault();
            e.stopPropagation();
            
            // Asegurarse de que el loader NO se muestre para estos botones
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.display = 'none';
                loader.classList.remove('active');
            }
            
            // Aquí puedes añadir la lógica que quieras para estos botones
            // Por ejemplo, filtrar contenido sin recargar la página
            
            return false;
        }, true); // Usar captura para asegurarse de que este evento se ejecuta primero
    });

    // Eliminar cualquier código existente para estos botones y reemplazarlo con una solución directa y específica
    document.addEventListener('DOMContentLoaded', function() {
        // 1. Encontrar los botones específicos por su selector exacto
        const guestLoginLinks = document.querySelectorAll('a.guest-login');
        const registerLinks = document.querySelectorAll('a.register-link');
        const loginLinks = document.querySelectorAll('a.register-login-link');
        
        // 2. Función específica para agregar el loader a un enlace
        function addLoaderToLink(link) {
            if (!link) return;
            
            // Eliminar cualquier evento previo
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Agregar el nuevo evento
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Obtener la URL de destino
                const href = this.getAttribute('href');
                
                // Mostrar el loader de forma forzada
                const loader = document.getElementById('page-loader');
                if (loader) {
                    // Forzar la visualización del loader
                    loader.style.display = 'flex';
                    loader.style.opacity = '1';
                    loader.classList.add('active');
                    
                    // Asegurarse de que permanezca visible
                    document.body.style.overflow = 'hidden';
                }
                
                // Navegar después de un retraso visible
                setTimeout(function() {
                    window.location.href = href;
                }, 800);
                
                return false;
            });
        }
        
        // 3. Aplicar a cada enlace encontrado
        guestLoginLinks.forEach(addLoaderToLink);
        registerLinks.forEach(addLoaderToLink);
        loginLinks.forEach(addLoaderToLink);
        
        console.log('✅ Loader aplicado a:', 
            guestLoginLinks.length, 'enlaces de invitado,', 
            registerLinks.length, 'enlaces de registro,', 
            loginLinks.length, 'enlaces de inicio de sesión');
    });

    setupMobileChat();
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

// Manejo del menú de idiomas
const languageButton = document.querySelector('.language');
const languageMenu = document.querySelector('.language-menu');

if (languageButton && languageMenu) {
    languageButton.addEventListener('click', function(e) {
        e.stopPropagation();
        languageMenu.classList.toggle('active');
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!languageButton.contains(e.target)) {
            languageMenu.classList.remove('active');
        }
    });

    // Prevenir cierre al hacer clic dentro del menú
    languageMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Función mejorada para detectar si estamos en una página con sesión iniciada
function isLoggedInPage() {
    // Verificar si estamos en una página con sesión iniciada
    // Comprobamos múltiples indicadores posibles
    const currentPage = window.location.pathname.split('/').pop();
    const isLoggedInByPage = currentPage === 'InicioConSesion.html' || 
                             currentPage === 'Apuestas.html' || 
                             currentPage === 'Rankings.html' || 
                             currentPage === 'Social.html' || 
                             currentPage === 'Perfil.html' || 
                             currentPage === 'Historial.html';
    
    // También verificamos elementos del DOM que solo existen en páginas con sesión
    const hasLogoutBtn = document.querySelector('.logout-btn') !== null;
    const hasNotificationCount = document.querySelector('.notifications-count') !== null;
    
    return isLoggedInByPage || hasLogoutBtn || hasNotificationCount;
}

// Función para mostrar el spinner de carga
function showPageLoader() {
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.classList.add('active');
    }
}

// Función para ocultar el spinner de carga
function hidePageLoader() {
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.remove('active');
        }, 500);
    }
}

// Mostrar el spinner al iniciar la navegación
window.addEventListener('beforeunload', function(e) {
    if (isLoggedInPage()) {
        showPageLoader();
    }
});

// Función para animar transiciones entre secciones
function setupSectionTransitions() {
    const sections = document.querySelectorAll('.content-section, .tab-content');
    const tabs = document.querySelectorAll('.tab, .nav-item');
    
    // Ocultar todas las secciones excepto la activa
    sections.forEach(section => {
        if (!section.classList.contains('active')) {
            section.style.display = 'none';
            section.style.opacity = '0';
        } else {
            section.style.opacity = '1';
        }
    });
    
    // Manejar clics en pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Si ya está activo, no hacer nada
            if (this.classList.contains('active')) return;
            
            // Prevenir navegación si es un enlace
            if (this.tagName === 'A') {
                e.preventDefault();
            }
            
            // Obtener el target
            const targetId = this.getAttribute('data-target') || this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (!targetSection) return;
            
            // Desactivar pestañas activas
            tabs.forEach(t => t.classList.remove('active'));
            
            // Activar esta pestaña
            this.classList.add('active');
            
            // Ocultar secciones activas con fade out
            sections.forEach(section => {
                if (section.classList.contains('active')) {
                    section.style.opacity = '0';
                    setTimeout(() => {
                        section.style.display = 'none';
                        section.classList.remove('active');
                        
                        // Mostrar la sección objetivo
                        targetSection.style.display = 'block';
                        targetSection.classList.add('active');
                        
                        // Pequeño retraso para la animación
                        setTimeout(() => {
                            targetSection.style.opacity = '1';
                        }, 50);
                    }, 300);
                }
            });
        });
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupSectionTransitions);
} else {
    setupSectionTransitions();
}

// Configuración de partículas
function setupParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: "#2ecc71" },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#2ecc71",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.3 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });
    }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupParticles);
} else {
    setupParticles();
}

// Añadir efecto de carga para imágenes
function setupImageLoadEffects() {
    const images = document.querySelectorAll('img:not(.loaded)');
    
    images.forEach(img => {
        // Añadir clase de carga
        img.classList.add('loading');
        
        // Cuando la imagen carga
        img.onload = function() {
            // Pequeño retraso para el efecto visual
            setTimeout(() => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            }, 100);
        };
        
        // Si la imagen ya estaba cargada
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        }
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupImageLoadEffects);

// Funcionalidad del toggle de tema
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    
    if (themeSwitch) {
        // Verificar si hay una preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
        
        themeSwitch.addEventListener('click', function(e) {
            // Prevenir comportamiento por defecto
            e.preventDefault();
            e.stopPropagation();
            
            // Asegurarse de que el loader no se muestre
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.display = 'none';
                loader.classList.remove('active');
            }
            
            // Toggle de la clase en el body
            document.body.classList.toggle('light-theme');
            
            // Guardar preferencia
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
            
            return false;
        });
    }
});

// Agregar este código al final del archivo main.js - enfoque directo con setTimeout
setTimeout(function() {
    // Botón "Iniciar sesión como invitado"
    var guestLoginElement = document.querySelector('.guest-login');
    if (guestLoginElement) {
        guestLoginElement.onclick = function(e) {
            e.preventDefault();
            
            // Obtener la URL
            var href = this.getAttribute('href');
            
            // Activar el loader manualmente
            var loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.display = 'flex';
                loader.classList.add('active');
            }
            
            // Redirigir después de un retraso
            setTimeout(function() {
                window.location.href = href;
            }, 800);
            
            return false;
        };
        console.log('✓ Iniciar sesión como invitado - Loader activado');
    }
    
    // Enlace "Regístrate aquí"
    var registerElement = document.querySelector('.register-link');
    if (registerElement) {
        registerElement.onclick = function(e) {
            e.preventDefault();
            
            // Obtener la URL
            var href = this.getAttribute('href');
            
            // Activar el loader manualmente
            var loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.display = 'flex';
                loader.classList.add('active');
            }
            
            // Redirigir después de un retraso
            setTimeout(function() {
                window.location.href = href;
            }, 800);
            
            return false;
        };
        console.log('✓ Regístrate aquí - Loader activado');
    }
    
    // Enlace "Inicia sesión aquí"
    var loginElement = document.querySelector('.register-login-link');
    if (loginElement) {
        loginElement.onclick = function(e) {
            e.preventDefault();
            
            // Obtener la URL
            var href = this.getAttribute('href');
            
            // Activar el loader manualmente
            var loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.display = 'flex';
                loader.classList.add('active');
            }
            
            // Redirigir después de un retraso
            setTimeout(function() {
                window.location.href = href;
            }, 800);
            
            return false;
        };
        console.log('✓ Inicia sesión aquí - Loader activado');
    }
}, 500); // Retraso para asegurar que la página esté completamente cargada

// Función específica para el chat en móvil - Versión corregida
function setupMobileChat() {
    // Solo ejecutar en móvil
    if (window.innerWidth <= 768) {
        const chatButton = document.querySelector('.ai-chat-button');
        const chatWidget = document.querySelector('.ai-chat-widget');
        const minimizeButton = document.querySelector('.ai-chat-minimize');
        
        if (chatButton && chatWidget) {
            // Eliminar eventos anteriores para evitar duplicados
            chatButton.removeEventListener('click', handleChatButtonClick);
            
            // Manejar clic en el botón de chat
            chatButton.addEventListener('click', handleChatButtonClick);
            
            function handleChatButtonClick() {
                console.log('Botón de chat clickeado'); // Depuración
                chatWidget.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevenir scroll
            }
            
            // Manejar clic en el botón minimizar
            if (minimizeButton) {
                minimizeButton.removeEventListener('click', handleMinimizeClick);
                minimizeButton.addEventListener('click', handleMinimizeClick);
                
                function handleMinimizeClick() {
                    console.log('Botón minimizar clickeado'); // Depuración
                    chatWidget.classList.remove('active');
                    document.body.style.overflow = ''; // Restaurar scroll
                }
            }
        }
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupMobileChat();
});

// También ejecutar cuando se redimensiona la ventana
window.addEventListener('resize', function() {
    setupMobileChat();
});
