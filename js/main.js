// ================= Typewriter Effect =================
class TxtType {
  constructor(el, toRotate, period) {
    this.el = el;
    this.toRotate = toRotate;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.loopNum = 0;
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];
    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);
    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}

// Initialize Typewriter
window.addEventListener("load", () => {
  const elements = document.getElementsByClassName("typewrite");
  for (let el of elements) {
    const toRotate = el.getAttribute("data-type");
    const period = el.getAttribute("data-period");
    if (toRotate) new TxtType(el, JSON.parse(toRotate), period);
  }
});

// ================= Navbar Scroll Effect =================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

// ================= Back To Top Button =================
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});
backToTop.addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
});

// ================= Portfolio Modal & Carousel =================
const portfolioLinks = document.querySelectorAll(
  '[data-bs-target="#portfolioModal"]'
);
portfolioLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const index = parseInt(this.getAttribute("data-index"));
    const carouselEl = document.getElementById("portfolioCarousel");
    const carousel = new bootstrap.Carousel(carouselEl);
    carousel.to(index);
  });
});

const portfolioModal = document.getElementById("portfolioModal");
portfolioModal.addEventListener("show.bs.modal", () => {
  backToTop.style.display = "none";
});
portfolioModal.addEventListener("hidden.bs.modal", () => {
  backToTop.style.display = "flex";
});

// ================= Mobile Menu Modal & Dropdown =================
document.addEventListener("DOMContentLoaded", function () {
  const modalEl = document.getElementById("mobileMenuModal");
  const modal = new bootstrap.Modal(modalEl);

  // Toggle submenus
  modalEl.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const submenu = this.nextElementSibling;
      if (submenu) submenu.classList.toggle("show");
    });
  });

  // Smooth scroll + close modal if normal link
  modalEl.querySelectorAll(".nav-link, .dropdown-item").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (!this.classList.contains("dropdown-toggle")) {
        modal.hide();
      }
    });
  });

  // Prevent clicks inside submenu from closing modal
  modalEl.querySelectorAll(".dropdown-menu").forEach((menu) => {
    menu.addEventListener("click", (e) => e.stopPropagation());
  });
});
