// ===== NAVIGATION =====
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Scroll effect for navbar
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu on link click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(
      ".nav-link[href*=" + sectionId + "]",
    );

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", scrollActive);

// ===== TYPING EFFECT =====
const typingText = document.getElementById("typing-text");
const phrases = [
  "Python Developer",
  "Django Backend Developer",
  "REST API Developer",
  "Problem Solver",
  "Quick Learner",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before new phrase
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// ===== SMOOTH SCROLL =====
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

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll(".skill-progress");
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;

  const skillsSection = document.getElementById("skills");
  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = progress + "%";
    });
    skillsAnimated = true;
  }
}

window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll(".stat-number");
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;

  const aboutSection = document.getElementById("about");
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target + "+";
        }
      };

      updateCounter();
    });
    countersAnimated = true;
  }
}

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".about-card, .skill-category, .project-card, .timeline-item, .soft-skill, .info-card, .contact-item",
  );

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initial styles for reveal animation
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(
    ".about-card, .skill-category, .project-card, .timeline-item, .soft-skill, .info-card, .contact-item",
  );

  reveals.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
  });

  // Trigger initial check
  revealOnScroll();
});

window.addEventListener("scroll", revealOnScroll);

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Create mailto link
    const mailtoLink = `mailto:kcnaresh72@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    alert("Opening your email client to send the message!");

    // Reset form
    this.reset();
  });
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = scrolled * 0.5 + "px";
});

// ===== LOADING ANIMATION =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
