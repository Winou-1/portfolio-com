new FinisherHeader({
  "count": 12,
  "size": {
    "min": 1300,
    "max": 1500,
    "pulse": 0
  },
  "speed": {
    "x": {
      "min": 0.1,
      "max": 1
    },
    "y": {
      "min": 0.6,
      "max": 3
    }
  },
  "colors": {
    "background": "#690555ff",
    "particles": [
      "#26f8ff",
      "#000000",
      "#1a28a7",
      "#000000",
      "#42003dff"
    ]
  },
  "blending": "lighten",
  "opacity": {
    "center": 0.3,
    "edge": 0
  },
  "skew": -2,
  "shapes": [
    "c"
  ]
});
// ===== NAVIGATION ACTIVE STATE =====
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

// Function to update active nav link
function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
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

// ===== ANIMATION DES SECTIONS AU SCROLL =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h1 = entry.target.querySelector('h1');
            const info = entry.target.querySelector('.section-info');
            
            if (h1 && !h1.style.animation) {
                h1.style.animation = 'fadeInUp 1s ease forwards';
            }
            if (info && !info.style.animation) {
                info.style.animation = 'fadeInUp 1s ease forwards';
                info.style.animationDelay = '0.3s';
            }
        }
    });
}, observerOptions);

// Observer toutes les sections sauf la première (déjà animée au chargement)
sections.forEach((section, index) => {
    if (index > 0) {
        observer.observe(section);
    }
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link (except dropdown toggle)
    navLinks.forEach(link => {
        if (!link.classList.contains('dropdown-toggle')) {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
            navLinksContainer.classList.remove('active');
        }
    });
}

// ===== DROPDOWN MENU (MOBILE) =====
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if (dropdownToggle && window.innerWidth <= 768) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
}

// Close dropdown items on mobile
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            dropdown.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });
});

// ===== SMOOTH SCROLL TO PROJECTS =====
document.querySelectorAll('a[href^="#project"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

// ===== ARCH ANIMATION - STYLE CODEPEN =====
const archInfos = document.querySelectorAll('.arch__info');
const archImages = document.querySelectorAll('.arch__right .img-wrapper');

// Animation au scroll pour les éléments de l'arch
const archObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

archInfos.forEach(info => {
    archObserver.observe(info);
});

// Smooth scroll pour la section projets
const servicesSection = document.getElementById('services');
if (servicesSection) {
    // Animation au chargement
    setTimeout(() => {
        archInfos.forEach((info, index) => {
            setTimeout(() => {
                info.classList.add('visible');
            }, index * 200);
        });
    }, 1000);
}

// Effet de changement de fond au scroll
const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB", "#E8F5E8"];
let currentBgIndex = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const servicesSection = document.getElementById('services');
    
    if (servicesSection) {
        const sectionTop = servicesSection.offsetTop;
        const sectionHeight = servicesSection.offsetHeight;
        
        if (scrollY + windowHeight/2 >= sectionTop && scrollY + windowHeight/2 <= sectionTop + sectionHeight) {
            const progress = (scrollY + windowHeight/2 - sectionTop) / sectionHeight;
            const newIndex = Math.floor(progress * bgColors.length);
            
            if (newIndex !== currentBgIndex && newIndex < bgColors.length) {
                currentBgIndex = newIndex;
                servicesSection.style.backgroundColor = bgColors[newIndex];
            }
        }
    }
});

// Animation GSAP pour les images au survol
archImages.forEach((image, index) => {
    image.addEventListener('mouseenter', () => {
        gsap.to(image.querySelector('img'), {
            objectPosition: '0px 40%',
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    image.addEventListener('mouseleave', () => {
        gsap.to(image.querySelector('img'), {
            objectPosition: '0px 50%',
            duration: 0.6,
            ease: 'power2.out'
        });
    });
});

// ===== GESTION DU DÉFILEMENT DES IMAGES =====
window.addEventListener('scroll', () => {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;

    const sectionTop = servicesSection.offsetTop;
    const sectionHeight = servicesSection.offsetHeight;
    const scrollPosition = window.scrollY;
    
    // Calculer la progression dans la section
    if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
        const progress = (scrollPosition - sectionTop) / (sectionHeight - window.innerHeight);
        const totalProjects = archInfos.length;
        
        // Déterminer quelle image afficher en fonction de la progression
        archImages.forEach((img, index) => {
            const imgIndex = totalProjects - index; // Inverser l'ordre car data-index va de 4 à 1
            const startProgress = (imgIndex - 1) / totalProjects;
            const endProgress = imgIndex / totalProjects;
            
            if (progress >= startProgress && progress < endProgress) {
                img.classList.add('visible');
                img.style.zIndex = '10';
            } else {
                img.classList.remove('visible');
                img.style.zIndex = '1';
            }
        });
    }
});