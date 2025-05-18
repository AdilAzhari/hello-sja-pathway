// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Apply animation classes to elements
    const animateElements = (selector, animationClass) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(animationClass);
            element.style.animationDelay = `${index * 0.2}s`;
        });
    };

    // Hero section animations
    animateElements('.hero h1', 'fade-in');
    animateElements('.hero p', 'fade-in');
    animateElements('.hero-buttons', 'fade-in');

    // Feature card animations
    animateElements('.feature-card', 'slide-up');

    // Team member animations
    animateElements('.team-member', 'slide-up');

    // Mission card animations
    animateElements('.mission-card', 'fade-in');

    // Blog card animations
    animateElements('.blog-card', 'slide-up');

    // Contact info animations
    animateElements('.contact-info > *', 'slide-up');
    animateElements('.contact-form > *', 'slide-up');

    // Newsletter animations
    animateElements('.newsletter-text', 'slide-up');
    animateElements('.newsletter-form', 'slide-up');

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card, .course-card, .resource-card, .blog-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta .btn');
    ctaButtons.forEach(button => {
        button.classList.add('pulse');
    });

    // Add float animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-card .icon');
    featureIcons.forEach(icon => {
        icon.classList.add('float');
    });

    // Animate numbers in a stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});

        observer.observe(statsSection);
    }


});

// Use IntersectionObserver to only trigger animations when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});