// script.js – ALFABETI SHQIP ME MODAL TË BUKUR (PA ZË, PA PROBLEME)
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initNavigation();
  initSmoothScrolling();
  initHeaderEffects();
  initAlphabetGrid();     // VERSIONI I RI ME MODAL
  initPeopleFilter();
  initNumberCounters();
  initScrollAnimations();
  initInteractiveElements();
  initParallaxEffects();
  injectStyles();
});

// ==================== ALFABETI SHQIP ME MODAL TË QARTË ====================
function initAlphabetGrid() {
  const grid = document.querySelector(".alphabet-grid");
  if (!grid) return;

  const alfabeti = [
    "A","B","C","Ç","D","Dh","E","Ë","F","G","Gj","H","I","J","K","L","Ll",
    "M","N","Nj","O","P","Q","R","Rr","S","Sh","T","Th","U","V","X","Xh","Y","Z","Zh"
  ];

  // Informacioni për çdo shkronjë (shqiptim + shembuj)
  const info = {
    A: { emri: "A", shqiptim: "Aaaa", shembuj: "at, ar, Shqipëri" },
    B: { emri: "Bë", shqiptim: "Beee", shembuj: "baba, bukë, ballë" },
    C: { emri: "Cë", shqiptim: "Tsëë", shembuj: "cigaret, cakalli" },
    Ç: { emri: "Çë", shqiptim: "Çeee", shembuj: "çaj, çokollatë, çelës" },
    D: { emri: "Dë", shqiptim: "Deee", shembuj: "ditë, dorë, djalë" },
    Dh: { emri: "Dhë", shqiptim: "Dhëëë", shembuj: "dhallë, dhemb, dhëmbë" },
    E: { emri: "E", shqiptim: "Eeee", shembuj: "emër, errët, erë" },
    Ë: { emri: "Ë", shqiptim: "Ëëëë", shembuj: "ëmë, ëndërr, këmbë" },
    F: { emri: "Fë", shqiptim: "Ffff", shembuj: "familje, fëmijë, fjalë" },
    G: { emri: "Gë", shqiptim: "Geee", shembuj: "gjë, gomë, gisht" },
    Gj: { emri: "Gjë", shqiptim: "Gjëëë", shembuj: "gjysh, gjarpër, gjuhë" },
    H: { emri: "Hë", shqiptim: "Hëë", shembuj: "hapur, hotel, hiq" },
    I: { emri: "I", shqiptim: "Iiii", shembuj: "i mirë, ishull, im" },
    J: { emri: "Jot", shqiptim: "Jot", shembuj: "ju, jam, jo" },
    K: { emri: "Kë", shqiptim: "Kaaa", shembuj: "kafshë, këngë, kurrë" },
    L: { emri: "Lë", shqiptim: "Ell", shembuj: "lule, libër, lart" },
    Ll: { emri: "Ëll", shqiptim: "Ëlll", shembuj: "llullë, llambë, mall" },
    M: { emri: "Më", shqiptim: "Mmmm", shembuj: "mama, motër, mirë" },
    N: { emri: "Në", shqiptim: "Enn", shembuj: "nënë, natë, nxit" },
    Nj: { emri: "Një", shqiptim: "Njëëë", shembuj: "njeri, njoh, një" },
    O: { emri: "O", shqiptim: "Oooo", shembuj: "orë, oxhak, oborr" },
    P: { emri: "Pë", shqiptim: "Peee", shembuj: "prind, punë, plak" },
    Q: { emri: "Që", shqiptim: "Qeee", shembuj: "qen, qershi, qiell" },
    R: { emri: "Rë", shqiptim: "Err", shembuj: "rërë, rrugë, radio" },
    Rr: { emri: "Rrë", shqiptim: "Rrrrr", shembuj: "rrugë, rrotull, rrah" },
    S: { emri: "Së", shqiptim: "Ssss", shembuj: "shkolla, sy, sot" },
    Sh: { emri: "Shë", shqiptim: "Shhhh", shembuj: "shumë, shi, shok" },
    T: { emri: "Të", shqiptim: "Teee", shembuj: "të falë, tani, tavë" },
    Th: { emri: "Thë", shqiptim: "Thhhh", shembuj: "thikë, thonj, thelb" },
    U: { emri: "U", shqiptim: "Uuuu", shembuj: "ujë, unë, ulli" },
    V: { emri: "Vë", shqiptim: "Veee", shembuj: "vëlla, vajzë, verë" },
    X: { emri: "Xë", shqiptim: "Xeee", shembuj: "xixë, xham, xixëllinj" },
    Xh: { emri: "Xhë", shqiptim: "Xhjëëë", shembuj: "xham, xixë, xhiro" },
    Y: { emri: "Y", shqiptim: "Yyyy", shembuj: "yll, yndyrë, dy" },
    Z: { emri: "Zë", shqiptim: "Zeee", shembuj: "zë, zhurmë, zorrë" },
    Zh: { emri: "Zhë", shqiptim: "Zhhhh", shembuj: "zhurmë, zhvesh, zhavorr" }
  };

  grid.innerHTML = alfabeti.map(l => `
    <div class="letter-card" data-letter="${l}">
      <span class="letter">${l}</span>
      <div class="letter-tooltip">Kliko për të mësuar</div>
    </div>
  `).join("");

  // Krijo modalin një herë
  const modalHTML = `
    <div id="letterModal" class="letter-modal">
      <div class="modal-content">
        <span class="close">×</span>
        <div class="modal-letter"></div>
        <h2 class="modal-name"></h2>
        <p class="modal-pronounce"></p>
        <p class="modal-examples"></p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("letterModal");
  const closeBtn = modal.querySelector(".close");

  document.querySelectorAll(".letter-card").forEach(card => {
    card.addEventListener("click", () => {
      const letter = card.dataset.letter;
      const data = info[letter];

      modal.querySelector(".modal-letter").textContent = letter;
      modal.querySelector(".modal-name").textContent = `Shkronja ${data.emri}`;
      modal.querySelector(".modal-pronounce").textContent = `Shqiptohet: ${data.shqiptim}`;
      modal.querySelector(".modal-examples").textContent = `Shembuj: ${data.shembuj}`;

      modal.style.display = "flex";
      setTimeout(() => modal.classList.add("show"), 10);
    });

    card.style.cursor = "pointer";
  });

  closeBtn.onclick = () => {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.style.display = "none", 300);
    }
  };
}

// ==================== PJESËT E TJERA (të njëjta) ====================
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
  document.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", () => {
    hamburger?.classList.remove("active");
    nav?.classList.remove("active");
    document.body.style.overflow = "";
  }));
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const h = a.getAttribute("href");
      if (!h || h === "#") return;
      e.preventDefault();
      document.querySelector(h)?.scrollIntoView({ behavior: "smooth" });
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
    if (progress) progress.style.width = (y / (document.body.scrollHeight - innerHeight)) * 100 + "%";
    lastY = y;
  });
}

function initNumberCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        const target = parseInt(entry.target.textContent.replace(/\D/g, "")) || 0;
        const suffix = entry.target.textContent.replace(/[0-9,]/g, "");
        let i = 0;
        const timer = setInterval(() => {
          i += target / 70;
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
    .letter-modal {
      display: none;
      position: fixed;
      z-index: 10000;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.7);
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
    }
    .modal-content {
      background: white;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      max-width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      transform: scale(0.7);
      transition: transform 0.4s ease;
    }
    .letter-modal.show .modal-content { transform: scale(1); }
    .modal-letter { font-size: 120px; font-weight: bold; margin: 20px 0; color: #c1121f; }
    .modal-name { font-size: 28px; margin: 15px 0; color: #1d3557; }
    .modal-pronounce { font-size: 32px; font-weight: bold; color: #e63946; margin: 20px 0; }
    .modal-examples { font-size: 20px; color: #555; }
    .close { position: absolute; top: 15px; right: 25px; font-size: 40px; cursor: pointer; color: #aaa; }
    .close:hover { color: #000; }
    .letter-card { transition: all 0.3s ease; }
    .letter-card:hover { transform: translateY(-15px) scale(1.1); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}
