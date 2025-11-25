// Enhanced script.js with theme toggle, animations, and all interactive features
document.addEventListener("DOMContentLoaded", function () {
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
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeToggle(currentTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeToggle(newTheme);

    // Dispatch custom event for theme change
    document.dispatchEvent(
      new CustomEvent("themeChanged", { detail: { theme: newTheme } }),
    );
  });

  function updateThemeToggle(theme) {
    themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${theme === "light" ? "dark" : "light"} mode`,
    );
  }
}

// Navigation Functionality
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Update active navigation link based on scroll position
  initScrollSpy();
}

// Scroll Spy for Navigation
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    rootMargin: "-20% 0px -80% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");

        // Special animations for specific elements
        if (entry.target.classList.contains("stats-section")) {
          animateNumbers();
        }

        if (entry.target.classList.contains("timeline-section")) {
          animateTimeline();
        }

        if (entry.target.classList.contains("alphabet-grid")) {
          animateAlphabet();
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const animatedElements = document.querySelectorAll(`
        .feature-card, .timeline-item, .fact-card, .person-card,
        .detail-card, .legacy-card, .impact-item, .letter-card,
        .section-header, .content-grid, .stats-grid, .people-grid
    `);

  animatedElements.forEach((el) => observer.observe(el));
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL without page jump
        history.pushState(null, null, href);
      }
    });
  });
}

// Header Effects
function initHeaderEffects() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Background and blur effect
    if (scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "var(--shadow-md)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "var(--shadow-sm)";
    }

    // Hide/show navbar on scroll
    if (scrollY > lastScrollY && scrollY > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = scrollY;

    // Update progress indicator
    updateScrollProgress();
  });

  function updateScrollProgress() {
    const progressBar = document.querySelector(".scroll-progress");
    if (!progressBar) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;
  }
}

// Alphabet Grid Functionality
function initAlphabetGrid() {
  const alphabetGrid = document.querySelector(".alphabet-grid");
  if (!alphabetGrid) return;

  const shqipAlphabet = [
    "A",
    "B",
    "C",
    "Ç",
    "D",
    "Dh",
    "E",
    "Ë",
    "F",
    "G",
    "Gj",
    "H",
    "I",
    "J",
    "K",
    "L",
    "Ll",
    "M",
    "N",
    "Nj",
    "O",
    "P",
    "Q",
    "R",
    "Rr",
    "S",
    "Sh",
    "T",
    "Th",
    "U",
    "V",
    "X",
    "Xh",
    "Y",
    "Z",
    "Zh",
  ];

  alphabetGrid.innerHTML = shqipAlphabet
    .map(
      (letter) =>
        `<div class="letter-card" data-letter="${letter}">
            <span class="letter">${letter}</span>
            <div class="letter-tooltip">Shkronja "${letter}"</div>
        </div>`,
    )
    .join("");

  // Add interactivity to letter cards
  const letterCards = document.querySelectorAll(".letter-card");
  letterCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("active");
      speakLetter(this.dataset.letter);
    });

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.05)";
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.zIndex = "1";
    });

    // Touch device support
    card.addEventListener("touchstart", function () {
      this.classList.add("touched");
    });

    card.addEventListener("touchend", function () {
      setTimeout(() => this.classList.remove("touched"), 150);
    });
  });

  function speakLetter(letter) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = "sq-AL";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  }
}

// People Filter Functionality
function initPeopleFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const peopleCards = document.querySelectorAll(".person-card");

  if (filterBtns.length === 0 || peopleCards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });

      // Add active class to clicked button
      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");

      const filter = this.getAttribute("data-filter");

      peopleCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");
        const shouldShow = filter === "all" || categories.includes(filter);

        if (shouldShow) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px) scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });

      // Update results count
      updateResultsCount(filter);
    });
  });

  function updateResultsCount(filter) {
    const resultsCount = document.querySelector(".results-count");
    if (!resultsCount) return;

    const visibleCount =
      filter === "all"
        ? peopleCards.length
        : Array.from(peopleCards).filter((card) =>
            card.getAttribute("data-category").includes(filter),
          ).length;

    resultsCount.textContent = `${visibleCount} rezultate`;
  }
}

// Timeline Animations
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item, index) => {
    // Add sequential animation delay
    item.style.animationDelay = `${index * 0.2}s`;

    // Add click to expand functionality
    const content = item.querySelector(".timeline-content");
    if (content) {
      item.addEventListener("click", () => {
        content.classList.toggle("expanded");
      });
    }
  });
}

// Number Counter Animations
function initNumberCounters() {
  const numberElements = document.querySelectorAll(
    ".stat-number, .fact-number",
  );

  numberElements.forEach((element) => {
    const target =
      parseInt(element.textContent) ||
      parseInt(element.getAttribute("data-count"));
    if (isNaN(target)) return;

    element.setAttribute("data-target", target);
    element.textContent = "0";
  });
}

function animateNumbers() {
  const numberElements = document.querySelectorAll("[data-target]");

  numberElements.forEach((element) => {
    const target = parseInt(element.getAttribute("data-target"));
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

    // Remove data-target to prevent re-animation
    element.removeAttribute("data-target");
  });
}

// Interactive Elements
function initInteractiveElements() {
  // Enhanced button interactions
  const buttons = document.querySelectorAll(".cta-button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

    // Ripple effect
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll(
    ".feature-card, .person-card, .fact-card",
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Image lazy loading
  initLazyLoading();
}

// Lazy Loading for Images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

// Page Transitions
function initPageTransitions() {
  // Add loading state
  document.body.classList.add("loading");

  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");

      // Animate hero elements sequentially
      const heroElements = document.querySelectorAll(
        ".hero-badge, .hero-title, .hero-subtitle, .hero-date, .hero-actions",
      );
      heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add("fade-in-up");
      });
    }, 100);
  });

  // Handle page navigation
  document.querySelectorAll("a[href]").forEach((link) => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener("click", (e) => {
        if (link.getAttribute("href").startsWith("#")) return;

        e.preventDefault();
        document.body.classList.add("page-transition-out");

        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      });
    }
  });
}

// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".parallax");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Floating Letters Animation
function initFloatingLetters() {
  const floatingLetters = document.querySelectorAll(".floating-letter");

  floatingLetters.forEach((letter, index) => {
    // Randomize animation
    const duration = 6 + Math.random() * 4;
    const delay = Math.random() * 2;
    const rotation = Math.random() * 10 - 5;

    letter.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    letter.style.setProperty("--rotation", `${rotation}deg`);
  });
}

// Custom Alphabet Animations
function animateAlphabet() {
  const letterCards = document.querySelectorAll(".letter-card");

  letterCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
    card.classList.add("fade-in-up");
  });
}

// Custom Timeline Animations
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.3}s`;
    item.classList.add("fade-in-up");
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
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error);
});

// Performance Monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${loadTime}ms`);
    }, 0);
  });
}

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // Escape key closes mobile menu
  if (e.key === "Escape") {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Tab key handling for better accessibility
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// Print Styles Enhancement
window.addEventListener("beforeprint", () => {
  document.body.classList.add("printing");
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing");
});

// Internationalization (future-proofing)
const i18n = {
  sq: {
    results: "rezultate",
    loading: "Duke ngarkuar...",
    menu: "Menu",
  },
  en: {
    results: "results",
    loading: "Loading...",
    menu: "Menu",
  },
};

// Export for module usage (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initThemeToggle,
    initNavigation,
    initScrollAnimations,
    animateNumbers,
    debounce,
    throttle,
  };
}

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
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    .letter-card:hover .letter-tooltip {
        opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}

function initAll() {
  // All initialization functions are called at the top level
}
