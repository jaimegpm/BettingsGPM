// Control de versión y caché
(function() {
    const currentVersion = '1.0.1';
    const savedVersion = localStorage.getItem('appVersionMobile');
    
    if (savedVersion !== currentVersion) {
        localStorage.setItem('appVersionMobile', currentVersion);
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
    // Referencias a elementos del DOM que se usan frecuentemente
    const hamburgerNav = document.querySelector('.hamburger-nav');
    const hamburgerHeader = document.querySelector('.hamburger-header');
    const mainNav = document.querySelector('.main-nav');
    const topMenu = document.querySelector('.top-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const headerOverlay = document.querySelector('.header-overlay');
    const pageLoader = document.getElementById('page-loader');
    const loginRequiredModal = document.getElementById('login-required-modal');
    const confirmLoginBtn = document.getElementById('confirm-login');
    const cancelLoginBtn = document.getElementById('cancel-login');
    const profileBtn = document.querySelector('.profile-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const closeTopMenuBtn = document.getElementById('close-top-menu');
    const closeMainNavBtn = document.getElementById('close-main-nav');
    const logo = document.querySelector('.logo');
    
    // Verificar que el modal de inicio de sesión exista
    if (loginRequiredModal) {
        console.log('Modal de inicio de sesión encontrado');
        // Asegurarse de que el modal esté inicialmente oculto
        loginRequiredModal.style.display = 'none';
    } else {
        console.error('Modal de inicio de sesión no encontrado');
    }
    
    // Verificar si el usuario ha iniciado sesión
    function isLoggedIn() {
        // En la página de index, nunca estamos logueados
        if (window.location.pathname.includes('mobile-index.html') || 
            window.location.pathname.endsWith('/mobile/') || 
            window.location.pathname.endsWith('/mobile')) {
            console.log('isLoggedIn: false (estamos en index)');
            return false;
        }
        
        // En las páginas que requieren sesión, siempre estamos logueados
        if (window.location.pathname.includes('mobile-InicioConSesion.html') || 
            window.location.pathname.includes('mobile-Apuestas.html') || 
            window.location.pathname.includes('mobile-Rankings.html') || 
            window.location.pathname.includes('mobile-Social.html') || 
            window.location.pathname.includes('mobile-Perfil.html')) {
            console.log('isLoggedIn: true (estamos en página con sesión)');
            return true;
        }
        
        // Para otras páginas, verificar la clase del body
        const result = document.body.classList.contains('logged-in');
        console.log('isLoggedIn:', result, '(verificando clase del body)');
        return result;
    }
    
    // Ocultar el spinner de carga cuando la página esté lista
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.remove('active');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 300);
        }, 500);
    }
    
    // Función para navegar a otra página
    function navigateTo(page) {
        if (pageLoader) {
            pageLoader.style.display = 'flex';
            pageLoader.classList.add('active');
        }
        setTimeout(() => {
            window.location.href = page;
        }, 300);
    }
    
    // Manejo del menú de navegación
    if (hamburgerNav) {
        hamburgerNav.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar propagación
            mainNav.classList.toggle('active');
            hamburgerNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            // Si el menú superior está abierto, cerrarlo
            if (topMenu.classList.contains('active')) {
                topMenu.classList.remove('active');
                hamburgerHeader.classList.remove('active');
                headerOverlay.classList.remove('active');
            }
        });
    }
    
    // Cerrar el menú de navegación al hacer clic en el overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            if (hamburgerNav) {
                hamburgerNav.classList.remove('active');
            }
            if (mainNav) {
                mainNav.classList.remove('active');
            }
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Manejo del menú de opciones (header)
    if (hamburgerHeader) {
        hamburgerHeader.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar propagación
            topMenu.classList.toggle('active');
            hamburgerHeader.classList.toggle('active');
            headerOverlay.classList.toggle('active');
            
            // Si el menú de navegación está abierto, cerrarlo
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerNav.classList.remove('active');
                navOverlay.classList.remove('active');
            }
        });
    }
    
    // Cerrar el menú de opciones al hacer clic en el overlay
    if (headerOverlay) {
        headerOverlay.addEventListener('click', function() {
            if (hamburgerHeader) {
                hamburgerHeader.classList.remove('active');
            }
            if (topMenu) {
                topMenu.classList.remove('active');
            }
            headerOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Cerrar también los menús desplegables
            document.querySelectorAll('.notifications.active, .language.active, .deposit.active').forEach(item => {
                item.classList.remove('active');
            });
        });
    }
    
    // Verificar si estamos en la página de inicio
    function isIndexPage() {
        return window.location.pathname.includes('mobile-index.html') || 
               window.location.pathname.endsWith('/mobile/') || 
               window.location.pathname.endsWith('/mobile');
    }
    
    // Función para mostrar el modal de inicio de sesión
    function showLoginModal() {
        if (loginRequiredModal) {
            console.log('Mostrando modal de inicio de sesión');
            
            // Asegurarse de que el modal esté inicialmente oculto pero preparado
            loginRequiredModal.style.display = 'flex';
            
            // Forzar un reflow para que la transición funcione
            loginRequiredModal.offsetHeight;
            
            // Añadir la clase active para la animación
            loginRequiredModal.classList.add('active');
            
            // Asegurarse de que el body tenga overflow hidden para evitar scroll
            document.body.style.overflow = 'hidden';
            
            // Cerrar cualquier otro menú o modal que pueda estar abierto
            if (hamburgerNav) hamburgerNav.classList.remove('active');
            if (mainNav) mainNav.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            if (hamburgerHeader) hamburgerHeader.classList.remove('active');
            if (topMenu) topMenu.classList.remove('active');
            if (headerOverlay) headerOverlay.classList.remove('active');
            
            console.log('Modal de inicio de sesión mostrado');
        } else {
            console.error('No se encontró el modal de inicio de sesión');
        }
    }
    
    // Función para ocultar el modal de inicio de sesión
    function hideLoginModal() {
        if (loginRequiredModal) {
            loginRequiredModal.classList.remove('active');
            
            // Esperar a que termine la transición antes de ocultar
            setTimeout(() => {
                loginRequiredModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // Manejar los botones del modal
    if (confirmLoginBtn) {
        confirmLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Ocultar el modal primero
            hideLoginModal();
            
            // Mostrar el loader antes de redirigir
            if (pageLoader) {
                setTimeout(() => {
                    pageLoader.style.display = 'flex';
                    pageLoader.classList.add('active');
                    
                    // Añadir un retraso antes de navegar para asegurar que el modal se cierre primero
                    setTimeout(() => {
                        // Redirigir a la página de inicio de sesión
                        navigateTo('mobile-iniciosesion.html');
                    }, 300);
                }, 300); // Esperar a que termine la animación de cierre del modal
            } else {
                // Si no hay loader, simplemente navegar después de un retraso
                setTimeout(() => {
                    navigateTo('mobile-iniciosesion.html');
                }, 600);
            }
        });
    }
    
    if (cancelLoginBtn) {
        cancelLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Ocultar el modal con animación
            hideLoginModal();
        });
    }
    
    // Manejar el botón de inicio de sesión como invitado
    const guestLoginBtn = document.getElementById('guest-login');
    if (guestLoginBtn) {
        guestLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Ocultar el modal primero
            hideLoginModal();
            
            // Mostrar el loader antes de redirigir
            if (pageLoader) {
                setTimeout(() => {
                    pageLoader.style.display = 'flex';
                    pageLoader.classList.add('active');
                    
                    // Redirigir directamente a la página con sesión iniciada después de un retraso
                    setTimeout(() => {
                        navigateTo('mobile-InicioConSesion.html');
                    }, 300);
                }, 300); // Esperar a que termine la animación de cierre del modal
            } else {
                // Si no hay loader, simplemente navegar después de un retraso
                setTimeout(() => {
                    navigateTo('mobile-InicioConSesion.html');
                }, 600);
            }
        });
    }
    
    // Manejar el botón de inicio de sesión como invitado en la página de inicio de sesión
    const guestLoginSessionBtn = document.getElementById('guest-login-session');
    if (guestLoginSessionBtn) {
        guestLoginSessionBtn.addEventListener('click', function() {
            // Redirigir directamente a la página con sesión iniciada
            navigateTo('mobile-InicioConSesion.html');
        });
    }
    
    // Manejar los botones de volver en las páginas de inicio de sesión y registro
    const loginSessionBackBtn = document.getElementById('login-session-back');
    if (loginSessionBackBtn) {
        loginSessionBackBtn.addEventListener('click', function() {
            // Volver a la página anterior
            navigateTo('mobile-index.html');
        });
    }
    
    const registerFormBackBtn = document.getElementById('register-form-back');
    if (registerFormBackBtn) {
        registerFormBackBtn.addEventListener('click', function() {
            // Volver a la página anterior
            navigateTo('mobile-index.html');
        });
    }
    
    // Cerrar el modal al hacer clic fuera del contenido
    if (loginRequiredModal) {
        loginRequiredModal.addEventListener('click', function(e) {
            if (e.target === loginRequiredModal) {
                hideLoginModal();
            }
        });
    }
    
    // Actualizar los enlaces de navegación según el estado de la sesión
    const navLinks = document.querySelectorAll('.session-required');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Guardar la URL a la que el usuario quería ir
            const targetUrl = this.getAttribute('data-target');
            if (targetUrl) {
                sessionStorage.setItem('redirectAfterLogin', targetUrl);
            }
            
            // Cerrar el menú de navegación si está abierto
            if (hamburgerNav) {
                hamburgerNav.classList.remove('active');
            }
            if (mainNav) {
                mainNav.classList.remove('active');
            }
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            
            // Esperar a que se cierre el menú antes de mostrar el modal
            setTimeout(() => {
                document.body.style.overflow = 'hidden';
                // Mostrar el modal de inicio de sesión
                showLoginModal();
            }, 300);
        });
    });
    
    // Actualizar los botones de apuesta según el estado de la sesión
    const bettingButtons = document.querySelectorAll('.bet-button, .match-odds button');
    
    bettingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Si no ha iniciado sesión, mostrar el modal
            if (!isLoggedIn()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Esperar un momento antes de mostrar el modal para evitar conflictos
                setTimeout(() => {
                    // Mostrar el modal de inicio de sesión
                    showLoginModal();
                }, 100);
            } else {
                // Si ha iniciado sesión, mostrar un modal de confirmación de apuesta
                e.preventDefault();
                e.stopPropagation();
                
                // Aquí iría el código para mostrar el modal de confirmación de apuesta
                console.log('Mostrar modal de confirmación de apuesta');
            }
        });
    });
    
    // Asegurar que todos los elementos que requieren inicio de sesión muestren el modal
    const loginRequiredElements = document.querySelectorAll('.highlight-item, .login-now-btn, .recent-bet-item');
    
    loginRequiredElements.forEach(element => {
        element.addEventListener('click', function(e) {
            if (!isLoggedIn()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Esperar un momento antes de mostrar el modal para evitar conflictos
                setTimeout(() => {
                    // Mostrar el modal de inicio de sesión
                    showLoginModal();
                }, 100);
            }
        });
    });
    
    // Actualizar los botones de inicio de sesión y registro
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar el menú hamburguesa y overlay
            if (hamburgerHeader) {
                hamburgerHeader.classList.remove('active');
            }
            if (topMenu) {
                topMenu.classList.remove('active');
            }
            if (headerOverlay) {
                headerOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            
            // Mostrar el loader antes de redirigir
            if (pageLoader) {
                pageLoader.style.display = 'flex';
                setTimeout(() => {
                    pageLoader.classList.add('active');
                }, 10);
            }
            
            // Redirigir a la página de inicio de sesión con un pequeño retraso
            setTimeout(() => {
                window.location.href = 'mobile-iniciosesion.html';
            }, 300);
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar el menú hamburguesa y overlay
            if (hamburgerHeader) {
                hamburgerHeader.classList.remove('active');
            }
            if (topMenu) {
                topMenu.classList.remove('active');
            }
            if (headerOverlay) {
                headerOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            
            // Redirigir a la página de registro
            window.location.href = 'mobile-registro.html';
        });
    }
    
    // Manejar los botones de perfil y cerrar sesión
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar el menú hamburguesa y overlay
            if (hamburgerHeader) {
                hamburgerHeader.classList.remove('active');
            }
            if (topMenu) {
                topMenu.classList.remove('active');
            }
            if (headerOverlay) {
                headerOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            
            // Redirigir a la página de perfil
            navigateTo('mobile-Perfil.html');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar el menú hamburguesa y overlay
            if (hamburgerHeader) {
                hamburgerHeader.classList.remove('active');
            }
            if (topMenu) {
                topMenu.classList.remove('active');
            }
            if (headerOverlay) {
                headerOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            
            // Mostrar el modal de confirmación de cierre de sesión
            showLogoutModal();
        });
    }
    
    // Manejar los botones de "Iniciar Sesión" dentro de los menús desplegables
    const loginModalButtons = document.querySelectorAll('.show-login-modal');
    
    loginModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Cerrar el menú hamburguesa
            if (hamburgerHeader) {
                hamburgerHeader.classList.remove('active');
            }
            if (topMenu) {
                topMenu.classList.remove('active');
            }
            if (headerOverlay) {
                headerOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            
            // Mostrar el modal de inicio de sesión sin redirección automática
            showLoginModal();
        });
    });
    
    // Manejo de los menús desplegables (notificaciones, idioma, depósito)
    const menuItems = document.querySelectorAll('.notifications, .language, .deposit');
    
    menuItems.forEach(item => {
        // Encontrar el menú correspondiente (el siguiente elemento hermano)
        const menu = item.nextElementSibling;
        
        if (menu && (menu.classList.contains('notifications-menu') || 
                    menu.classList.contains('language-menu') || 
                    menu.classList.contains('deposit-menu'))) {
            
            // Alternar menú al hacer clic
            item.addEventListener('click', function(e) {
                e.stopPropagation(); // Evitar que el clic se propague
                
                // Si ya está activo, simplemente lo cerramos
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    return;
                }
                
                // Cerrar otros menús abiertos
                menuItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar el menú actual
                item.classList.toggle('active');
            });
        }
    });
    
    // Evitar que los clics dentro de los menús desplegables cierren el menú
    const dropdownMenus = document.querySelectorAll('.notifications-menu, .language-menu, .deposit-menu');
    
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague al documento
        });
    });
    
    // Permitir que los enlaces dentro de los menús funcionen correctamente
    const menuLinks = document.querySelectorAll('.notifications-menu a, .language-menu a, .deposit-menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // No detenemos la propagación para los enlaces que muestran el modal de login
            if (link.classList.contains('show-login-modal')) {
                // Cerrar el menú desplegable al hacer clic en un enlace de inicio de sesión
                const parentMenu = link.closest('.notifications-menu, .language-menu, .deposit-menu');
                if (parentMenu) {
                    const menuTrigger = parentMenu.previousElementSibling;
                    if (menuTrigger) {
                        menuTrigger.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Cerrar menús al hacer clic fuera de ellos
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.notifications, .language, .deposit, .notifications-menu, .language-menu, .deposit-menu')) {
            menuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Asegurarse de que el elemento "Saldo" no tenga funcionalidad de clic
    const balanceElement = document.querySelector('.balance');
    if (balanceElement) {
        balanceElement.style.cursor = 'default';
        balanceElement.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague
            // No hacer nada más, simplemente prevenir cualquier acción
        });
    }
    
    // Si estamos en la página de inicio o apuestas, configurar el slider de partidos
    if (isIndexPage() || window.location.pathname.includes('mobile-InicioConSesion.html') || window.location.pathname.includes('mobile-Apuestas.html')) {
        const matchesGrid = document.querySelector('.matches-grid');
        const scrollDots = document.querySelectorAll('.scroll-dot');
        
        if (matchesGrid && scrollDots.length > 0) {
            // Actualizar el indicador de scroll cuando se desplaza
            function updateScrollIndicator() {
                const scrollPosition = matchesGrid.scrollLeft;
                const maxScroll = matchesGrid.scrollWidth - matchesGrid.clientWidth;
                const scrollPercentage = scrollPosition / maxScroll;
                
                // Calcular qué punto debe estar activo
                const activeDotIndex = Math.min(
                    Math.floor(scrollPercentage * scrollDots.length),
                    scrollDots.length - 1
                );
                
                // Actualizar las clases de los puntos
                scrollDots.forEach((dot, index) => {
                    if (index === activeDotIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Escuchar eventos de scroll
            matchesGrid.addEventListener('scroll', updateScrollIndicator);
            
            // Permitir hacer clic en los puntos para navegar
            scrollDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    const scrollWidth = matchesGrid.scrollWidth - matchesGrid.clientWidth;
                    const scrollTo = (index / (scrollDots.length - 1)) * scrollWidth;
                    
                    matchesGrid.scrollTo({
                        left: scrollTo,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Inicializar el indicador de scroll
            setTimeout(updateScrollIndicator, 100);
        }
        
        // Configurar el slider de paneles
        const panelsRows = document.querySelectorAll('.panels-row');
        const panelsDots = document.querySelectorAll('.panels-indicator');
        
        if (panelsRows.length > 0 && panelsDots.length > 0) {
            panelsRows.forEach((row, rowIndex) => {
                const dots = panelsDots[rowIndex]?.querySelectorAll('.panel-dot');
                
                if (dots && dots.length > 0) {
                    // Actualizar el indicador cuando se desplaza
                    function updatePanelIndicator() {
                        const scrollPosition = row.scrollLeft;
                        const maxScroll = row.scrollWidth - row.clientWidth;
                        const scrollPercentage = scrollPosition / maxScroll;
                        
                        // Calcular qué punto debe estar activo
                        const activeDotIndex = Math.min(
                            Math.floor(scrollPercentage * dots.length),
                            dots.length - 1
                        );
                        
                        // Actualizar las clases de los puntos
                        dots.forEach((dot, index) => {
                            if (index === activeDotIndex) {
                                dot.classList.add('active');
                            } else {
                                dot.classList.remove('active');
                            }
                        });
                    }
                    
                    // Escuchar eventos de scroll
                    row.addEventListener('scroll', updatePanelIndicator);
                    
                    // Permitir hacer clic en los puntos para navegar
                    dots.forEach((dot, index) => {
                        dot.addEventListener('click', function() {
                            const scrollWidth = row.scrollWidth - row.clientWidth;
                            const scrollTo = (index / (dots.length - 1)) * scrollWidth;
                            
                            row.scrollTo({
                                left: scrollTo,
                                behavior: 'smooth'
                            });
                        });
                    });
                    
                    // Inicializar el indicador de paneles
                    updatePanelIndicator();
                }
            });
        }
    }
    
    // Configurar el widget de chat IA
    const aiChatButton = document.querySelector('.ai-chat-button');
    const aiChatContainer = document.querySelector('.ai-chat-container');
    const aiChatMinimize = document.querySelector('.ai-chat-minimize');
    const aiChatBackdrop = document.querySelector('.ai-chat-backdrop');
    
    if (aiChatButton && aiChatContainer) {
        // Función para mostrar el chat
        function showAiChat() {
            aiChatContainer.style.display = 'flex';
            
            // Forzar un reflow para que la transición funcione
            aiChatContainer.offsetHeight;
            
            aiChatContainer.classList.add('active');
            aiChatButton.classList.add('active');
            
            // Crear backdrop si no existe
            if (!aiChatBackdrop) {
                const backdrop = document.createElement('div');
                backdrop.classList.add('ai-chat-backdrop');
                document.body.appendChild(backdrop);
                
                setTimeout(() => {
                    backdrop.classList.add('active');
                }, 10);
            }
        }
        
        // Función para ocultar el chat
        function hideAiChat() {
            aiChatContainer.classList.remove('active');
            aiChatButton.classList.remove('active');
            
            // Remover backdrop si existe
            const backdrop = document.querySelector('.ai-chat-backdrop');
            if (backdrop) {
                backdrop.classList.remove('active');
                
                setTimeout(() => {
                    backdrop.remove();
                }, 300);
            }
            
            // Esperar a que termine la transición antes de ocultar
            setTimeout(() => {
                aiChatContainer.style.display = 'none';
            }, 300);
        }
        
        // Mostrar/ocultar chat al hacer clic en el botón
        aiChatButton.addEventListener('click', function() {
            if (aiChatContainer.classList.contains('active')) {
                hideAiChat();
            } else {
                showAiChat();
            }
        });
        
        // Minimizar chat al hacer clic en el botón de minimizar
        if (aiChatMinimize) {
            aiChatMinimize.addEventListener('click', hideAiChat);
        }
        
        // Cerrar chat al hacer clic fuera (en el backdrop)
        document.addEventListener('click', function(e) {
            const backdrop = document.querySelector('.ai-chat-backdrop');
            if (backdrop && e.target === backdrop) {
                hideAiChat();
            }
        });
    }

    // Manejo del cambio de tema
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        // Verificar si hay un tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }

        themeSwitch.addEventListener('click', function() {
            // Añadir efecto de transición al body
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            
            // Cambiar el tema
            document.body.classList.toggle('light-theme');
            
            // Añadir efecto al botón
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Guardar preferencia
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
            
            // Quitar la transición después de un tiempo
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Navegación del logo según estado de sesión
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            // Verificar si estamos en una página con sesión iniciada
            const isUserLoggedIn = document.body.classList.contains('profile-page') || 
                               window.location.href.includes('mobile-InicioConSesion') ||
                               window.location.href.includes('mobile-Apuestas') ||
                               window.location.href.includes('mobile-Rankings') ||
                               window.location.href.includes('mobile-Social') ||
                               window.location.href.includes('mobile-Historial');
            
            if (isUserLoggedIn) {
                // Si tiene sesión iniciada, ir a la página de inicio con sesión
                window.location.href = 'mobile-InicioConSesion.html';
            } else {
                // Si no tiene sesión iniciada, ir al index
                window.location.href = '../index.html';
            }
        });
    }
    
    // Funcionalidad para los botones de cierre de menús
    if (closeTopMenuBtn) {
        closeTopMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            topMenu.classList.remove('active');
            hamburgerHeader.classList.remove('active');
            headerOverlay.classList.remove('active');
        });
    }
    
    if (closeMainNavBtn) {
        closeMainNavBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.remove('active');
            hamburgerNav.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    }
    
    // Configuración de los paneles deslizantes
    const panelsRow = document.querySelector('.panels-row');
    const panelDots = document.querySelectorAll('.panel-dot');
    
    if (panelsRow && panelDots.length > 0) {
        // Inicializar el indicador de paneles
        function updatePanelIndicator() {
            const scrollPosition = panelsRow.scrollLeft;
            const maxScroll = panelsRow.scrollWidth - panelsRow.clientWidth;
            const scrollPercentage = scrollPosition / maxScroll;
            
            // Calcular qué punto debe estar activo
            const activeDotIndex = Math.min(
                Math.floor(scrollPercentage * panelDots.length),
                panelDots.length - 1
            );
            
            // Actualizar las clases de los puntos
            panelDots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Escuchar eventos de scroll en los paneles
        panelsRow.addEventListener('scroll', updatePanelIndicator);
        
        // Permitir hacer clic en los puntos para navegar
        panelDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const scrollWidth = panelsRow.scrollWidth - panelsRow.clientWidth;
                const scrollTo = (index / (panelDots.length - 1)) * scrollWidth;
                
                panelsRow.scrollTo({
                    left: scrollTo,
                    behavior: 'smooth'
                });
            });
        });
        
        // Inicializar el indicador de paneles
        setTimeout(updatePanelIndicator, 100);
    }

    // Función para inicializar la tabla de rankings
    function initRankingsTable() {
        const rankingsTable = document.querySelector('.mobile-rankings-table');
        if (rankingsTable) {
            // Asegurarse de que las filas de la tabla sean visibles
            const tableRows = rankingsTable.querySelectorAll('tbody tr');
            tableRows.forEach((row, index) => {
                // Añadir un pequeño retraso para crear un efecto de cascada
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateY(0)';
                }, index * 100);
            });

            // Añadir efecto hover a las filas
            tableRows.forEach(row => {
                row.addEventListener('mouseenter', () => {
                    row.style.backgroundColor = 'rgba(0, 255, 0, 0.05)';
                });
                row.addEventListener('mouseleave', () => {
                    row.style.backgroundColor = 'transparent';
                });
            });
        }
    }

    // Inicializar la tabla de rankings cuando el documento esté listo
    initRankingsTable();
    
    // Asegurarse de que los enlaces de navegación funcionen correctamente
    const mainNavLinks = document.querySelectorAll('.main-nav a');
    mainNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href) {
                // Mostrar el spinner de carga
                const pageLoader = document.getElementById('page-loader');
                if (pageLoader) {
                    pageLoader.classList.add('active');
                }
                
                // Navegar a la página después de un pequeño retraso
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
                
                e.preventDefault();
            }
        });
    });
}); 