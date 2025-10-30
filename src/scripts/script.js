

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

const carousel = document.getElementById("carousel");
const cards = document.querySelectorAll(".chars__card");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsContainer = document.getElementById("carouselDots");

let currentIndex = 0;
let autoSlideInterval;
const autoSlideDelay = 5000; // tempo entre slides (ms)

// === Cria os pontinhos de navegação ===
cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
        goToSlide(index);
        resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll(".dot");

// === Funções principais ===
function updateDots() {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
}

function goToSlide(index) {
    currentIndex = (index + cards.length) % cards.length;
    const cardWidth = cards[0].offsetWidth + 16; // inclui gap entre cards
    carousel.scrollTo({ left: cardWidth * currentIndex, behavior: "smooth" });
    updateDots();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

// === Setas de navegação ===
if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });
    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });
}

// === Auto-play (passa automaticamente) ===
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// === Interações do usuário (mouse e toque) ===
if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
    carousel.addEventListener("mouseleave", startAutoSlide);

  // Suporte a toque no mobile (swipe)
    let startX = 0;
    carousel.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        clearInterval(autoSlideInterval);
    });
    carousel.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextSlide(); // arrastar pra esquerda → próximo
        else if (endX - startX > 50) prevSlide(); // arrastar pra direita → anterior
        startAutoSlide();
    });
}

// === Inicializa o carrossel ===
if (carousel && cards.length > 0) {
    goToSlide(0);
    startAutoSlide();
}


// ================================
// 🌫️ ANIMAÇÃO DE ENTRADA (Hero)
// ================================

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
