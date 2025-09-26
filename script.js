document.addEventListener('DOMContentLoaded', () => {

    /**
     * INICIALIZADOR DE CARRUSELES
     */
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        if (!track) return;

        const cards = Array.from(track.children);
        const nextButton = wrapper.querySelector('.arrow-right');
        const prevButton = wrapper.querySelector('.arrow-left');
        let currentIndex = 0;

        if (cards.length === 0) return;

        const getVisibleCardsCount = () => {
            if (cards.length === 0) return 0;
            const cardWidth = cards[0].offsetWidth;
            const trackGap = parseInt(window.getComputedStyle(track).gap) || 0;
            const containerWidth = wrapper.querySelector('.carousel-container').offsetWidth;
            return Math.floor(containerWidth / (cardWidth + trackGap));
        };

        const updateCarousel = () => {
            const visibleCards = getVisibleCardsCount();
            
            if (cards.length > visibleCards) {
                nextButton.classList.add('visible');
                prevButton.classList.add('visible');
            } else {
                nextButton.classList.remove('visible');
                prevButton.classList.remove('visible');
            }

            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= cards.length - visibleCards;
            
            const cardWidth = cards[0].offsetWidth;
            const trackGap = parseInt(window.getComputedStyle(track).gap) || 0;
            const offset = -currentIndex * (cardWidth + trackGap);
            track.style.transform = `translateX(${offset}px)`;
        };
        
        nextButton.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        window.addEventListener('resize', updateCarousel);
        
        setTimeout(updateCarousel, 100);
    });


    /**
     * INICIALIZADOR DEL MODAL
     */
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    document.querySelectorAll('.premio-card').forEach(card => {
        card.addEventListener('click', () => {
            const cardColor = window.getComputedStyle(card).backgroundColor;
            const clonedCard = card.cloneNode(true);
            
            clonedCard.querySelector('.card-cta-button').remove();

            modalContent.innerHTML = '';
            modalContent.appendChild(clonedCard);
            modalOverlay.style.backgroundColor = cardColor;
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