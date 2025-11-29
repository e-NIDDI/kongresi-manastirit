document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initNavigation();
    initSmoothScrolling();
    initHeaderEffects();
    initAlphabetGrid();
    initPeopleFilter();   // FILTRIM PJESËMARRËSISH
    initBackToTop();
});

/* ====================== FILTRIM PJESËMARRËSISH ====================== */
function initPeopleFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards   = document.querySelectorAll(".person-card");

    if (buttons.length === 0) return; // dalim nëse nuk jemi në faqen pjesëmarrësit

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Hiq active nga të gjithë
            buttons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {
                const categories = card.dataset.category || "";
                if (filter === "all" || categories.includes(filter)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Nis me "Të Gjithë" aktiv
    document.querySelector('.filter-btn[data-filter="all"]')?.click();
}

/* ====================== MODAL ALFABETI (sipër shkronjës + pa problem scroll) ====================== */
function initAlphabetGrid() {
    const grid = document.querySelector(".alphabet-grid");
    if (!grid) return;

    const alfabeti = ["A","B","C","Ç","D","Dh","E","Ë","F","G","Gj","H","I","J","K","L","Ll","M","N","Nj","O","P","Q","R","Rr","S","Sh","T","Th","U","V","X","Xh","Y","Z","Zh"];

    const info = {
        A:  { emri: "A",    shqiptim: "Aaaa",    shembuj: "at, ar, Shqipëri" },
        B:  { emri: "Bë",   shqiptim: "Beee",    shembuj: "baba, bukë, ballë" },
        C:  { emri: "Cë",   shqiptim: "Tsëë",    shembuj: "cigaret, cakalli" },
        Ç:  { emri: "Çë",   shqiptim: "Çeee",    shembuj: "çaj, çokollatë, çelës" },
        D:  { emri: "Dë",   shqiptim: "Deee",    shembuj: "ditë, dorë, djalë" },
        Dh: { emri: "Dhë",  shqiptim: "Dhëëë",   shembuj: "dhallë, dhemb, dhëmbë" },
        E:  { emri: "E",    shqiptim: "Eeee",    shembuj: "emër, errët, erë" },
        Ë:  { emri: "Ë",    shqiptim: "Ëëëë",    shembuj: "ëmë, ëndërr, këmbë" },
        F:  { emri: "Fë",   shqiptim: "Ffff",    shembuj: "familje, fëmijë, fjalë" },
        G:  { emri: "Gë",   shqiptim: "Geee",    shembuj: "gjë, gomë, gisht" },
        Gj: { emri: "Gjë",  shqiptim: "Gjëëë",   shembuj: "gjysh, gjarpër, gjuhë" },
        H:  { emri: "Hë",   shqiptim: "Hëë",     shembuj: "hapur, hotel, hiq" },
        I:  { emri: "I",    shqiptim: "Iiii",    shembuj: "i mirë, ishull, im" },
        J:  { emri: "Jot",  shqiptim: "Jot",     shembuj: "ju, jam, jo" },
        K:  { emri: "Kë",   shqiptim: "Kaaa",    shembuj: "kafshë, këngë, kurrë" },
        L:  { emri: "Lë",   shqiptim: "Ell",     shembuj: "lule, libër, lart" },
        Ll: { emri: "Ëll",  shqiptim: "Ëlll",    shembuj: "llullë, llambë, mall" },
        M:  { emri: "Më",   shqiptim: "Mmmm",    shembuj: "mama, motër, mirë" },
        N:  { emri: "Në",   shqiptim: "Enn",     shembuj: "nënë, natë, nxit" },
        Nj: { emri: "Një",  shqiptim: "Njëëë",   shembuj: "njeri, njoh, një" },
        O:  { emri: "O",    shqiptim: "Oooo",    shembuj: "orë, oxhak, oborr" },
        P:  { emri: "Pë",   shqiptim: "Peee",    shembuj: "prind, punë, plak" },
        Q:  { emri: "Që",   shqiptim: "Qeee",    shembuj: "qen, qershi, qiell" },
        R:  { emri: "Rë",   shqiptim: "Err",     shembuj: "rërë, rrugë, radio" },
        Rr: { emri: "Rrë",  shqiptim: "Rrrrr",   shembuj: "rrugë, rrotull, rrah" },
        S:  { emri: "Së",   shqiptim: "Ssss",    shembuj: "shkolla, sy, sot" },
        Sh: { emri: "Shë",  shqiptim: "Shhhh",   shembuj: "shumë, shi, shok" },
        T:  { emri: "Të",   shqiptim: "Teee",    shembuj: "të falë, tani, tavë" },
        Th: { emri: "Thë",  shqiptim: "Thhhh",   shembuj: "thikë, thonj, thelb" },
        U:  { emri: "U",    shqiptim: "Uuuu",    shembuj: "ujë, unë, ulli" },
        V:  { emri: "Vë",   shqiptim: "Veee",    shembuj: "vëlla, vajzë, verë" },
        X:  { emri: "Xë",   shqiptim: "Xeee",    shembuj: "xixë, xham, xixëllinj" },
        Xh: { emri: "Xhë",  shqiptim: "Xhjëëë",  shembuj: "xham, xixë, xhiro" },
        Y:  { emri: "Y",    shqiptim: "Yyyy",    shembuj: "yll, yndyrë, dy" },
        Z:  { emri: "Zë",   shqiptim: "Zeee",    shembuj: "zë, zhurmë, zorrë" },
        Zh: { emri: "Zhë",  shqiptim: "Zhhhh",   shembuj: "zhurmë, zhvesh, zhavorr" }
    };

    grid.innerHTML = alfabeti.map(l => `
        <div class="letter-card" data-letter="${l}" tabindex="0" role="button">
            <span class="letter">${l}</span>
            <div class="letter-tooltip">Kliko për të mësuar</div>
        </div>
    `).join("");

    const modal = document.getElementById("letterModal");
    const modalContent = modal.querySelector(".modal-content");
    const modalLetter = modal.querySelector(".modal-letter");
    const modalName = modal.querySelector(".modal-name");
    const modalPronounce = modal.querySelector(".modal-pronounce");
    const modalExamples = modal.querySelector(".modal-examples");
    const closeBtn = modal.querySelector(".close");

    function openModal(card) {
        const l = card.dataset.letter;
        const data = info[l];

        modalLetter.textContent = l;
        modalName.textContent = `Shkronja ${data.emri}`;
        modalPronounce.textContent = `Shqiptohet: ${data.shqiptim}`;
        modalExamples.textContent = `Shembuj: ${data.shembuj}`;

        const rect = card.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const centerY = rect.top + scrollTop + rect.height / 2;

        modalContent.style.position = "absolute";
        modalContent.style.top = `${centerY}px`;
        modalContent.style.left = "50%";
        modalContent.style.transform = "translateX(-50%) translateY(-50%)";
        modalContent.style.margin = "0";

        modal.style.display = "flex";
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = "";
        modal.style.display = "none";

        modalContent.style.position = "";
        modalContent.style.top = "";
        modalContent.style.left = "";
        modalContent.style.transform = "";
        modalContent.style.margin = "";
    }

    document.querySelectorAll(".letter-card").forEach(card => {
        card.addEventListener("click", () => openModal(card));
        card.addEventListener("keydown", e => (e.key === "Enter" || e.key === " ") && openModal(card));
    });

    closeBtn.onclick = closeModal;
    modal.addEventListener("click", e => e.target === modal && closeModal());
    document.addEventListener("keydown", e => e.key === "Escape" && modal.classList.contains("show") && closeModal());
}

/* ====================== FUNKSIONET E TJERA ====================== */
function initThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    btn.innerHTML = saved === "light" ? "Dark Mode" : "Light Mode";
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
            if (h === "#" || !document.querySelector(h)) return;
            e.preventDefault();
            document.querySelector(h).scrollIntoView({ behavior: "smooth" });
        });
    });
}

function initHeaderEffects() {
    const navbar = document.querySelector(".navbar");
    let lastY = 0;
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        if (navbar) {
            navbar.style.background = y > 80 ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)";
            navbar.style.transform = y > lastY && y > 150 ? "translateY(-100%)" : "translateY(0)";
        }
        lastY = y;
    });
}

function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", () => btn.classList.toggle("visible", window.scrollY > 500));
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
