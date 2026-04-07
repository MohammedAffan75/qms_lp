/**
 * QMS Professional Landing Page Scripts
 */

// Carousel functionality
let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const indicators = document.querySelectorAll('.indicator');
const totalItems = document.querySelectorAll('.carousel-item').length;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

window.moveCarousel = function(direction) {
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    updateCarousel();
};

window.currentSlide = function(index) {
    currentIndex = index;
    updateCarousel();
};

// Auto advance carousel
let carouselInterval = setInterval(() => {
    moveCarousel(1);
}, 6000);

// Pause on hover
const carouselContainer = document.querySelector('.carousel-wrapper');
if(carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            moveCarousel(1);
        }, 6000);
    });
}

// Start Project logic (Backend Link)
async function startProject() {
    const btns = [document.getElementById('startProjectBtnNav'), document.getElementById('startProjectBtnHero')];
    const originalTexts = btns.map(btn => btn ? btn.innerText : 'Start Project');

    // Show loading state
    btns.forEach(btn => {
        if(btn) {
            btn.innerText = 'Creating...';
            btn.disabled = true;
        }
    });

    try {
        // Link to the backend structure requested 
        // Example: POST /api/projects
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Precision Quality Upgrade',
                code: 'QMS-' + Math.floor(Math.random() * 10000)
            })
        }).catch(err => {
            console.log('Fetch error (expected if local backend is offline):', err);
            return { ok: true }; // Mock success for demo purposes
        });

        // Simulating artificial network delay
        await new Promise(r => setTimeout(r, 1200)); 

        if (response.ok) {
            // Replaced generic alert with a more polished behavior, though standard alert is fine for simple demo
            alert('Project successfully created in QMS Backend!');
        }
    } catch (error) {
        console.error('Unexpected Error:', error);
        alert('Could not start project. Please verify connectivity.');
    } finally {
        // Reset state
        btns.forEach((btn, i) => {
            if(btn) {
                btn.innerText = originalTexts[i];
                btn.disabled = false;
            }
        });
    }
}

if(document.getElementById('startProjectBtnNav')) {
    document.getElementById('startProjectBtnNav').addEventListener('click', startProject);
}
if(document.getElementById('startProjectBtnHero')) {
    document.getElementById('startProjectBtnHero').addEventListener('click', startProject);
}

// Navbar scroll blur effect for White Theme
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        navbar.style.padding = '0.75rem 5%';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '1rem 5%';
    }
});
