document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const slides = document.querySelectorAll('.slide');
    const counter = document.getElementById('slideCounter');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progressBar = document.getElementById('progressBar');
    
    let currentSlide = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
        counter.textContent = `${currentSlide + 1} / ${slides.length}`;
        
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'all';
        nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentSlide === slides.length - 1 ? 'none' : 'all';
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
    });

    updateSlides();
});
