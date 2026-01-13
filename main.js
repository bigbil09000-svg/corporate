/**
 * Sterling & Associates - Corporate Finance Law Firm
 * Main JavaScript File
 * 
 * Features:
 * - Mobile navigation menu
 * - Smooth scrolling
 * - Header scroll effects
 * - Form validation and submission
 * - Interactive animations
 * - Loading animations
 * - Contact form handling
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Sterling & Associates functionality...');
    
    // Test if elements exist
    const mobileButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    console.log('Quick test - Button exists:', !!mobileButton, 'Menu exists:', !!mobileMenu);
    
    // Initialize all functionality
    initMobileMenu();
    initScrollEffects();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initLoadingEffects();
    
    console.log('All functionality initialized');
    
    // Add a simple test function to window for manual testing
    window.testMobileMenu = function() {
        const button = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        console.log('Test function called');
        console.log('Button:', button);
        console.log('Menu:', menu);
        if (button && menu) {
            menu.classList.toggle('hidden');
            console.log('Menu toggled. Hidden:', menu.classList.contains('hidden'));
        }
    };
    console.log('Test function added to window.testMobileMenu()');
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    console.log('Initializing mobile menu...');
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    console.log('Mobile menu button:', mobileMenuButton);
    console.log('Mobile menu:', mobileMenu);
    
    if (!mobileMenuButton || !mobileMenu) {
        console.error('Mobile menu elements not found!');
        return;
    }
    
    console.log('Mobile menu elements found, adding event listeners...');
    
    // Simple toggle function
    function toggleMenu() {
        console.log('Toggle menu called');
        const isHidden = mobileMenu.classList.contains('hidden');
        console.log('Current menu state - hidden:', isHidden);
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            updateIcon(false); // Show X icon
            console.log('Menu opened');
        } else {
            mobileMenu.classList.add('hidden');
            updateIcon(true); // Show hamburger icon
            console.log('Menu closed');
        }
    }
    
    // Update icon function
    function updateIcon(showHamburger) {
        const svgPath = mobileMenuButton.querySelector('svg path');
        if (svgPath) {
            if (showHamburger) {
                svgPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                console.log('Icon set to hamburger');
            } else {
                svgPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
                console.log('Icon set to X');
            }
        } else {
            console.error('SVG path not found');
        }
    }
    
    // Add click event to button
    mobileMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Mobile menu button clicked');
        toggleMenu();
    });
    
    // Add click events to menu links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    console.log('Found', mobileMenuLinks.length, 'mobile menu links');
    
    mobileMenuLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            console.log('Mobile menu link', index, 'clicked');
            mobileMenu.classList.add('hidden');
            updateIcon(true);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
            console.log('Clicking outside menu, closing');
            mobileMenu.classList.add('hidden');
            updateIcon(true);
        }
    });
    
    console.log('Mobile menu initialization complete');
}

/**
 * Header Scroll Effects
 */
function initScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove background opacity based on scroll
        if (currentScrollY > 100) {
            header.classList.add('bg-white/98');
            header.classList.remove('bg-white/95');
        } else {
            header.classList.add('bg-white/95');
            header.classList.remove('bg-white/98');
        }
        
        // Hide/show header on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Handling and Validation
 */
function initFormHandling() {
    const contactForm = document.querySelector('form[action*="formspree"]');
    if (!contactForm) return;
    
    // Add real-time validation
    const requiredFields = contactForm.querySelectorAll('input[required], textarea[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            submitForm(this);
        }
    });
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error', 'border-red-500');
    field.classList.add('border-gray-300');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation (basic)
    if (field.name === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    if (!isValid) {
        field.classList.add('error', 'border-red-500');
        field.classList.remove('border-gray-300');
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Submit form with loading state
 */
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('opacity-75', 'cursor-not-allowed');
    
    // Create form data
    const formData = new FormData(form);
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage(form);
            form.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        showErrorMessage(form);
        console.error('Error:', error);
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
    });
}

/**
 * Show success message
 */
function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
    message.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</span>
        </div>
    `;
    
    form.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

/**
 * Show error message
 */
function showErrorMessage(form) {
    const message = document.createElement('div');
    message.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4';
    message.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span>Sorry, there was an error sending your message. Please try again or contact us directly.</span>
        </div>
    `;
    
    form.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

/**
 * Initialize Scroll Animations
 */
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.practice-area-card, .testimonial-card, .trust-indicator');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS classes for better animation targets
    document.querySelectorAll('.bg-white.p-8.rounded-xl').forEach(card => {
        card.classList.add('practice-area-card');
    });
}

/**
 * Initialize Loading Effects
 */
function initLoadingEffects() {
    // Add fade-in effect to hero section
    const hero = document.querySelector('#hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Stagger animation for trust indicators
    const trustIndicators = document.querySelectorAll('.grid.grid-cols-2.md\\:grid-cols-4 > div');
    trustIndicators.forEach((indicator, index) => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(20px)';
        indicator.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
            indicator.style.opacity = '1';
            indicator.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

/**
 * Utility Functions
 */

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    header {
        transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
    }
    
    .practice-area-card {
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    
    .practice-area-card:hover {
        transform: translateY(-5px);
    }
`;

document.head.appendChild(style);

// Export functions for potential external use
window.SterlingAssociates = {
    initMobileMenu,
    initScrollEffects,
    initSmoothScrolling,
    initFormHandling,
    initAnimations,
    validateField,
    validateForm
};