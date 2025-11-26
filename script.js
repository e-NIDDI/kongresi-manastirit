// FINAL script.js – REAL ALBANIAN PRONUNCIATION + ALL FEATURES WORKING
document.addEventListener("DOMContentLoaded", function () {
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

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  btn.textContent = saved === "light" ? "Dark Mode" : "Light Mode";

  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.textContent = next === "light" ? "Dark Mode" : "Light Mode";
  });
}

// ==================== NAVIGATION ====================
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
  });

  document.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  }));

  document.addEventListener("click", e => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Scroll spy
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(l => {
          l.classList.remove("active");
          if (l.getAttribute("href") === `#${entry.target.id}`) l.classList.add("active");
        });
      }
    });
  }, { rootMargin: "-20% 0px -80% 0px" });
  document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = document.querySelector(".navbar")?.offsetHeight || 0;
        window.scrollTo({ top: target.offsetTop - offset - 20, behavior: "smooth" });
        history.pushState(null, null, href);
      }
    });
  });
}

// ==================== HEADER & PROGRESS BAR ====================
function initHeaderEffects() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  let lastY = 0;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    navbar.style.background = y > 100 ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.9)";
    navbar.style.backdropFilter = y > 100 ? "blur(12px)" : "blur(8px)";
    navbar.style.transform = y > lastY && y > 200 ? "translateY(-100%)" : "translateY(0)";
    lastY = y;

    const bar = document.querySelector(".scroll-progress");
    if (bar) {
      const percent = (y / (document.documentElement.scrollHeight - innerHeight)) * 100;
      bar.style.width = percent + "%";
    }
  });
}

// ==================== ALBANIAN ALPHABET – REAL PRONUNCIATION ====================
function initAlphabetGrid() {
  const grid = document.querySelector(".alphabet-grid");
  if (!grid) return;

  const alphabet = ["A","B","C","Ç","D","Dh","E","Ë","F","G","Gj","H","I","J","K","L","Ll","M","N","Nj","O","P","Q","R","Rr","S","Sh","T","Th","U","V","X","Xh","Y","Z","Zh"];

  grid.innerHTML = alphabet.map(l => `
    <div class="letter-card" data-letter="${l}">
      <span class="letter">${l}</span>
      <div class="letter-tooltip">Shkronja ${l}</div>
    </div>
  `).join("");

  document.querySelectorAll(".letter-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
      speakRealAlbanian(card.dataset.letter);
    });
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.08)";
      card.style.zIndex = "10";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.zIndex = "";
    });
  });
}

// THIS IS THE MAGIC: REAL ALBANIAN PRONUNCIATION (sounds like a real Albanian!)
function speakRealAlbanian(letter) {
  if (!("speechSynthesis" in window)) return;

  const sounds = {
    A: "Aaaa",        B: "Beee",        C: "Tsee",        Ç: "Çeee",
    D: "Deee",        Dh: "Dhëëë",      E: "Eeee",        Ë: "Ëëëë",
    F: "Eff",         G: "Geee",        Gj: "Gjëëë",      H: "Haaa",
    I: "Iiii",        J: "Jot",         K: "Kaaa",        L: "Ell",
    Ll: "Ëlll",       M: "Emm",         N: "Enn",         Nj: "Njëë",
    O: "Oooo",        P: "Peee",        Q: "Qeee",        R: "Err",
    Rr: "Rrrrr",      S: "Ess",         Sh: "Shhh",       T: "Teee",
    Th: "Thhh",       U: "Uuuu",        V: "Veee",        X: "Xeee",
    Xh: "Xhjëë",      Y: "Yyyy",        Z: "Zeee",        Zh: "Zhhh"
  };

  const text = sounds[letter] || letter;
  const utterance = new SpeechSynthesisUtterance(text);

  // Force Albanian voice if available, otherwise best available
  utterance.lang = "sq-AL";
  utterance.rate = 0.75;
  utterance.pitch = 1.1;
  utterance.volume = 1;

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
      let visible = 0;

      cards.forEach(card => {
        const show = filter === "all" || card.dataset.category.split(" ").includes(filter);
        card.style.display = show ? "block" : "none";
        if (show) visible++;
      });

      const counter = document.querySelector(".results-count");
      if (counter) counter.textContent = `${visible} rezultate`;
    });
  });
}

// ==================== TIMELINE & ANIMATIONS ====================
function initTimelineAnimations() {
  document.querySelectorAll(".timeline-item").forEach((item, i) => {
    item.style.animationDelay = `${i * 0.2}s`;
    item.addEventListener("click", () => item.querySelector(".timeline-content")?.classList.toggle("expanded"));
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("fade-in-up");
        if (e.target.classList.contains("alphabet-grid")) animateAlphabet();
        if (e.target.classList.contains("timeline-section")) animateTimeline();
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".feature-card, .person-card, .letter-card, .timeline-item, .section-header").forEach(el => observer.observe(el));
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

// ==================== WORKING NUMBER COUNTERS ====================
function initNumberCounters() {
  const counters = document.querySelectorAll(".stat-number, .fact-number");

  counters.forEach(el => {
    const num = parseInt(el.textContent.replace(/\D/g, "")) || 0;
    const suffix = el.textContent.replace(/[0-9,]/g, "");
    el.dataset.target = num;
    el.dataset.suffix = suffix;
    el.textContent = "0" + suffix;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        countUp(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));
}

function countUp(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || "";
  const duration = 2500;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ==================== INTERACTIONS & EFFECTS ====================
function initInteractiveElements() {
  document.querySelectorAll(".cta-button").forEach(btn => {
    btn.addEventListener("mouseenter", () => btn.style.transform = "translateY(-4px)");
    btn.addEventListener("mouseleave", () => btn.style.transform = "");
    btn.addEventListener("click", e => {
      const ripple = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size/2 + "px";
      ripple.style.top = e.clientY - rect.top - size/2 + "px";
      ripple.classList.add("ripple");
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ==================== PARALLAX & FLOATING ====================
function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax").forEach(el => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${scrollY * -speed}px)`;
    });
  });
}

function initFloatingLetters() {
  document.querySelectorAll(".floating-letter").forEach((l, i) => {
    const dur = 5 + Math.random() * 5;
    l.style.animation = `float ${dur}s ease-in-out infinite`;
  });
}

// ==================== PAGE LOAD ====================
function initPageTransitions() {
  document.body.classList.add("loading");
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
    }, 150);
  });
}

// ==================== EXTRA CSS ====================
const css = `
  .ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,0.7);transform:scale(0);animation:ripple .6s linear;pointer-events:none}
  @keyframes ripple{to{transform:scale(4);opacity:0}}
  .scroll-progress{position:fixed;top:0;left:0;height:4px;background:var(--primary-color);z-index:1001;width:0%;transition:width .2s}
  .letter-tooltip{position:absolute;bottom:120%;left:50%;transform:translateX(-50%);background:#1a1a1a;color:white;padding:6px 12px;border-radius:8px;font-size:0.85rem;opacity:0;transition:opacity .3s;pointer-events:none;white-space:nowrap}
  .letter-card:hover .letter-tooltip{opacity:1}
  .letter-card.active{background:var(--primary-color);color:white;transform:scale(1.15)!important}
`;
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
