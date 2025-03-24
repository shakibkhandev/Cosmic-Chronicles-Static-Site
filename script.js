// DOM Elements
const navToggle = document.getElementById('navToggle');
const navItems = document.getElementById('navItems');
const menuOverlay = document.getElementById('menuOverlay');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navItems.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    if (navItems.classList.contains('active')) {
        // Transform hamburger to X
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        document.querySelectorAll('.nav-items li').forEach((item, index) => {
            item.style.animation = `slideIn 0.4s ease forwards ${index * 0.1}s`;
        });
    } else {
        // Revert to hamburger
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Reset menu item animations
        document.querySelectorAll('.nav-items li').forEach(item => {
            item.style.animation = 'none';
        });
    }
});

// Close mobile menu when clicking overlay
menuOverlay.addEventListener('click', () => {
    if (navItems.classList.contains('active')) {
        navToggle.click();
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && 
        !navItems.contains(e.target) && 
        !menuOverlay.contains(e.target) &&
        navItems.classList.contains('active')) {
        navToggle.click();
    }
});

// Close mobile menu when clicking on a link
navItems.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navItems.classList.contains('active')) {
            navToggle.click();
        }
    });
});

// Add slideIn animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Update active nav item on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavItem() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navItem = document.querySelector(`.nav-items a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-items a').forEach(item => item.classList.remove('active'));
            navItem?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavItem);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (navItems.classList.contains('active')) {
                navToggle.click();
            }
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('.hero-content, .search-section, .book-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add hover effect to book cards
document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});
