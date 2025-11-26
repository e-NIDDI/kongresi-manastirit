// script.js – ALFABETI SHQIP ME ZË TË VËRTETË SHQIPTAR + TË GJITHA FUNKSIONET
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initNavigation();
  initSmoothScrolling();
  initHeaderEffects();
  initAlphabetGrid();           // MAGJIA SHQIPTARE
  initPeopleFilter();
  initNumberCounters();
  initScrollAnimations();
  initInteractiveElements();
  initParallaxEffects();
  injectStyles();
});

// ==================== ALFABETI SHQIP – ZËRI I VËRTETË SHQIPTAR ====================
function initAlphabetGrid() {
  const grid = document.querySelector(".alphabet-grid");
  if (!grid) return;

  const alfabeti = ["A","B","C","Ç","D","Dh","E","Ë","F","G","Gj","H","I","J","K","L","Ll","M","N","Nj","O","P","Q","R","Rr","S","Sh","T","Th","U","V","X","Xh","Y","Z","Zh"];

  grid.innerHTML = alfabeti.map(l => `
    <div class="letter-card" data-letter="${l}">
      <span class="letter">${l}</span>
      <div class="letter-tooltip">Shkronja ${l}</div>
    </div>
  `).join("");

  document.querySelectorAll(".letter-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
      folShqip(card.dataset.letter);
    });
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px) scale(1.1)";
      card.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });
}

// ZËRI 100% SHQIP – SIÇ E THOTË ÇDO SHQIPTAR
function folShqip(shkronja) {
  if (!("speechSynthesis" in window)) return;

  const tingulliShqip = {
    A: "Aaaa",      B: "Bëëë",      C: "Tsëë",      Ç: "Çëëë",
    D: "Dëë",       Dh: "Dhëëë",    E: "Eeee",      Ë: "Ëëëë",
    F: "Ffff",      G: "Gëë",       Gj: "Gjëëë",    H: "Hëë",
    I: "Iiii",      J: "Jot",       K: "Këë",       L: "Lëë",
    Ll: "Ëlll",     M: "Mëë",       N: "Nëë",       Nj: "Njëëë",
    O: "Oooo",      P: "Pëë",       Q: "Qëë",       R: "Rëë",
    Rr: "Rrrrr",    S: "Ssss",      Sh: "Shhhh",    T: "Tëë",
    Th: "Thhhh",    U: "Uuuu",      V: "Vëë",       X: "Xëë",
    Xh: "Xhjëëë",   Y: "Yyyy",      Z: "Zëë",       Zh: "Zhhhh"
  };

  const tekst = tingulliShqip[shkronja] || shkronja;

  const utterance = new SpeechSynthesisUtterance(tekst);
  utterance.lang = "sq-AL";     // Detyron zërin shqiptar
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  utterance.volume = 1;

  speechSynthesis.cancel();     // Pastro radhën që të mos ketë vonesë
  speechSynthesis.speak(utterance);
}

// ==================== FUNKSIONET E TJERA (të pastruara dhe funksionale) ====================
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  btn.textContent = theme === "light" ? "Dark Mode" : "Light Mode";

  btn.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    btn.textContent = newTheme === "light" ? "Dark Mode" : "Light Mode";
  });
}

function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-menu");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger?.classList.remove("active");
      nav?.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = document.querySelector(".navbar")?.offsetHeight || 0;
        window.scrollTo({
          top: target.offsetTop - offset - 20,
          behavior: "smooth"
        });
      }
    });
  });
}

function initHeaderEffects() {
  const navbar = document.querySelector(".navbar");
  const progress = document.querySelector(".scroll-progress");
  let lastY = 0;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (navbar) {
      navbar.style.background = y > 80 ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.9)";
      navbar.style.backdropFilter = "blur(12px)";
      navbar.style.transform = (y > lastY && y > 150) ? "translateY(-100%)" : "translateY(0)";
    }
    if (progress) {
      const percent = (y / (document.body.scrollHeight - innerHeight)) * 100;
      progress.style.width = percent + "%";
    }
    lastY = y;
  });
}

function initPeopleFilter() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      let visible = 0;

      document.querySelectorAll(".person-card").forEach(card => {
        const show = filter === "all" || card.dataset.category.split(" ").includes(filter);
        card.style.display = show ? "block" : "none";
        if (show) visible++;
      });

      const counter = document.querySelector(".results-count");
      if (counter) counter.textContent = `${visible} rezultate`;
    });
  });
}

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
        const target = +entry.target.dataset.target;
        const suffix = entry.target.dataset.suffix;
        let current = 0;
        const step = target / 80;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            entry.target.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(current).toLocaleString() + suffix;
          }
        }, 30);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("fade-in-up");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".feature-card, .person-card, .letter-card, .timeline-item, .section-header").forEach(el => observer.observe(el));
}

function initInteractiveElements() {
  document.querySelectorAll(".cta-button").forEach(btn => {
    btn.addEventListener("mouseenter", () => btn.style.transform = "translateY(-6px)");
    btn.addEventListener("mouseleave", () => btn.style.transform = "");
  });
}

function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax").forEach(el => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${scrollY * -speed}px)`;
    });
  });
}

function injectStyles() {
  const css = `
    .ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,0.7);transform:scale(0);animation:r .6s linear;pointer-events:none}
    @keyframes r{to{transform:scale(4);opacity:0}}
    .scroll-progress{position:fixed;top:0;left:0;height:5px;background:#e63946;z-index:9999;width:0%;transition:width .2s}
    .letter-tooltip{position:absolute;bottom:130%;left:50%;transform:translateX(-50%);background:#1d3557;color:#fff;padding:8px 14px;border-radius:10px;font-size:0.9rem;opacity:0;transition:opacity .3s;white-space:nowrap;box-shadow:0 5px 15px rgba(0,0,0,0.3)}
    .letter-card:hover .letter-tooltip{opacity:1}
    .letter-card.active{background:#e63946 !important;color:white !important;transform:scale(1.2) !important;box-shadow:0 15px 40px rgba(230,57,70,0.5)!important}
    .letter-card{transition:all .3s cubic-bezier(0.4,0,0.2,1)}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

// Service Worker (opsionale)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
