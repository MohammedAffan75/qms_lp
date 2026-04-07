/**
 * QMS Professional Landing Page Scripts
 */

// Initialize Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Counter Animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    entry.target.innerText = Math.ceil(count) + (entry.target.innerText.includes('%') || target <= 100 ? '%' : '');
                    if (target > 1000 && !entry.target.innerText.includes('k')) {
                         // Keep k if it was there
                    }
                    setTimeout(updateCount, 16);
                } else {
                    entry.target.innerText = target + (target <= 100 ? '%' : '');
                    if(target === 10) entry.target.innerText = '10k+';
                }
            };
            if(entry.target.innerText === '0') updateCount();
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    // Navbar scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Start Project logic (Backend Link)
async function startProject(e) {
    const btn = e.target;
    const originalText = btn.innerText;

    btn.innerText = 'Initializing...';
    btn.disabled = true;

    try {
        // Mock API call
        await new Promise(r => setTimeout(r, 1500)); 
        
        // Success state
        btn.innerText = 'Ready!';
        btn.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            alert('Welcome to QMS! Your dashboard environment is ready.');
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 500);
        
    } catch (error) {
        console.error('Error:', error);
        btn.innerText = 'Error';
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

const startBtns = [
    document.getElementById('startProjectBtnNav'),
    document.getElementById('startProjectBtnHero')
];

startBtns.forEach(btn => {
    if(btn) btn.addEventListener('click', startProject);
});
