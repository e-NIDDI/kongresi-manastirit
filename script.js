// Enhanced script.js – FULLY WORKING + ALBANIAN PRONUNCIATION
document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initNavigation();
  initScrollAnimations();
  initSmoothScrolling();
  initHeaderEffects();
  initAlphabetGrid();
  initPeopleFilter();
  initTimelineAnimations();
  initNumberCounters();           // Fixed & working
  initInteractiveElements();
  initPageTransitions();
  initParallaxEffects();
  initFloatingLetters();
});

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  btn.textContent = saved === "light" ? "Dark Mode" : "Light Mode";

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.textContent = next === "light" ? "Dark Mode" : "Light Mode";
  });
}

// ==================== NAVIGATION & SCROLL SPY ====================
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close on outside click
  document.addEventListener("click", e => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  initScrollSpy();
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => {
          l.classList.remove("active");
          if (l.getAttribute("href") === `#${entry.target.id}`) l.classList.add("active");
        });
      }
    });
  }, { rootMargin: "-20% 0px -80% 0px" });

  sections.forEach(s => observer.observe(s));
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (href === "#" || !href) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = document.querySelector(".navbar")?.offsetHeight || 0;
        window.scrollTo({
          top: target.offsetTop - offset - 20,
          behavior: "smooth"
        });
        history.pushState(null, null, href);
      }
    });
  });
}

// ==================== HEADER EFFECTS ====================
function initHeaderEffects() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y > 100) {
      navbar.style.background = "rgba(255,255,255,0.95)";
      navbar.style.backdropFilter = "blur(12px)";
    }

    if (y > lastY && y > 200) navbar.style.transform = "translateY(-100%)";
    else navbar.style.transform = "translateY(0)";

    lastY = y;
    updateProgressBar();
  });

  function updateProgressBar() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + "%";
  }
}

// ==================== ALBANIAN ALPHABET GRID – NOW SPEAKS REAL ALBANIAN ====================
function initAlphabetGrid() {
  const grid = document.querySelector(".alphabet-grid");
  if (!grid) return;

  const alphabet = ["A","B","C","Ç","D","Dh","E","Ë","F","G","Gj","H","I","J","K","L","Ll","M","N","Nj","O","P","Q","R","Rr","S","Sh","T","Th","U","V","X","Xh","Y","Z","Zh"];

  grid.innerHTML = alphabet.map(l => `
    <div class="letter-card" data-letter="${l}">
      <span class="letter">${l}</span>
      <div class="letter-tooltip">Shkronja "${l}"</div>
    </div>
  `).join("");

  document.querySelectorAll(".letter-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
      speakAlbanianLetter(card.dataset.letter);
    });
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.05)";
      card.style.zIndex = "10";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.zIndex = "1";
    });
  });
}

// REAL ALBANIAN PRONUNCIATION
function speakAlbanianLetter(letter) {
  if (!("speechSynthesis" in window)) return;

  const names = {
    A: "a", B: "bë", C: "cë", Ç: "çë", D: "dë", Dh: "dhë", E: "e", Ë: "ë",
    F: "fë", G: "gë", Gj: "gjë", H: "hë", I: "i", J: "jot", K: "kë", L: "lë",
    Ll: "llë", M: "më", N: "në", Nj: "një", O: "o", P: "pë", Q: "që", R: "rë",
    Rr: "rrë", S: "së", Sh: "shë", T: "të", Th: "thë", U: "u", V: "vë",
    X: "xë", Xh: "xhjë", Y: "y", Z: "zë", Zh: "zhë"
  };

  const utterance = new SpeechSynthesisUtterance(names[letter] || letter);
  utterance.lang = "sq-AL";
  utterance.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

// ==================== PEOPLE FILTER ====================
function initPeopleFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".person-card");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cats = card.dataset.category.split(" ");
        const show = filter === "all" || cats.includes(filter);
        card.style.display = show ? "block" : "none";
      });

      const count = filter === "all" ? cards.length : cards.length - document.querySelectorAll(`[data-category*="${filter}"]`).length;
      const results = document.querySelector(".results-count");
      if (results) results.textContent = `${document.querySelectorAll(".person-card[style*='block']").length} rezultate`;
    });
  });
}

// ==================== TIMELINE ====================
function initTimelineAnimations() {
  document.querySelectorAll(".timeline-item").forEach((item, i) => {
    item.style.animationDelay = `${i * 0.2}s`;
    item.addEventListener("click", () => item.querySelector(".timeline-content")?.classList.toggle("expanded"));
  });
}

// ==================== FIXED NUMBER COUNTERS ====================
function initNumberCounters() {
  const counters = document.querySelectorAll(".stat-number, .fact-number");

  counters.forEach(el => {
    const value = parseInt(el.textContent.replace(/\D/g, "")) || parseInt(el.dataset.count) || 0;
    const suffix = el.textContent.replace(/[0-9]/g, "").trim();
    el.dataset.target = value;
    el.dataset.suffix = suffix;
    el.textContent = "0" + suffix;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 2500;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(progress * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        if (entry.target.classList.contains("timeline-section")) animateTimeline();
        if (entry.target.classList.contains("alphabet-grid")) animateAlphabet();
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".feature-card, .timeline-item, .person-card, .letter-card, .section-header, .stats-grid").forEach(el => observer.observe(el));
}

function animateAlphabet() {
  document.querySelectorAll(".letter-card").forEach((c, i) => {
    c.style.animationDelay = `${i * 0.05}s`;
    c.classList.add("fade-in-up");
  });
}

function animateTimeline() {
  document.querySelectorAll(".timeline-item").forEach((c, i) => {
    c.style.animationDelay = `${i * 0.25}s`;
    c.classList.add("fade-in-up");
  });
}

// ==================== INTERACTIVE ELEMENTS ====================
function initInteractiveElements() {
  document.querySelectorAll(".cta-button").forEach(btn => {
    btn.addEventListener("mouseenter", () => btn.style.transform = "translateY(-4px)");
    btn.addEventListener("mouseleave", () => btn.style.transform = "");
    btn.addEventListener("click", e => {
      const ripple = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size/2 + "px";
      ripple.style.top = e.clientY - rect.top - size/2 + "px";
      ripple.classList.add("ripple");
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  document.querySelectorAll("img[data-src]").forEach(img => {
    img.src = img.dataset.src;
  });
}

// ==================== PARALLAX & FLOATING LETTERS ====================
function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax").forEach(el => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${window.scrollY * -speed}px)`;
    });
  });
}

function initFloatingLetters() {
  document.querySelectorAll(".floating-letter").forEach((l, i) => {
    const dur = 6 + Math.random() * 4;
    const delay = Math.random() * 2;
    l.style.animation = `float ${dur}s ease-in-out ${delay}s infinite`;
  });
}

// ==================== PAGE TRANSITIONS ====================
function initPageTransitions() {
  document.body.classList.add("loading");
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
    }, 100);
  });
}

// ==================== EXTRA CSS ====================
const extraCSS = `
  .ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,0.6);transform:scale(0);animation:ripple-animation .6s linear;pointer-events:none}
  @keyframes ripple-animation{to{transform:scale(4);opacity:0}}
  .scroll-progress{position:fixed;top:0;left:0;height:4px;background:var(--primary-color);z-index:1001;width:0%;transition:width .2s}
  .letter-tooltip{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:6px 10px;border-radius:6px;font-size:.8rem;opacity:0;transition:opacity .3s;pointer-events:none;white-space:nowrap}
  .letter-card:hover .letter-tooltip{opacity:1}
`;
const style = document.createElement("style");
style.textContent = extraCSS;
document.head.appendChild(style);

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
