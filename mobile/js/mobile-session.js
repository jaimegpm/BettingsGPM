/**
 * mobile-session.js
 * Este archivo maneja la funcionalidad de cerrar sesión, la navegación del logo
 * y el control del loader en todas las páginas móviles de BettingsGPM.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const logoutBtn = document.querySelector('.logout-btn');
    const logoutModal = document.getElementById('logout-modal');
    const confirmLogoutBtn = document.getElementById('confirm-logout');
    const cancelLogoutBtn = document.getElementById('cancel-logout');
    const logo = document.querySelector('.logo');
    const pageLoader = document.getElementById('page-loader');
    
    // Ocultar el spinner de carga cuando la página esté lista
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.remove('active');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 300);
        }, 500);
    }
    
    // Manejo del botón de cerrar sesión
    if (logoutBtn && logoutModal) {
        // Asegurarse de que el modal esté inicialmente oculto pero preparado
        logoutModal.style.display = 'none';
        
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Mostrar el modal de cierre de sesión
            logoutModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Forzar un reflow para que la transición funcione
            logoutModal.offsetHeight;
            
            // Añadir la clase active para la animación
            logoutModal.classList.add('active');
            
            // Cerrar menús si están abiertos
            const topMenu = document.querySelector('.top-menu');
            const hamburgerHeader = document.querySelector('.hamburger-header');
            const headerOverlay = document.querySelector('.header-overlay');
            
            if (topMenu) topMenu.classList.remove('active');
            if (hamburgerHeader) hamburgerHeader.classList.remove('active');
            if (headerOverlay) headerOverlay.classList.remove('active');
            
            console.log('Modal de cierre de sesión mostrado');
        });
    }
    
    // Manejo del botón de cancelar cierre de sesión
    if (cancelLogoutBtn && logoutModal) {
        cancelLogoutBtn.addEventListener('click', function() {
            // Quitar la clase active para la animación
            logoutModal.classList.remove('active');
            
            // Esperar a que termine la transición antes de ocultar
            setTimeout(() => {
                logoutModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
            
            console.log('Cierre de sesión cancelado');
        });
    }
    
    // Manejo del botón de confirmar cierre de sesión
    if (confirmLogoutBtn && logoutModal) {
        confirmLogoutBtn.addEventListener('click', function() {
            // Quitar la clase active para la animación
            logoutModal.classList.remove('active');
            
            console.log('Cierre de sesión confirmado');
            
            // Esperar a que termine la transición antes de ocultar
            setTimeout(() => {
                logoutModal.style.display = 'none';
                document.body.style.overflow = '';
                
                // Mostrar el loader antes de redirigir
                if (pageLoader) {
                    pageLoader.style.display = 'flex';
                    setTimeout(() => {
                        pageLoader.classList.add('active');
                    }, 10);
                }
                
                // Redirigir al index.html (página de inicio sin sesión)
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 300);
            }, 300);
        });
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    if (logoutModal) {
        logoutModal.addEventListener('click', function(e) {
            if (e.target === logoutModal) {
                // Quitar la clase active para la animación
                logoutModal.classList.remove('active');
                
                // Esperar a que termine la transición antes de ocultar
                setTimeout(() => {
                    logoutModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
                
                console.log('Modal cerrado al hacer clic fuera');
            }
        });
    }
    
    // Navegación del logo según estado de sesión
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostrar el loader antes de redirigir
            if (pageLoader) {
                pageLoader.style.display = 'flex';
                setTimeout(() => {
                    pageLoader.classList.add('active');
                }, 10);
            }
            
            // Verificar si estamos en una página con sesión iniciada
            const isLoggedIn = document.body.classList.contains('logged-in') || 
                               document.body.classList.contains('profile-page') || 
                               window.location.href.includes('mobile-InicioConSesion') ||
                               window.location.href.includes('mobile-Apuestas') ||
                               window.location.href.includes('mobile-Rankings') ||
                               window.location.href.includes('mobile-Social');
            
            setTimeout(() => {
                if (isLoggedIn) {
                    // Si tiene sesión iniciada, ir a la página de inicio con sesión
                    window.location.href = 'mobile-InicioConSesion.html';
                } else {
                    // Si no tiene sesión iniciada, ir al index
                    window.location.href = '../index.html';
                }
            }, 300);
        });
    }
}); 