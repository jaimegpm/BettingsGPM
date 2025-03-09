document.addEventListener('DOMContentLoaded', function() {
    const peoplePanel = document.getElementById('people-panel');
    const groupsPanel = document.getElementById('groups-panel');
    const nextButton = document.querySelector('.mobile-nav-arrow.next');
    const prevButton = document.querySelector('.mobile-nav-arrow.prev');

    // Función para cambiar entre paneles con animación
    function switchPanel(fromPanel, toPanel) {
        // Añadir clase de salida
        fromPanel.classList.add('fade-out');
        
        // Esperar a que termine la animación de salida
        setTimeout(() => {
            fromPanel.classList.remove('active');
            fromPanel.classList.remove('fade-out');
            
            // Mostrar el nuevo panel
            toPanel.classList.add('active');
        }, 300);
    }

    // Evento para el botón de siguiente (ir a grupos)
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            switchPanel(peoplePanel, groupsPanel);
        });
    }

    // Evento para el botón de anterior (volver a personas)
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            switchPanel(groupsPanel, peoplePanel);
        });
    }

    // Funcionalidad para los botones de agregar/unirse
    const addButtons = document.querySelectorAll('.mobile-add-friend-btn, .mobile-join-group-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Agregar') {
                this.textContent = 'Pendiente';
                this.style.borderColor = '#ffd700';
                this.style.color = '#ffd700';
            } else if (this.textContent === 'Unirse') {
                this.textContent = 'Solicitado';
                this.style.borderColor = '#ffd700';
                this.style.color = '#ffd700';
            }
        });
    });
}); 