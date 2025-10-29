const carousel = document.getElementById("carousel");
const dots = document.getElementById("carouselDots");
const itens = carousel.querySelectorAll(".chars__carousel__item");
const totalItens = itens.length;
const menu = document.querySelector('menu');

itens.forEach((item, index) => {
    const dot = document.createElement("span"); 
    dot.classList.add("chars__dot"); 
    dot.dataset.index = index; 
    if (index === 0) dot.classList.add("active");
    dots.appendChild(dot);
});
function goToSlide(index) {
    const cardWidth = itens[0].offsetWidth + 16;
    carousel.scrollTo({
        left: cardWidth * index,
        behavior: "smooth"
    });
    dots.querySelectorAll(".chars__dot").forEach(dot => dot.classList.remove("active"));
    dots.querySelector(`.chars__dot[data-index="${index}"]`).classList.add("active");
}
dots.querySelectorAll(".chars__dot").forEach(dot => {
    dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index);
        goToSlide(index);
    });
});
setInterval(() => {
    const currentDot = dots.querySelector(".chars__dot.active");
    const currentIndex = parseInt(currentDot.dataset.index);
    const nextIndex = (currentIndex + 1) % totalItens;
    goToSlide(nextIndex);
}, 4000);
