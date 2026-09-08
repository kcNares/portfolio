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

    // ===== 5. CONTACT FORM HANDLER (Web3Forms) =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitBtnDefaultHtml = submitBtn ? submitBtn.innerHTML : '';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const fieldRules = {
            name: { min: 2, max: 100, label: 'Please enter your name (at least 2 characters).' },
            email: { min: 1, max: 150, label: 'Please enter a valid email address.' },
            'inquiry_subject': { min: 4, max: 150, label: 'Subject should be at least 4 characters.' },
            message: { min: 15, max: 3000, label: 'Message should be at least 15 characters — a couple of sentences is plenty.' }
        };

        function setFieldError(input, message) {
            input.classList.toggle('invalid', Boolean(message));
            const errorEl = document.getElementById(`${input.id}-error`);
            if (errorEl) errorEl.textContent = message || '';
        }

        // Clear a field's error state as soon as the visitor starts fixing it
        contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.addEventListener('input', () => setFieldError(input, ''));
        });

        function validateForm() {
            let firstInvalid = null;

            contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
                const rule = fieldRules[input.name];
                if (!rule) return;

                const value = input.value.trim();
                let message = '';

                if (!value) {
                    message = 'This field is required.';
                } else if (input.name === 'email' && !emailPattern.test(value)) {
                    message = rule.label;
                } else if (value.length < rule.min) {
                    message = rule.label;
                } else if (value.length > rule.max) {
                    message = `Please keep this under ${rule.max} characters.`;
                }

                setFieldError(input, message);
                if (message && !firstInvalid) firstInvalid = input;
            });

            return firstInvalid;
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot: a filled-in hidden checkbox means a bot filled the form
            const botcheck = contactForm.querySelector('[name="botcheck"]');
            if (botcheck && botcheck.checked) return;

            const firstInvalid = validateForm();
            if (firstInvalid) {
                showToast('Please fix the highlighted field before sending.');
                firstInvalid.focus();
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            const payload = Object.fromEntries(new FormData(contactForm).entries());
            // Build a clear, branded email subject line while keeping the visitor's
            // own subject visible as its own labeled row in the email body.
            payload.subject = `Portfolio Contact: ${payload.inquiry_subject}`;
            payload.page_url = window.location.href;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();

                if (response.ok && result.success) {
                    showToast('Message sent! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    showToast('Something went wrong. Please email me directly instead.');
                }
            } catch (err) {
                showToast('Network error. Please email me directly instead.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = submitBtnDefaultHtml;
                }
            }
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
