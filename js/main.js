// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');

mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileMenuBtn.innerHTML = navbar.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close the mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentIndex = 0;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToTestimonial(index);
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dot');

function goToTestimonial(index) {
    testimonials[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = index;

    testimonials[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    goToTestimonial(newIndex);
});

nextBtn.addEventListener('click', () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    goToTestimonial(newIndex);
});

// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    goToTestimonial(newIndex);
}, 5000);

// Pause on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        goToTestimonial(newIndex);
    }, 5000);
});

// Course Category Filter
const tabBtns = document.querySelectorAll('.tab-btn');
const courseCards = document.querySelectorAll('.course-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.dataset.category;

        courseCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Resource Category Filter
const resTabBtns = document.querySelectorAll('.res-tab-btn');
const resourceCards = document.querySelectorAll('.resource-card');

resTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        resTabBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const resource = btn.dataset.resource;

        resourceCards.forEach(card => {
            if (resource === 'all' || card.dataset.resource === resource) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');

        // Close other items
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.parentElement.classList.remove('active');
            }
        });
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the data to a server
    console.log({name, email, subject, message});

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


// Only animate counters when they come into view
const statsSection = document.querySelector('.stats-section');

function animateCounters() {
    const counters = document.querySelectorAll('.number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.5});

if (statsSection) {
    observer.observe(statsSection);
}

// Resource Category Switching
function showResourceCategory(category) {
    // Hide all category contents
    document.querySelectorAll('.category-content').forEach(content => {
        content.classList.remove('active');
    });

    // Show selected category
    document.getElementById(category).classList.add('active');

    // Update active tab button
    document.querySelectorAll('.res-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelector(`.res-tab-btn[data-resource="${category.replace('-', '')}"]`).classList.add('active');
}

// Set up event listeners for resource tabs
resTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const resource = btn.dataset.resource;
        let categoryId;

        switch (resource) {
            case 'all':
                categoryId = 'all-resources';
                break;
            case 'resume':
                categoryId = 'resume-tools';
                break;
            case 'interview':
                categoryId = 'interview-prep';
                break;
            case 'salary':
                categoryId = 'salary-guides';
                break;
            case 'trends':
                categoryId = 'industry-trends';
                break;
        }

        showResourceCategory(categoryId);

        // Also filter the resource cards
        resourceCards.forEach(card => {
            if (resource === 'all' || card.dataset.resource === resource) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Show all resources by default on a page load
document.addEventListener('DOMContentLoaded', () => {
    showResourceCategory('all-resources');
});