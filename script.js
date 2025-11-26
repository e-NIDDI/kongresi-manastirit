// script.js – ALFABETI SHQIP ME ZË TË VËRTETË SHQIPTAR (2025 FINAL VERSION)
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initNavigation();
  initSmoothScrolling();
  initHeaderEffects();
  initAlphabetGrid();        // ZËRI I VËRTETË SHQIP KËTU
  initPeopleFilter();
  initNumberCounters();
  initScrollAnimations();
  initInteractiveElements();
  initParallaxEffects();
  injectStyles();
});

// ==================== ALFABETI SHQIP – ZË I INKIZUAR NGA SHQIPTARË TË VËRTETË ====================
function initAlphabetGrid() {
  const grid = document.querySelector(".alphabet-grid");
  if (!grid) return;

  const alfabeti = [
    "A","B","C","Ç","D","Dh","E","Ë","F","G","Gj","H","I","J","K","L","Ll",
    "M","N","Nj","O","P","Q","R","Rr","S","Sh","T","Th","U","V","X","Xh","Y","Z","Zh"
  ];

  grid.innerHTML = alfabeti.map(letter => `
    <div class="letter-card" data-letter="${letter}">
      <span class="letter">${letter}</span>
      <div class="letter-tooltip">Shkronja ${letter === "Ë" ? "Ë" : letter}</div>
    </div>
  `).join("");

  // Cache për audio që të mos ketë vonesë
  const audioCache = {};

  alfabeti.forEach(letter => {
    const audio = new Audio(`audio/${letter}.mp3`);
    audio.preload = "auto";
    audioCache[letter] = audio;
  });

  document.querySelectorAll(".letter-card").forEach(card => {
    const letter = card.dataset.letter;

    card.addEventListener("click", () => {
      // Efekt vizual
      card.classList.add("active");
      setTimeout(() => card.classList.remove("active"), 600);

      // Luaj zërin e saktë shqiptar
      const audio = audioCache[letter];
      if (audio) {
        // Ndal çdo zë tjetër
        Object.values(audioCache).forEach(a => {
          a.pause();
          a.currentTime = 0;
        });
        audio.play().catch(e => console.log("Audio play failed:", e));
      }
    });

    // Hover efekt
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.15)";
      card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });
}

// ==================== PJESËT E TJERA (të pastruara dhe funksionale) ====================
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  btn.innerHTML = theme === "light" ? "Dark Mode" : "Light Mode";

  btn.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    btn.innerHTML = newTheme === "light" ? "Dark Mode" : "Light Mode";
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

  document.querySelectorAll(".nav-link").forEach(l => {
    l.addEventListener("click", () => {
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
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
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
      navbar.style.background = y > 80 ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)";
      navbar.style.backdropFilter = "blur(15px)";
      navbar.style.transform = y > lastY && y > 150 ? "translateY(-100%)" : "translateY(0)";
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
      let count = 0;

      document.querySelectorAll(".person-card").forEach(card => {
        const show = filter === "all" || card.dataset.category.includes(filter);
        card.style.display = show ? "block" : "none";
        if (show) count++;
      });

      document.querySelector(".results-count")?.replaceChildren(`${count} rezultate`);
    });
  });
}

function initNumberCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        const target = +entry.target.dataset.target || parseInt(entry.target.textContent.replace(/\D/g, ""));
        const suffix = entry.target.textContent.replace(/[0-9,]/g, "");
        let i = 0;
        const timer = setInterval(() => {
          i += target / 60;
          if (i >= target) {
            entry.target.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(i).toLocaleString() + suffix;
          }
        }, 30);
      }
    });
  }, { threshold: 0.7 });

  document.querySelectorAll(".stat-number, .fact-number").forEach(el => {
    const num = parseInt(el.textContent.replace(/\D/g, "")) || 0;
    const suffix = el.textContent.replace(/[0-9,]/g, "");
    el.dataset.target = num;
    el.textContent = "0" + suffix;
    observer.observe(el);
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("fade-in-up"));
  }, { threshold: 0.1 });
  document.querySelectorAll(".feature-card, .person-card, .letter-card, .timeline-item").forEach(el => observer.observe(el));
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
      el.style.transform = `translateY(${scrollY * (el.dataset.speed || 0.5) * -1}px)`;
    });
  });
}

function injectStyles() {
  const css = `
    .scroll-progress{position:fixed;top:0;left:0;height:5px;background:#c1121f;z-index:9999;width:0%;transition:width .3s}
    .letter-card{cursor:pointer;transition:all .4s cubic-bezier(.2,.8,.2,1)}
    .letter-card:hover{transform:translateY(-15px) scale(1.15)!important;box-shadow:0 25px 50px rgba(0,0,0,.25)}
    .letter-card.active{background:#c1121f!important;color:white!important;transform:scale(1.3)!important;box-shadow:0 0 40px #c1121f88!important}
    .letter-tooltip{
      position:absolute;bottom:130%;left:50%;transform:translateX(-50%);
      background:#1d3557;color:white;padding:10px 16px;border-radius:12px;
      font-size:0.95rem;opacity:0;transition:opacity .3s;pointer-events:none;
      white-space:nowrap;box-shadow:0 8px 25px rgba(0,0,0,.4);
    }
    .letter-card:hover .letter-tooltip{opacity:1}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

// Service Worker (opsionale)
"serviceWorker" in navigator && navigator.serviceWorker.register("/sw.js").catch(() => {});
