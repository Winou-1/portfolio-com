// GSAP Animations Portfolio

// Active navigation state management
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('.section');

        // Function to update active nav link
        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                // Adjusting the offset slightly higher for a smoother transition
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Listen for scroll events
        window.addEventListener('scroll', updateActiveNav);

        // Mobile menu toggle functionality
        const menuToggle = document.getElementById('menuToggle');
        const navLinksContainer = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Toggle menu icon visual change (optional, depends on CSS)
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Check if the menu is visible (mobile only)
                if (window.innerWidth <= 900) {
                    navLinksContainer.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
gsap.from(".home-content > *", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from(".profile-photo", {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)",
    delay: 0.5
});

// Generic section title animation (reusable for all sections)
sections.forEach(section => {
    const sectionTitle = section.querySelector('.section-title');
    const sectionSubtitle = section.querySelector('.section-subtitle');

    if (sectionTitle) {
        gsap.from([sectionTitle, sectionSubtitle], {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionTitle,
                start: "top 80%", // Start animation when top of title hits 80% of viewport
                toggleActions: "play none none none"
            }
        });
    }

    // Generic content animation for grid/cards
    // Mise à jour pour inclure les nouvelles cartes de compétences (.skill-detail-card)
    const contentItems = section.querySelectorAll('.detail-item, .skill-detail-card, .project-card, .contact-grid, .hobby-card'); 
    if (contentItems.length > 0) {
        gsap.from(contentItems, {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 70%", // Start animation when section hits 70% of viewport
                toggleActions: "play none none none"
            }
        });
    }
});


// Utility functions (Debounce/Throttle for performance)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
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
    // Scroll-based animations here (updateActiveNav is already outside of this for responsiveness)
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Preload images for better performance
function preloadImages() {
    // List of important images to preload (e.g., profile photo, project images)
    const images = [
        'https://placehold.co/400x400/6366f1/ffffff?text=Votre+Photo', // Home photo
        'https://placehold.co/400x300/10b981/ffffff?text=PROJECT+IMAGE', // REX 1
        'https://placehold.co/400x300/ec4899/ffffff?text=PROJECT+2'  // REX 2
    ];
    images.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload function on window load
window.addEventListener('load', preloadImages);
