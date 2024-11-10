// index.html
class Slider {
    constructor() {
        this.currentIndex = 0;
        this.slides = [
            { image: "image/bandar_udara_wiriadinata.jpeg", text: "BANDARA WIRIADINATA TASIKMALAYA" },
            { image: "image/situ_gede.jpg", text: "WISATA SITU GEDE TASIKMALAYA" },
            { image: "image/Masjid_Agung_Tasikmalaya.jpg", text: "MASJID AGUNG KOTA TASIKMALAYA" },
            { image: "image/tamkot_tasikmalaya.jpg", text: "TAMAN KOTA TASIKMALAYA" },
            { image: "image/alun2_kota_tasikmalaya.jpg", text: "ALUN-ALUN KOTA TASIKMALAYA" },
            { image: "image/kai_tasikmalaya.jpg", text: "STASIUN KERETA API KOTA TASIKMALAYA" }
        ];
        this.sliderContainer = document.querySelector('.ihsan-slider');
        this.autoPlayInterval = null;
        this.setupSlider();
        this.startAutoPlay();
    }

    setupSlider() {
        this.sliderContainer.innerHTML = '';
        
        this.slides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
            
            const img = document.createElement('img');
            img.src = slide.image;
            img.alt = slide.text;
            img.addEventListener('error', () => {
                console.error(`Failed to load image: ${slide.image}`);
                img.src = 'image/placeholder.jpg';
            });
            
            const textOverlay = document.createElement('div');
            textOverlay.className = 'ihsan-text-overlay';
            textOverlay.textContent = slide.text;
            
            slideDiv.appendChild(img);
            slideDiv.appendChild(textOverlay);
            this.sliderContainer.appendChild(slideDiv);
        });

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'ihsan-progress-dots';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        this.sliderContainer.appendChild(dotsContainer);

        this.setupControls();
    }

    setupControls() {

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        let touchStartX = 0;
        let touchEndX = 0;

        this.sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        this.sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }

    goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        slides[this.currentIndex]?.classList.remove('active');
        dots[this.currentIndex]?.classList.remove('active');
        
        this.currentIndex = index;
        
        slides[this.currentIndex]?.classList.add('active');
        dots[this.currentIndex]?.classList.add('active');

        this.resetAutoPlay();
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});

// sejarah.html
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.ihsan-wrapper').forEach((section) => {
    observer.observe(section);
});

const tableRows = document.querySelectorAll('table tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.backgroundColor = '#f0f0f0';
        row.style.transition = 'background-color 0.3s ease';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.backgroundColor = '';
    });
});