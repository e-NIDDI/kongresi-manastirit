// Enhanced mobile-compatible script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Kongresi i Manastirit website...');
    
    // Initialize all functionality with error handling
    try {
        initThemeToggle();
        initNavigation();
        initScrollAnimations();
        initSmoothScrolling();
        initHeaderEffects();
        initAlphabetGrid();
        initPeopleFilter();
        initTimelineAnimations();
        initNumberCounters();
        initInteractiveElements();
        initPageTransitions();
        initMobileTouchEvents();
        initLazyLoading();
        initStatsCounter();
        initBackToTop();
        
        console.log('✅ All features initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing features:', error);
    }
});

// Mobile Touch Events Handler
function initMobileTouchEvents() {
    console.log('📱 Initializing mobile touch events...');
    
    // Prevent zoom on double tap (optional)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Improved touch handling for buttons
    const buttons = document.querySelectorAll('button, .cta-button, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.log('ℹ️ Theme toggle not found');
        return;
    }
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle(currentTheme);
    
    // Click event
    themeToggle.addEventListener('click', handleThemeToggle);
    
    // Touch event for mobile
    themeToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        handleThemeToggle();
    });
    
    function handleThemeToggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(newTheme);
    }
    
    function updateThemeToggle(theme) {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    }
}

// Navigation Functionality - MOBILE FIXED
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) {
        console.log('ℹ️ Navigation elements not found');
        return;
    }
    
    console.log('🍔 Hamburger menu found, adding event listeners...');
    
    // Click event
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Touch event for mobile
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMobileMenu();
    });
    
    function toggleMobileMenu() {
        console.log('📱 Toggling mobile menu...');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Add animation class for smooth transition
        if (navMenu.classList.contains('active')) {
            navMenu.style.transform = 'translateX(0)';
        } else {
            navMenu.style.transform = 'translateX(-100%)';
        }
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
        link.addEventListener('touchstart', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    });
    
    function closeMobileMenu() {
        console.log('📱 Closing mobile menu...');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        navMenu.style.transform = 'translateX(-100%)';
    }
    
    // Close menu when clicking outside (improved for mobile)
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Touch outside to close (mobile specific)
    document.addEventListener('touchstart', function(e) {
        if (navMenu.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        console.log('ℹ️ IntersectionObserver not supported, using fallback');
        initScrollAnimationsFallback();
        return;
    }
    
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
                    animateNumbers();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatedElements = document.querySelectorAll(`
        .feature-card, .timeline-item, .fact-card, .person-card,
        .section-header, .stats-grid, .people-grid, .alphabet-grid
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Fallback for older browsers
function initScrollAnimationsFallback() {
    console.log('Using scroll animation fallback');
    const elements = document.querySelectorAll('.feature-card, .timeline-item');
    elements.forEach(el => {
        el.classList.add('fade-in-up');
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#top') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Touch support
        anchor.addEventListener('touchstart', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Header Effects
function initHeaderEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class for background
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', onScroll, { passive: true });
}

// Alphabet Grid Functionality
function initAlphabetGrid() {
    const alphabetGrid = document.querySelector('.alphabet-grid');
    if (!alphabetGrid) return;
    
    const shqipAlphabet = [
        'A', 'B', 'C', 'Ç', 'D', 'Dh', 'E', 'Ë', 'F', 'G', 'Gj', 'H', 'I',
        'J', 'K', 'L', 'Ll', 'M', 'N', 'Nj', 'O', 'P', 'Q', 'R', 'Rr', 'S',
        'Sh', 'T', 'Th', 'U', 'V', 'X', 'Xh', 'Y', 'Z', 'Zh'
    ];
    
    alphabetGrid.innerHTML = shqipAlphabet.map(letter => 
        `<div class="letter-card" data-letter="${letter}">
            <span class="letter">${letter}</span>
        </div>`
    ).join('');
    
    // Add interactivity to letter cards
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        // Click event
        card.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Touch events for mobile
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
        });
    });
}

// People Filter Functionality
function initPeopleFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const peopleCards = document.querySelectorAll('.person-card');
    
    if (filterBtns.length === 0 || peopleCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        // Click event
        btn.addEventListener('click', function() {
            handleFilter(this.getAttribute('data-filter'));
        });
        
        // Touch event
        btn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            handleFilter(this.getAttribute('data-filter'));
        });
    });
    
    function handleFilter(filter) {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        event.target.classList.add('active');
        
        peopleCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Number Counter Animations - SIMPLIFIED VERSION
function initNumberCounters() {
    const numberElements = document.querySelectorAll('[data-count]');
    
    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        element.setAttribute('data-target', target);
        element.textContent = '0';
    });
}

function animateNumbers() {
    const numberElements = document.querySelectorAll('[data-target]');
    
    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Stats Counter
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Interactive Elements
function initInteractiveElements() {
    // Button interactions
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Page Transitions
function initPageTransitions() {
    // Remove loading class when page loads
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });
}

// Lazy Loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    // Click event
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Touch event
    backToTop.addEventListener('touchstart', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Error boundary for the entire app
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Add mobile-specific CSS through JavaScript
function injectMobileCSS() {
    const mobileCSS = `
        /* Mobile touch improvements */
        .touch-active {
            transform: scale(0.95) !important;
            transition: transform 0.1s ease !important;
        }
        
        /* Hamburger menu animation */
        .hamburger.active .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Mobile menu transitions */
        .nav-menu {
            transition: transform 0.3s ease;
        }
        
        /* Back to top button */
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .back-to-top.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Improved touch targets */
        @media (max-width: 768px) {
            .nav-link {
                padding: 1rem 2rem;
                min-height: 44px;
                display: flex;
                align-items: center;
            }
            
            .cta-button {
                min-height: 44px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            
            .filter-btn {
                min-height: 44px;
                padding: 12px 20px;
            }
        }
        
        /* Prevent blue highlight on tap */
        * {
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Loading state */
        .loading {
            cursor: wait;
        }
        
        .loaded .loading-indicator {
            display: none;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = mobileCSS;
    document.head.appendChild(style);
}

// Inject mobile CSS when DOM is ready
injectMobileCSS();

// Initialize everything
console.log('📱 Mobile-optimized JavaScript loaded successfully');

// Export for debugging
window.debugApp = {
    version: '1.0.0',
    features: {
        theme: initThemeToggle,
        navigation: initNavigation,
        animations: initScrollAnimations,
        numbers: initNumberCounters
    },
    test: function() {
        console.log('🧪 Running diagnostics...');
        console.log('Hamburger:', document.querySelector('.hamburger'));
        console.log('Nav menu:', document.querySelector('.nav-menu'));
        console.log('Theme toggle:', document.getElementById('themeToggle'));
    }
};
