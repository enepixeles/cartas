document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA INICIALIZAR CADA CARRUSEL POR SEPARADO ---
    const carruseles = document.querySelectorAll('.carousel-wrapper');

    carruseles.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const cards = Array.from(track.children);
        const nextButton = wrapper.querySelector('.arrow-right');
        const prevButton = wrapper.querySelector('.arrow-left');
        
        if (cards.length === 0) return;

        let currentIndex = 0;
        let cardWidth = 0;
        let visibleCards = 0;
        
        const calculateDimensions = () => {
            cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
            visibleCards = Math.round(track.parentElement.offsetWidth / cardWidth);
        };

        const updateCarouselState = () => {
            // Mostrar flechas solo si hay más tarjetas que las visibles
            if (cards.length > visibleCards) {
                nextButton.classList.add('visible');
                prevButton.classList.add('visible');
            } else {
                 nextButton.classList.remove('visible');
                 prevButton.classList.remove('visible');
            }
            updateArrows();
        };
        
        const updateArrows = () => {
            if (!prevButton || !nextButton) return;
            prevButton.disabled = currentIndex === 0;
            // La última posición posible es cuando la última tarjeta está a la vista
            nextButton.disabled = currentIndex >= cards.length - visibleCards;
        };

        const moveToCard = (targetIndex) => {
            // Asegurarse de no ir más allá de los límites
            const newIndex = Math.max(0, Math.min(targetIndex, cards.length - visibleCards));
            track.style.transform = `translateX(-${newIndex * cardWidth}px)`;
            currentIndex = newIndex;
            updateArrows();
        };

        nextButton.addEventListener('click', () => {
            moveToCard(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToCard(currentIndex - 1);
        });

        // Recalcular en cambio de tamaño de ventana
        window.addEventListener('resize', () => {
            calculateDimensions();
            updateCarouselState();
            track.style.transition = 'none'; // Evitar animación durante el reajuste
            moveToCard(currentIndex); // Reajusta la posición sin animación
            track.style.transition = ''; // Restaurar animación
        });
        
        // Inicialización
        calculateDimensions();
        updateCarouselState();
    });

    // --- LÓGICA DEL MODAL (ES GLOBAL Y FUNCIONA PARA TODAS LAS TARJETAS) ---
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const ctaButtons = document.querySelectorAll('.card-cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cardToClone = button.closest('.premio-card');
            const clonedCard = cardToClone.cloneNode(true);
            
            clonedCard.querySelector('.card-cta-button').remove(); // Quitar botón del clon

            modalContent.innerHTML = ''; // Limpiar contenido previo
            modalContent.appendChild(clonedCard);
            modalOverlay.classList.add('active');
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});