// Enhanced script.js with theme toggle, animations, and all interactive features
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
    initNumberCounters();
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
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(newTheme);
        
        // Dispatch custom event for theme change
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    });
    
    function updateThemeToggle(theme) {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    }
}

// Navigation Functionality - FIXED FOR MOBILE
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // FIXED: Close mobile menu when clicking on a link BUT ALLOW NAVIGATION
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // Only close the menu, don't prevent navigation
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Update active navigation link based on scroll position
    initScrollSpy();
}

// Scroll Spy for Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Scroll Animations
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
        .comparison-table, .celebration-content
    `);
    
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, href);
            }
        });
    });
}

// Header Effects
function initHeaderEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Background and blur effect
        if (scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
        
        // Hide/show navbar on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        
        // Update progress indicator
        updateScrollProgress();
    });
    
    function updateScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
    }
    
    // Create scroll progress bar if it doesn't exist
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
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
    
    const alphabetDescriptions = {
        'A': 'Si në "ardhje"',
        'B': 'Si në "bisedë"',
        'C': 'Si në "cimbidh"',
        'Ç': 'Si në "çelës"',
        'D': 'Si në "dashuri"',
        'Dh': 'Si në "dhëmb"',
        'E': 'Si në "emër"',
        'Ë': 'Si në "ëndërr"',
        'F': 'Si në "familje"',
        'G': 'Si në "gur"',
        'Gj': 'Si në "gjuhë"',
        'H': 'Si në "house"',
        'I': 'Si në "ide"',
        'J': 'Si në "jetë"',
        'K': 'Si në "kohë"',
        'L': 'Si në "lum"',
        'Ll': 'Si në "llambë"',
        'M': 'Si në "mëngjes"',
        'N': 'Si në "natë"',
        'Nj': 'Si në "një"',
        'O': 'Si në "orë"',
        'P': 'Si në "punë"',
        'Q': 'Si në "qytet"',
        'R': 'Si në "rrugë"',
        'Rr': 'Si në "rrëfenj"',
        'S': 'Si në "shkollë"',
        'Sh': 'Si në "shpresë"',
        'T': 'Si në "tokë"',
        'Th': 'Si në "thëllëz"',
        'U': 'Si në "udhë"',
        'V': 'Si në "vend"',
        'X': 'Si në "xixë"',
        'Xh': 'Si në "xham"',
        'Y': 'Si në "yll"',
        'Z': 'Si në "zë"',
        'Zh': 'Si në "zhurmë"'
    };
    
    alphabetGrid.innerHTML = shqipAlphabet.map(letter => 
        `<div class="letter-card" data-letter="${letter}">
            <span class="letter">${letter}</span>
            <div class="letter-tooltip">
                <strong>${letter}</strong><br>
                ${alphabetDescriptions[letter] || ''}
            </div>
        </div>`
    ).join('');
    
    // Add interactivity to letter cards
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            letterCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            speakLetter(this.dataset.letter);
            
            // Auto remove active class after 2 seconds
            setTimeout(() => {
                this.classList.remove('active');
            }, 2000);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '1';
            }
        });
        
        // Touch device support
        card.addEventListener('touchstart', function() {
            this.classList.add('touched');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => this.classList.remove('touched'), 150);
        });
    });
    
    function speakLetter(letter) {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(letter);
            utterance.lang = 'sq-AL';
            utterance.rate = 0.7;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            // Get available voices and try to find Albanian
            const voices = speechSynthesis.getVoices();
            const albanianVoice = voices.find(voice => 
                voice.lang.includes('sq') || voice.lang.includes('al')
            );
            
            if (albanianVoice) {
                utterance.voice = albanianVoice;
            }
            
            speechSynthesis.speak(utterance);
        }
    }
    
    // Initialize speech synthesis voices when they become available
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = () => {
            console.log('Voices loaded:', speechSynthesis.getVoices().length);
        };
    }
}

// People Filter Functionality
function initPeopleFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const peopleCards = document.querySelectorAll('.person-card');
    const resultsCount = document.querySelector('.results-count');
    
    if (filterBtns.length === 0 || peopleCards.length === 0) return;
    
    // Create results count element if it doesn't exist
    if (!resultsCount) {
        const filterContainer = document.querySelector('.people-filter');
        if (filterContainer) {
            const countElement = document.createElement('div');
            countElement.className = 'results-count';
            countElement.textContent = `${peopleCards.length} rezultate`;
            filterContainer.appendChild(countElement);
        }
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            const filter = this.getAttribute('data-filter');
            
            let visibleCount = 0;
            
            peopleCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update results count
            updateResultsCount(visibleCount);
            
            // Animate in visible cards
            animateVisibleCards();
        });
    });
    
    function updateResultsCount(count) {
        const resultsElement = document.querySelector('.results-count');
        if (resultsElement) {
            resultsElement.textContent = `${count} ${count === 1 ? 'rezultat' : 'rezultate'}`;
            resultsElement.classList.add('updated');
            setTimeout(() => resultsElement.classList.remove('updated'), 300);
        }
    }
    
    function animateVisibleCards() {
        const visibleCards = document.querySelectorAll('.person-card[style*="display: block"]');
        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
        });
    }
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Add sequential animation delay
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Add click to expand functionality
        const content = item.querySelector('.timeline-content');
        if (content) {
            const originalHeight = content.scrollHeight;
            
            item.addEventListener('click', () => {
                const isExpanded = content.classList.contains('expanded');
                
                if (isExpanded) {
                    content.classList.remove('expanded');
                    content.style.maxHeight = '150px';
                } else {
                    content.classList.add('expanded');
                    content.style.maxHeight = `${originalHeight}px`;
                }
            });
            
            // Initialize with collapsed state
            content.style.maxHeight = '150px';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
        }
    });
}

// Number Counter Animations
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

// Stats Counter for Stats Section
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

// Interactive Elements
function initInteractiveElements() {
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Ripple effect
        button.addEventListener('click', function(e) {
            if (this.classList.contains('no-ripple')) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            // Remove existing ripples
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(rip => rip.remove());
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .person-card, .fact-card, .legacy-card, .detail-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Table row hover effects
    const tableRows = document.querySelectorAll('tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--gray-50)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// Page Transitions
function initPageTransitions() {
    // Add loading state
    document.body.classList.add('loading');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Animate hero elements sequentially
            const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-date, .hero-actions');
            heroElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
                el.classList.add('fade-in-up');
            });
        }, 100);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttle the parallax update
    const throttledUpdate = throttle(updateParallax, 16);
    window.addEventListener('scroll', throttledUpdate);
}

// Floating Letters Animation
function initFloatingLetters() {
    const floatingLetters = document.querySelectorAll('.floating-letter');
    
    floatingLetters.forEach((letter, index) => {
        // Randomize animation
        const duration = 6 + Math.random() * 4;
        const delay = Math.random() * 2;
        const rotation = Math.random() * 10 - 5;
        
        letter.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        letter.style.setProperty('--rotation', `${rotation}deg`);
    });
}

// Image Lazy Loading
function initImageLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                    
                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 100);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Print Button
function initPrintButton() {
    const printButton = document.querySelector('.print-btn');
    if (!printButton) return;
    
    printButton.addEventListener('click', () => {
        window.print();
    });
}

// Share Buttons
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = window.location.href;
            const title = document.title;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'U kopjua!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Kthehu në fillim');
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100));
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                this.classList.add('shake');
                setTimeout(() => this.classList.remove('shake'), 500);
            }
        });
        
        // Real-time validation
        const inputs = this.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    });
}

// Audio Player for Albanian Alphabet Pronunciation
function initAudioPlayer() {
    const audioPlayer = document.createElement('div');
    audioPlayer.className = 'audio-player';
    audioPlayer.innerHTML = `
        <audio id="alphabet-audio" preload="none"></audio>
        <button class="audio-control" aria-label="Luaj shqiptimin">
            🔊
        </button>
    `;
    
    const alphabetSection = document.querySelector('.alphabet-section');
    if (alphabetSection) {
        alphabetSection.appendChild(audioPlayer);
        
        const audioControl = audioPlayer.querySelector('.audio-control');
        const audio = audioPlayer.querySelector('#alphabet-audio');
        
        audioControl.addEventListener('click', () => {
            if (audio.paused) {
                // Play alphabet pronunciation
                playAlphabetPronunciation();
                audioControl.textContent = '⏸️';
            } else {
                audio.pause();
                audioControl.textContent = '🔊';
            }
        });
        
        audio.addEventListener('ended', () => {
            audioControl.textContent = '🔊';
        });
    }
    
    function playAlphabetPronunciation() {
        // This would typically play an audio file with alphabet pronunciation
        console.log('Playing Albanian alphabet pronunciation...');
        // In a real implementation, you would set audio.src to your audio file
    }
}

// Custom Alphabet Animations
function animateAlphabet() {
    const letterCards = document.querySelectorAll('.letter-card');
    
    letterCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
        card.classList.add('fade-in-up');
    });
}

// Custom People Animations
function animatePeople() {
    const peopleCards = document.querySelectorAll('.person-card');
    
    peopleCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
}

// Custom Timeline Animations
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
        item.classList.add('fade-in-up');
    });
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }, 0);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Tab key handling for better accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Print Styles Enhancement
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Internationalization
const i18n = {
    sq: {
        results: 'rezultate',
        loading: 'Duke ngarkuar...',
        menu: 'Menu'
    },
    en: {
        results: 'results',
        loading: 'Loading...',
        menu: 'Menu'
    }
};

// Additional CSS for enhanced interactions
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .page-transition-out {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .loading {
        cursor: wait;
    }
    
    .loaded .loading-indicator {
        display: none;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-color);
        z-index: 1001;
        transition: width 0.1s ease;
    }
    
    .letter-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gray-800);
        color: var(--white);
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.75rem;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 10;
    }
    
    .letter-card:hover .letter-tooltip {
        opacity: 1;
    }
    
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
        box-shadow: var(--shadow-lg);
    }
    
    .back-to-top.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
    }
    
    .results-count {
        font-size: 0.9rem;
        color: var(--text-light);
        margin-top: 1rem;
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .results-count.updated {
        transform: scale(1.1);
        color: var(--primary-color);
    }
    
    .audio-player {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000;
    }
    
    .audio-control {
        width: 50px;
        height: 50px;
        background: var(--accent-color);
        color: var(--secondary-color);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: var(--transition);
    }
    
    .audio-control:hover {
        transform: scale(1.1);
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .error {
        border-color: #e53e3e !important;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* FIX FOR MOBILE NAVIGATION */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 80px;
            flex-direction: column;
            background: var(--white);
            width: 100%;
            height: calc(100vh - 80px);
            text-align: center;
            transition: left 0.3s ease;
            box-shadow: var(--shadow-lg);
            padding: 2rem 0;
            gap: 0;
            overflow-y: auto;
            z-index: 999;
        }

        [data-theme="dark"] .nav-menu {
            background: var(--dark-bg);
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-item {
            margin: 0;
            width: 100%;
        }

        .nav-link {
            display: block;
            padding: 1.5rem 2rem;
            border-bottom: 1px solid var(--gray-200);
            font-size: 1.1rem;
            text-decoration: none;
        }

        [data-theme="dark"] .nav-link {
            border-bottom-color: var(--gray-700);
        }

        .nav-link:last-child {
            border-bottom: none;
        }
        
        /* Ensure hamburger is visible */
        .hamburger {
            display: flex !important;
        }
    }
    
    /* Desktop menu always visible */
    @media (min-width: 769px) {
        .nav-menu {
            display: flex !important;
        }
        
        .hamburger {
            display: none !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

function initAll() {
    // All initialization functions are called at the top level
    console.log('Kongresi i Manastirit - Faqja u inicializua me sukses!');
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeToggle,
        initNavigation,
        initScrollAnimations,
        animateNumbers,
        debounce,
        throttle
    };
}
