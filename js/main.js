/**
 * NARESH KUMAR K.C. - PORTFOLIO SCRIPTS
 * Interactive features: Modal Viewer, Typing Effect, Copy to Clipboard, Smooth Nav & Scrollspy
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. NAVIGATION & SCROLLSPY =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar background blur on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        scrollSpy();
    }, { passive: true });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // ScrollSpy active link detection
    function scrollSpy() {
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== 2. TYPING EFFECT =====
    const typingElement = document.getElementById('typing-text');
    const titles = [
        "Backend Developer — Python & Django",
        "REST APIs & PostgreSQL Databases",
        "Linux VPS Deployments & Nginx",
        "OWASP & Burp Suite Hardened Systems",
        "Full-Stack Integration (React / Next.js)"
    ];

    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 90;

    function handleTyping() {
        if (!typingElement) return;

        const currentTitle = titles[titleIdx];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIdx - 1);
            charIdx--;
            typeDelay = 45;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIdx + 1);
            charIdx++;
            typeDelay = 85;
        }

        if (!isDeleting && charIdx === currentTitle.length) {
            isDeleting = true;
            typeDelay = 2200; // Pause at full word
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
            typeDelay = 400; // Pause before starting next word
        }

        setTimeout(handleTyping, typeDelay);
    }

    setTimeout(handleTyping, 600);

    // ===== 3. RESUME MODAL VIEWER =====
    const resumeModal = document.getElementById('resume-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const resumeTriggers = document.querySelectorAll('.open-resume-trigger');

    function openModal() {
        if (resumeModal) {
            resumeModal.classList.add('active');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    function closeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    resumeTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ===== 4. TOAST NOTIFICATION & COPY CLIPBOARD =====
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastText) return;
        toastText.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    const copyButtons = document.querySelectorAll('.copy-trigger');
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                showToast(`Copied "${textToCopy}" to clipboard!`);
            } catch (err) {
                // Fallback
                const tempInput = document.createElement('input');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`Copied "${textToCopy}" to clipboard!`);
            }
        });
    });

    // ===== 5. CONTACT FORM HANDLER =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || 'Portfolio Contact';
            const message = document.getElementById('message')?.value || '';

            const mailtoUri = `mailto:nareshkumarkc25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
            
            showToast('Opening your email client to send message...');
            setTimeout(() => {
                window.location.href = mailtoUri;
            }, 600);
        });
    }

    // ===== 6. SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
