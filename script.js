document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();
    
    const slides = document.querySelectorAll('.slide');
    const counter = document.getElementById('slideCounter');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progressBar = document.getElementById('progressBar');
    
    let currentSlide = 0;

    function updateSlides() {
        // Force complete hide of all slides first
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
        
        // Show only active slide
        slides[currentSlide].classList.add('active');
        
        // Update Global UI
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
        counter.textContent = `${currentSlide + 1} / ${slides.length}`;
        
        // Control Button States
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

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
    });

    // Touch Support
    let touchstartX = 0;
    let touchendX = 0;
    
    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        if (touchendX < touchstartX - 50) nextSlide();
        if (touchendX > touchstartX + 50) prevSlide();
    });

    // Initial State
    updateSlides();
});
