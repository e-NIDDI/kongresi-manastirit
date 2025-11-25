// Number Counter Animations - FIXED VERSION
function initNumberCounters() {
    const numberElements = document.querySelectorAll('.stat-number, .fact-number, .feature-stats .stat-number');
    
    numberElements.forEach(element => {
        // Check if element already has data-target to avoid re-initialization
        if (element.hasAttribute('data-target')) return;
        
        let target;
        if (element.hasAttribute('data-count')) {
            target = parseInt(element.getAttribute('data-count'));
        } else {
            target = parseInt(element.textContent.replace(/,/g, ''));
        }
        
        if (isNaN(target)) return;
        
        element.setAttribute('data-target', target);
        element.setAttribute('data-original', element.textContent);
        element.textContent = '0';
    });
}

function animateNumbers() {
    const numberElements = document.querySelectorAll('[data-target]');
    
    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = Date.now();
        
        function updateNumber() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target.toLocaleString();
                element.classList.add('completed');
                element.removeAttribute('data-target');
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

// Enhanced Stats Counter for Stats Section
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Re-initialize numbers before animating
                initNumberCounters();
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Fix for feature cards numbers
function initFeatureStats() {
    const featureStats = document.querySelectorAll('.feature-stats .stat-number');
    
    featureStats.forEach(stat => {
        if (!stat.hasAttribute('data-target')) {
            const target = parseInt(stat.textContent);
            if (!isNaN(target)) {
                stat.setAttribute('data-target', target);
                stat.textContent = '0';
            }
        }
    });
    
    // Animate when features section is visible
    const featuresSection = document.querySelector('.intro-section');
    if (featuresSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(featuresSection);
    }
}

// Update the scroll animations to include feature stats
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('stats-section')) {
                    initNumberCounters();
                    animateNumbers();
                }
                
                if (entry.target.classList.contains('features-section') || entry.target.classList.contains('intro-section')) {
                    initFeatureStats();
                    animateNumbers();
                }
                
                if (entry.target.classList.contains('timeline-section')) {
                    animateTimeline();
                }
                
                if (entry.target.classList.contains('alphabet-grid')) {
                    animateAlphabet();
                }
                
                if (entry.target.classList.contains('people-grid')) {
                    animatePeople();
                }
                
                if (entry.target.classList.contains('facts-section')) {
                    initNumberCounters();
                    animateNumbers();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatedElements = document.querySelectorAll(`
        .feature-card, .timeline-item, .fact-card, .person-card,
        .detail-card, .legacy-card, .impact-item, .letter-card,
        .section-header, .content-grid, .stats-grid, .people-grid,
        .alphabet-grid, .contributions-grid, .context-grid,
        .comparison-table, .celebration-content, .features-grid
    `);
    
    animatedElements.forEach(el => observer.observe(el));
}

// Update DOMContentLoaded to include feature stats
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initHeaderEffects();
    initAlphabetGrid();
    initPeopleFilter();
    initTimelineAnimations();
    initNumberCounters(); // Ensure numbers are initialized
    initFeatureStats();   // Initialize feature stats
    initInteractiveElements();
    initPageTransitions();
    initParallaxEffects();
    initFloatingLetters();
    initImageLazyLoading();
    initStatsCounter();
    initPrintButton();
    initShareButtons();
    initBackToTop();
    initFormValidation();
    initAudioPlayer();
    
    // Manual trigger for numbers if they're already visible
    setTimeout(() => {
        const visibleNumbers = document.querySelectorAll('.stat-number, .fact-number');
        visibleNumbers.forEach(num => {
            const rect = num.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                initNumberCounters();
                animateNumbers();
            }
        });
    }, 1000);
});
