// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Animate numbers counting up
function animateNumbers() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-count"));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current);
    }, 16);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");

      // Animate numbers when stats section is visible
      if (entry.target.classList.contains("stats-section")) {
        animateNumbers();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  // Observe sections for fade-in animation
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Initialize alphabet grid
  initAlphabetGrid();

  // Initialize people filter
  initPeopleFilter();
});

// Alphabet Grid
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
    .map((letter) => `<div class="letter-card">${letter}</div>`)
    .join("");
}

// People Filter
function initPeopleFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const peopleCards = document.querySelectorAll(".person-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      peopleCards.forEach((card) => {
        if (
          filter === "all" ||
          card.getAttribute("data-category").includes(filter)
        ) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "var(--white)";
    navbar.style.backdropFilter = "none";
  }
});

// Page load animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.querySelector(".footer-bottom p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace("2024", currentYear);
  }
});
