// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking menu items
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Enhanced scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Enhanced form validation with better feedback
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const formData = new FormData(this);
    
    for (let [key, value] of formData.entries()) {
        const element = this.elements[key];
        const parent = element.parentElement;
        
        if (!value.trim()) {
            isValid = false;
            parent.classList.add('error');
            showError(element, 'This field is required');
        } else if (key === 'email' && !validateEmail(value)) {
            isValid = false;
            parent.classList.add('error');
            showError(element, 'Please enter a valid email address');
        } else {
            parent.classList.remove('error');
        }
    }

    if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'animate__animated animate__fadeInUp';
        successMessage.style.color = '#059669';
        successMessage.style.padding = '1rem';
        successMessage.style.marginTop = '1rem';
        successMessage.style.textAlign = 'center';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll contact you soon.';
        
        this.appendChild(successMessage);
        this.reset();
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(element, message) {
    const errorDiv = element.parentElement.querySelector('.error-message') ||
        createElement('div', { className: 'error-message animate__animated animate__fadeIn' });
    errorDiv.textContent = message;
    element.parentElement.appendChild(errorDiv);
}

function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        element[key] = value;
    });
    return element;
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.service-card, .product-card, .testimonial-card, .stat-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});