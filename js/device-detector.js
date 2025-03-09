/**
 * Detector de dispositivos móviles para BettingsGPM
 * Este script detecta si el usuario está en un dispositivo móvil
 * y lo redirige a la versión móvil del sitio.
 */

(function() {
    // Función para detectar dispositivos móviles
    function isMobileDevice() {
        // Verificar si la pantalla es menor a 768px (tamaño típico de tablet/móvil)
        if (window.innerWidth <= 768) {
            return true;
        }
        
        // Verificar mediante User Agent (método complementario)
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        
        return mobileRegex.test(userAgent);
    }

    // Función para obtener la URL de la versión móvil
    function getMobileUrl() {
        const currentPath = window.location.pathname;
        const currentFilename = currentPath.split('/').pop();
        
        // Si ya estamos en la versión móvil, no hacer nada
        if (currentPath.includes('/mobile/')) {
            return null;
        }
        
        // Si estamos en la raíz o en index.html, redirigir a mobile-index.html
        if (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentFilename === '') {
            return 'mobile/mobile-index.html';
        }
        
        // Para otras páginas, mapear a su versión móvil
        const pageMap = {
            'InicioSesion.html': 'mobile-iniciosesion.html',
            'Registro.html': 'mobile-registro.html',
            'Perfil.html': 'mobile-perfil.html',
            'Apuestas.html': 'mobile-apuestas.html',
            'Rankings.html': 'mobile-rankings.html',
            'Social.html': 'mobile-social.html',
            'InicioConSesion.html': 'mobile-inicioconSesion.html'
        };
        
        if (pageMap[currentFilename]) {
            return 'mobile/' + pageMap[currentFilename];
        }
        
        // Si no hay mapeo específico, redirigir a la página principal móvil
        return 'mobile/mobile-index.html';
    }

    // Función principal para redirigir si es necesario
    function redirectIfMobile() {
        // Verificar si el usuario ha elegido explícitamente la versión desktop
        const preferDesktop = localStorage.getItem('preferDesktop') === 'true';
        
        if (isMobileDevice() && !preferDesktop) {
            const mobileUrl = getMobileUrl();
            if (mobileUrl) {
                window.location.href = mobileUrl;
            }
        }
    }

    // Ejecutar la redirección cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', redirectIfMobile);
    
    // También ejecutar inmediatamente para evitar parpadeos
    if (document.readyState === 'loading') {
        redirectIfMobile();
    }
})(); 