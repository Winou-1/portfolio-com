// GSAP Animations Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Lenis for smooth scrolling
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Navigation Active Link
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Hero Animations
    const heroTimeline = gsap.timeline();
    
    // Typewriter effect
    const typewriterTexts = [
        'Développeur Full Stack',
        'UI/UX Designer',
        'Photographe Passionné',
        'Étudiant à EPITA Lyon'
    ];
    
    let currentTextIndex = 0;
    const typewriterElement = document.querySelector('.typewriter-text');
    
    function typeWriter(text, callback) {
        typewriterElement.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(callback, 2000);
            }
        }
        
        type();
    }
    
    function startTypewriter() {
        typeWriter(typewriterTexts[currentTextIndex], () => {
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            startTypewriter();
        });
    }
    
    // Hero entrance animations
    heroTimeline
        .to('.hero-greeting', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-badges', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-actions', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .call(startTypewriter);
    
    // Profile photo animation
    gsap.fromTo('.profile-photo', {
        scale: 0.8,
        opacity: 0,
        rotation: -10
    }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 0.5
    });
    
    // Floating elements animation
    gsap.to('.floating-element', {
        y: '+=20',
        rotation: '+=360',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
    });
    
    // About Section Animations
    gsap.fromTo('.section-tag', {
        opacity: 0,
        y: 30,
        scale: 0.8
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.section-title', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.section-subtitle', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // About content animations
    gsap.fromTo('.about-intro', {
        opacity: 0,
        x: -50
    }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.highlight-item', {
        opacity: 0,
        y: 30,
        scale: 0.8
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.about-highlights',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.value-item', {
        opacity: 0,
        y: 30,
        rotation: -5
    }, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Timeline animation
    gsap.fromTo('.timeline-item', {
        opacity: 0,
        x: -50
    }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Skills Section Animations
    gsap.fromTo('.skill-category', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.skills-categories',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Skill bars animation
    gsap.utils.toArray('.skill-progress').forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        gsap.fromTo(bar, {
            width: '0%'
        }, {
            width: width + '%',
            duration: 1.5,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Tech icons animation
    gsap.fromTo('.tech-icon', {
        opacity: 0,
        scale: 0.5,
        rotation: -180
    }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.tech-icons',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Projects Section Animations
    gsap.fromTo('.filter-btn', {
        opacity: 0,
        y: 20,
        scale: 0.8
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.projects-filter',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Project cards animation
    gsap.fromTo('.project-card', {
        opacity: 0,
        y: 50,
        rotation: -5
    }, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Contact Section Animations
    gsap.fromTo('.contact-method', {
        opacity: 0,
        x: -30
    }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.contact-methods',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.social-link', {
        opacity: 0,
        scale: 0
    }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.form-group', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Parallax effects
    gsap.to('.animated-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(card, {
                        scale: 0.8,
                        opacity: 0.3,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            });
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.submit-button');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            // Show success message
            const originalText = submitButton.querySelector('.button-text').textContent;
            submitButton.querySelector('.button-text').textContent = 'Message envoyé !';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitButton.querySelector('.button-text').textContent = originalText;
                submitButton.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 2000);
    });
    
    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        gsap.to('.orb', {
            x: (mouseX - 0.5) * 50,
            y: (mouseY - 0.5) * 50,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    // Intersection Observer for additional animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for intersection observer animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // ===== GESTION MENU MOBILE ET DROPDOWN - VERSION ULTRA STABLE =====
    
    // Variables globales avec gestion d'état robuste
    let isDropdownOpen = false;
    let isMobileMenuOpen = false;
    let isProcessingClick = false; // Évite les doubles clics rapides

    // Sélecteurs uniques
    const menuToggleBtn = document.getElementById('menuToggle');
    const navCenterEl = document.querySelector('.nav-center');
    const dropdownEl = document.querySelector('.dropdown');
    const dropdownToggleBtn = document.querySelector('.dropdown-toggle');

    // Fonction pour fermer tous les menus avec animation complète
    function closeAllMenus(immediate = false) {
        if (isProcessingClick && !immediate) return;
        
        isProcessingClick = true;
        
        // Fermer menu mobile
        if (menuToggleBtn) {
            menuToggleBtn.classList.remove('active');
            isMobileMenuOpen = false;
        }
        
        // Fermer navigation
        if (navCenterEl) {
            navCenterEl.classList.remove('active');
        }
        
        // Fermer dropdown avec délai pour l'animation
        if (dropdownEl) {
            dropdownEl.classList.remove('active');
            isDropdownOpen = false;
        }
        
        // Réinitialiser le verrou après l'animation
        setTimeout(() => {
            isProcessingClick = false;
        }, immediate ? 0 : 350);
    }

    // Fonction pour ouvrir/fermer le dropdown de manière sécurisée
    function toggleDropdown(event) {
        if (isProcessingClick) return;
        
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation(); // Ultra important !
        
        isProcessingClick = true;
        
        setTimeout(() => {
            if (isDropdownOpen) {
                // Fermer le dropdown
                dropdownEl.classList.remove('active');
                isDropdownOpen = false;
            } else {
                // Ouvrir le dropdown
                dropdownEl.classList.add('active');
                isDropdownOpen = true;
            }
            
            setTimeout(() => {
                isProcessingClick = false;
            }, 150);
        }, 10);
    }

    // Gestion du menu mobile - VERSION ULTRA STABLE
    if (menuToggleBtn && navCenterEl) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            
            if (isMobileMenuOpen) {
                closeAllMenus();
            } else {
                // Fermer d'abord le dropdown s'il est ouvert
                if (isDropdownOpen) {
                    closeAllMenus(true); // Fermeture immédiate
                }
                
                // Ouvrir le menu mobile avec délai
                setTimeout(() => {
                    menuToggleBtn.classList.add('active');
                    navCenterEl.classList.add('active');
                    isMobileMenuOpen = true;
                }, 50);
            }
        });
    }

    // Gestion du dropdown - VERSION ULTRA STABLE
    if (dropdownToggleBtn && dropdownEl) {
        dropdownToggleBtn.addEventListener('click', toggleDropdown);
        
        // Support tactile pour mobile
        dropdownToggleBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleDropdown(e);
        });
    }

    // Gestionnaire de clic global - VERSION ULTRA PRÉCISE
    document.addEventListener('click', (e) => {
        if (isProcessingClick) return;
        
        const target = e.target;
        const isClickInsideMenu = menuToggleBtn && menuToggleBtn.contains(target);
        const isClickInsideNav = navCenterEl && navCenterEl.contains(target);
        const isClickInsideDropdown = dropdownEl && dropdownEl.contains(target);
        const isClickOnDropdownToggle = dropdownToggleBtn && dropdownToggleBtn.contains(target);
        
        // Ne rien faire si on clique sur les boutons de contrôle
        if (isClickOnDropdownToggle || isClickInsideMenu) {
            return;
        }
        
        // Fermer le dropdown si clic en dehors (avec délai pour éviter les conflits)
        if (isDropdownOpen && !isClickInsideDropdown) {
            setTimeout(() => {
                if (dropdownEl) {
                    dropdownEl.classList.remove('active');
                    isDropdownOpen = false;
                }
            }, 10);
        }
        
        // Fermer le menu mobile si clic en dehors
        if (isMobileMenuOpen && !isClickInsideMenu && !isClickInsideNav) {
            setTimeout(() => {
                closeAllMenus();
            }, 10);
        }
    });

    // Fermeture au scroll avec délai
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (isDropdownOpen || isMobileMenuOpen) {
                closeAllMenus();
            }
        }, 100);
    });

    // Fermeture des liens avec gestion spéciale
    const allNavLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Pour les liens dropdown, laisser le temps à la navigation de s'effectuer
            const isDropdownLink = link.classList.contains('dropdown-item');
            const delay = isDropdownLink ? 200 : 100;
            
            setTimeout(() => {
                closeAllMenus();
            }, delay);
        });
    });

    // Gestion responsive intelligente
    function handleResize() {
        const wasMobile = window.innerWidth <= 768;
        
        if (!wasMobile && (isDropdownOpen || isMobileMenuOpen)) {
            // Mode desktop : tout fermer proprement
            closeAllMenus(true);
        }
    }

    // Resize avec débounce amélioré
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 300);
    });

    // Support clavier (accessibilité)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllMenus();
        }
    });

    // Empêcher la sélection de texte sur les boutons
    if (dropdownToggleBtn) {
        dropdownToggleBtn.style.userSelect = 'none';
        dropdownToggleBtn.style.webkitUserSelect = 'none';
        dropdownToggleBtn.style.mozUserSelect = 'none';
    }

    if (menuToggleBtn) {
        menuToggleBtn.style.userSelect = 'none';
        menuToggleBtn.style.webkitUserSelect = 'none';
        menuToggleBtn.style.mozUserSelect = 'none';
    }
    
    console.log('Portfolio animations initialized successfully!');
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization for scroll events
const optimizedScroll = throttle(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
window.addEventListener('load', preloadImages);