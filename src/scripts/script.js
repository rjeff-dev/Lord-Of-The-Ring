

const menuToggle = document.getElementById('menu-toggle');
const headerNav = document.getElementById('header-nav');

// Abre e fecha o menu no mobile
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    headerNav.classList.toggle('active');
});

// Fecha o menu automaticamente ao clicar em um link
headerNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        headerNav.classList.remove('active');
    });
});



// ================================
// 🎠 CARROSSEL DOS PERSONAGENS
// ================================

const carousel = document.querySelector('.chars__carousel');
const dotsContainer = document.getElementById('carouselDots');
let autoSlideInterval;
let autoSlideDelay = 5000; // tempo entre slides (ms)
let currentIndex = 0;

// Captura todos os cards do carrossel
const cards = document.querySelectorAll('.chars__carousel__item');
const totalCards = cards.length;

// Cria os pontinhos de navegação
if (dotsContainer && totalCards > 0) {
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
            resetAutoSlide();
        });
    }
}

// Função que move o carrossel para o card ativo
function updateCarousel() {
    const offset = cards[currentIndex].offsetLeft - (carousel.offsetWidth / 2 - cards[currentIndex].offsetWidth / 2);
    carousel.scrollTo({ left: offset, behavior: 'smooth' });

  // Atualiza os dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Avança para o próximo card
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
}

// Volta para o card anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
}

// Inicia o slide automático
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
}

// Reinicia o temporizador quando o usuário interage
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Interação manual com setas
document.querySelectorAll('.chars__arrow').forEach(btn => {
    btn.addEventListener('click', e => {
        if (e.currentTarget.classList.contains('chars__arrow--left')) prevSlide();
        else nextSlide();
        resetAutoSlide();
    });
});

// Pausa o slide automático enquanto o usuário arrasta
if (carousel) {
    carousel.addEventListener('mousedown', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('touchstart', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseup', startAutoSlide);
    carousel.addEventListener('touchend', startAutoSlide);
}

// Inicia tudo
if (carousel && totalCards > 0) {
    updateCarousel();
    startAutoSlide();
}



// ================================
// 🌫️ ANIMAÇÃO DE ENTRADA (Hero)
// ================================

// Efeito suave de fade-in no texto da Hero
window.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});
