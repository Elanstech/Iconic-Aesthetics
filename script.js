/**
 * Iconic Aesthetics - Optimized JavaScript
 * Ensures all elements load properly on first page visit
 */

(function() {
    'use strict';

    // Global state
    const state = {
        isInitialized: false,
        scrollPosition: 0,
        isMobile: window.innerWidth <= 768
    };

    // DOM Cache
    const dom = {};

    // Initialize DOM cache
    function cacheDOM() {
        dom.body = document.body;
        dom.header = document.querySelector('.site-header');
        dom.menuToggle = document.querySelector('.menu-toggle');
        dom.mobileNav = document.querySelector('.mobile-nav');
        dom.mobileNavClose = document.querySelector('.mobile-nav-close');
        dom.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        dom.navLinks = document.querySelectorAll('.nav-link');
        dom.backToTop = document.getElementById('back-to-top');
        dom.heroContent = document.querySelector('.hero-content');
        dom.scrollIndicator = document.querySelector('.scroll-indicator');
        dom.heroVideo = document.querySelector('.hero-background-video');
        dom.sections = document.querySelectorAll('section[id]');
    }

    // =======================================================================
    // INITIALIZATION
    // =======================================================================
    function init() {
        if (state.isInitialized) return;
        
        console.log('🚀 Initializing Iconic Aesthetics...');
        
        // Cache DOM elements
        cacheDOM();
        
        // Initialize all components
        initNavigation();
        initScrollEffects();
        initHeroVideo();
        initServices();
        initBeforeAfterSliders();
        initFAQ();
        initGallery();
        initForms();
        initLazyLoad();
        
        // Initialize AOS with proper settings
        initAOS();
        
        // Force initial checks
        forceInitialLoad();
        
        // Handle resize events
        handleResize();
        
        // Mark as initialized
        state.isInitialized = true;
        
        console.log('✅ Initialization complete');
    }

    // =======================================================================
    // AOS INITIALIZATION
    // =======================================================================
    function initAOS() {
        if (typeof AOS === 'undefined') {
            console.warn('AOS library not found');
            return;
        }

        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom'
        });

        // Force AOS refresh after a short delay
        setTimeout(() => {
            AOS.refresh();
            // Trigger scroll to activate visible elements
            window.scrollTo(window.scrollX, window.scrollY + 1);
            window.scrollTo(window.scrollX, window.scrollY - 1);
        }, 300);
    }

    // =======================================================================
    // FORCE INITIAL LOAD
    // =======================================================================
    function forceInitialLoad() {
        // Make all sections visible initially
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.style.visibility === 'hidden') {
                section.style.visibility = 'visible';
            }
            if (section.style.opacity === '0') {
                section.style.opacity = '1';
            }
        });

        // Trigger resize and scroll events to activate lazy elements
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('scroll'));
        
        // Update active navigation
        updateActiveNavLink();
        
        // Refresh any scroll-based animations
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    // =======================================================================
    // NAVIGATION
    // =======================================================================
    function initNavigation() {
        if (!dom.menuToggle || !dom.mobileNav) return;

        // Mobile menu toggle
        dom.menuToggle.addEventListener('click', toggleMobileMenu);
        
        // Mobile menu close
        if (dom.mobileNavClose) {
            dom.mobileNavClose.addEventListener('click', closeMobileMenu);
        }
        
        // Close mobile menu when clicking on links
        dom.mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Smooth scrolling for all anchor links
        initSmoothScroll();
        
        // Update active nav on scroll
        window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    }

    function toggleMobileMenu() {
        const isActive = dom.mobileNav.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        dom.menuToggle.classList.add('active');
        dom.mobileNav.classList.add('active');
        dom.body.style.overflow = 'hidden';
        
        // Animate menu items
        dom.mobileNavLinks.forEach((link, index) => {
            link.parentElement.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    function closeMobileMenu() {
        dom.menuToggle.classList.remove('active');
        dom.mobileNav.classList.remove('active');
        dom.body.style.overflow = '';
        
        // Reset transition delays
        dom.mobileNavLinks.forEach(link => {
            link.parentElement.style.transitionDelay = '0s';
        });
    }

    function initSmoothScroll() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = dom.header ? dom.header.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 200;
        
        dom.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                dom.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // =======================================================================
    // SCROLL EFFECTS
    // =======================================================================
    function initScrollEffects() {
        // Initial check
        handleScroll();
        
        // Add scroll listener
        window.addEventListener('scroll', throttle(handleScroll, 16));
        
        // Back to top button
        if (dom.backToTop) {
            dom.backToTop.addEventListener('click', scrollToTop);
        }
        
        // Scroll indicator
        if (dom.scrollIndicator) {
            dom.scrollIndicator.addEventListener('click', scrollToNextSection);
        }
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Header scroll effect
        if (dom.header) {
            if (scrollY > 50) {
                dom.header.classList.add('scrolled');
            } else {
                dom.header.classList.remove('scrolled');
            }
        }
        
        // Back to top visibility
        if (dom.backToTop) {
            if (scrollY > 300) {
                dom.backToTop.classList.add('active');
            } else {
                dom.backToTop.classList.remove('active');
            }
        }
        
        // Hero parallax
        if (dom.heroContent && scrollY < window.innerHeight) {
            dom.heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            dom.heroContent.style.opacity = 1 - (scrollY * 0.003);
        }
    }

    function scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function scrollToNextSection() {
        const nextSection = document.querySelector('#about') || document.querySelector('section:nth-child(2)');
        if (!nextSection) return;
        
        const headerHeight = dom.header ? dom.header.offsetHeight : 0;
        const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // =======================================================================
    // HERO VIDEO
    // =======================================================================
    function initHeroVideo() {
        if (!dom.heroVideo) return;
        
        // Ensure video can play
        const playVideo = () => {
            const playPromise = dom.heroVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Video playing');
                }).catch(error => {
                    console.error('Video play failed:', error);
                    handleVideoError();
                });
            }
        };
        
        if (dom.heroVideo.readyState >= 2) {
            playVideo();
        } else {
            dom.heroVideo.addEventListener('loadeddata', playVideo);
        }
    }

    function handleVideoError() {
        // Add fallback play button
        const videoWrapper = document.querySelector('.hero-video-wrapper');
        if (!videoWrapper) return;
        
        const playButton = document.createElement('button');
        playButton.className = 'video-play-btn';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.setAttribute('aria-label', 'Play video');
        
        videoWrapper.appendChild(playButton);
        
        playButton.addEventListener('click', function() {
            dom.heroVideo.play();
            playButton.style.display = 'none';
        });
    }

    // =======================================================================
    // SERVICES SECTION
    // =======================================================================
    function initServices() {
        const filterButtons = document.querySelectorAll('.service-filter');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!filterButtons.length || !serviceCards.length) return;
        
        // Setup filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                handleServiceFilter(this, filterButtons, serviceCards);
            });
        });
        
        // Initial state
        filterServiceCards('all', serviceCards);
        
        // Booking buttons
        document.addEventListener('click', function(e) {
            if (e.target.matches('.book-service, .main-cta-btn')) {
                scrollToBooking();
            }
        });
    }

    function handleServiceFilter(button, allButtons, cards) {
        const filter = button.getAttribute('data-filter');
        
        // Update active state
        allButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter cards
        filterServiceCards(filter, cards);
    }

    function filterServiceCards(filter, cards) {
        cards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const isMain = card.getAttribute('data-main') === 'true';
            
            const shouldShow = filter === 'all' ? isMain : category === filter;
            
            if (shouldShow) {
                showCard(card, index);
            } else {
                hideCard(card);
            }
        });
    }

    function showCard(card, index) {
        card.style.display = 'block';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50 + (index * 50));
    }

    function hideCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    }

    function scrollToBooking() {
        const bookingSection = document.querySelector('#booking');
        if (!bookingSection) return;
        
        const headerHeight = dom.header ? dom.header.offsetHeight : 0;
        const targetPosition = bookingSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // =======================================================================
    // BEFORE-AFTER SLIDERS
    // =======================================================================
    function initBeforeAfterSliders() {
        const containers = document.querySelectorAll('.ba-container');
        if (!containers.length) return;
        
        containers.forEach(container => {
            initSingleSlider(container);
        });
    }

    function initSingleSlider(container) {
        const slider = container.querySelector('.ba-slider');
        const beforeImage = container.querySelector('.before-image');
        const divider = container.querySelector('.ba-divider');
        
        if (!slider || !beforeImage || !divider) return;
        
        let isDragging = false;
        
        // Set initial position
        setSliderPosition(container, 50);
        
        // Mouse events
        slider.addEventListener('mousedown', e => startDrag(e, container));
        window.addEventListener('mousemove', e => handleDrag(e, container, isDragging));
        window.addEventListener('mouseup', () => endDrag(container));
        
        // Touch events
        slider.addEventListener('touchstart', e => startDrag(e, container), { passive: true });
        window.addEventListener('touchmove', e => handleDrag(e, container, isDragging), { passive: true });
        window.addEventListener('touchend', () => endDrag(container));
        
        // Store dragging state
        container.dataset.dragging = 'false';
        
        // Initial animation
        animateSlider(container);
    }

    function startDrag(e, container) {
        e.preventDefault();
        container.dataset.dragging = 'true';
        container.classList.add('dragging');
        updateSliderPosition(e, container);
    }

    function handleDrag(e, container, isDragging) {
        if (container.dataset.dragging !== 'true') return;
        updateSliderPosition(e, container);
    }

    function endDrag(container) {
        container.dataset.dragging = 'false';
        container.classList.remove('dragging');
    }

    function updateSliderPosition(e, container) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const rect = container.getBoundingClientRect();
        const position = ((clientX - rect.left) / rect.width) * 100;
        setSliderPosition(container, position);
    }

    function setSliderPosition(container, percentage) {
        percentage = Math.max(0, Math.min(100, percentage));
        
        const slider = container.querySelector('.ba-slider');
        const divider = container.querySelector('.ba-divider');
        const beforeImage = container.querySelector('.before-image');
        
        slider.style.left = `${percentage}%`;
        divider.style.left = `${percentage}%`;
        beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    }

    function animateSlider(container) {
        setTimeout(() => {
            animateSliderMovement(container, 50, 65, 600, () => {
                animateSliderMovement(container, 65, 35, 600, () => {
                    animateSliderMovement(container, 35, 50, 400);
                });
            });
        }, 1000);
    }

    function animateSliderMovement(container, start, end, duration, callback) {
        const startTime = Date.now();
        
        function step() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPos = start + (end - start) * progress;
            
            setSliderPosition(container, currentPos);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else if (callback) {
                callback();
            }
        }
        
        requestAnimationFrame(step);
    }

    // =======================================================================
    // FAQ SECTION
    // =======================================================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;
            
            question.addEventListener('click', () => toggleFAQ(item, faqItems));
        });
    }

    function toggleFAQ(item, allItems) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        allItems.forEach(faq => {
            faq.classList.remove('active');
            const icon = faq.querySelector('.faq-icon i');
            if (icon) icon.className = 'fas fa-plus';
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            const icon = item.querySelector('.faq-icon i');
            if (icon) icon.className = 'fas fa-minus';
        }
    }

    // =======================================================================
    // GALLERY SECTION
    // =======================================================================
    function initGallery() {
        const filters = document.querySelectorAll('.gallery-filter');
        const items = document.querySelectorAll('.gallery-item');
        
        if (!filters.length || !items.length) return;
        
        filters.forEach(filter => {
            filter.addEventListener('click', function() {
                handleGalleryFilter(this, filters, items);
            });
        });
        
        // Show all items initially
        items.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
        });
    }

    function handleGalleryFilter(filter, allFilters, items) {
        const category = filter.getAttribute('data-filter');
        
        // Update active filter
        allFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // Filter items
        items.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50 * index);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // =======================================================================
// BOOKING EMAIL FUNCTIONALITY
// =======================================================================

function sendBookingEmail() {
    const form = document.getElementById('booking-form');
    
    // Check if form exists
    if (!form) {
        console.error('Booking form not found');
        alert('Booking form not found. Please refresh the page and try again.');
        return;
    }
    
    const formData = new FormData(form);
    
    // Get form values with fallbacks
    const name = formData.get('name')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const phone = formData.get('phone')?.trim() || '';
    const service = formData.get('service')?.trim() || '';
    const date = formData.get('date')?.trim() || '';
    const time = formData.get('time')?.trim() || '';
    const message = formData.get('message')?.trim() || '';
    
    // Validate required fields
    const requiredFields = [
        { value: name, name: 'Full Name' },
        { value: email, name: 'Email Address' },
        { value: phone, name: 'Phone Number' },
        { value: service, name: 'Service' },
        { value: date, name: 'Preferred Date' },
        { value: time, name: 'Preferred Time' }
    ];
    
    const missingFields = requiredFields.filter(field => !field.value);
    
    if (missingFields.length > 0) {
        const fieldNames = missingFields.map(field => field.name).join(', ');
        alert(`Please fill in the following required fields: ${fieldNames}`);
        
        // Highlight missing fields
        requiredFields.forEach(field => {
            const input = form.querySelector(`[name="${field.name.toLowerCase().replace(/\s+/g, '')}"]`) || 
                         form.querySelector(`[name="${field.name.toLowerCase().replace(/\s+/g, '').replace('preferred', '')}"]`);
            if (input) {
                if (!field.value) {
                    input.style.borderColor = '#e74c3c';
                    input.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
                } else {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }
            }
        });
        
        return;
    }
    
    // Clear any error styling
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        const emailInput = form.querySelector('[name="email"]');
        if (emailInput) {
            emailInput.style.borderColor = '#e74c3c';
            emailInput.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
        }
        return;
    }
    
    // Format date for better readability
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch (error) {
            return dateString;
        }
    };
    
    // Create email subject
    const subject = encodeURIComponent(`New Booking Request - ${service}`);
    
    // Create comprehensive email body
    const emailBody = `
Dear Iconic Aesthetics Team,

I would like to book an appointment with the following details:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Phone: ${phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPOINTMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service Requested: ${service}
Preferred Date: ${formatDate(date)}
Preferred Time: ${time}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message || 'No additional requests or questions'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please confirm my appointment or contact me to schedule an alternative time if the requested slot is not available. I look forward to hearing from you soon!

Thank you for your time and consideration.

Best regards,
${name}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This booking request was submitted through the Iconic Aesthetics website.
For questions, please contact the client directly at ${email} or ${phone}.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    
    const body = encodeURIComponent(emailBody);
    
    // Create mailto link
    const mailtoLink = `mailto:iconicastheicsis@gmail.com?subject=${subject}&body=${body}`;
    
    // Check if mailto is supported
    try {
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message after a short delay
        setTimeout(() => {
            const confirmationMessage = `
Your email client should have opened with your booking request for ${service}.

Please send the email to complete your booking request.

If your email client didn't open, you can manually send an email to:
iconicastheicsis@gmail.com

We'll get back to you within 24 hours to confirm your appointment!
            `.trim();
            
            alert(confirmationMessage);
            
            // Optional: Clear form after successful submission
            // form.reset();
            
        }, 500);
        
        // Track booking attempt (if analytics is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'booking_attempt', {
                'event_category': 'engagement',
                'event_label': service,
                'value': 1
            });
        }
        
    } catch (error) {
        console.error('Error opening email client:', error);
        
        // Fallback: Show manual contact information
        const fallbackMessage = `
Unable to open your email client automatically.

Please manually send an email to: iconicastheicsis@gmail.com

Include the following information:
• Your name: ${name}
• Service: ${service}
• Preferred date: ${formatDate(date)}
• Preferred time: ${time}
• Your phone: ${phone}
• Your email: ${email}
${message ? `• Additional notes: ${message}` : ''}

We apologize for the inconvenience and will respond within 24 hours!
        `.trim();
        
        alert(fallbackMessage);
    }
}

/**
 * Initialize booking functionality when DOM is ready
 */
function initBookingScript() {
    // Make function globally available
    window.sendBookingEmail = sendBookingEmail;
    
    // Add event listeners for better user experience
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        // Clear error styling when user starts typing
        const inputs = bookingForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
        
        // Set minimum date to today
        const dateInput = bookingForm.querySelector('[name="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookingScript);
} else {
    initBookingScript();
}

    // =======================================================================
    // FORMS
    // =======================================================================
    function initForms() {
        const forms = document.querySelectorAll('form');
        if (!forms.length) return;
        
        forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        // Validate fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        // Remove existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        // Show appropriate message
        const message = createFormMessage(isValid);
        form.appendChild(message);
        
        if (isValid) {
            form.reset();
        }
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    function createFormMessage(isValid) {
        const message = document.createElement('div');
        message.className = `form-message ${isValid ? 'success' : 'error'}`;
        message.textContent = isValid 
            ? 'Your message has been sent successfully!'
            : 'Please fill in all required fields.';
        return message;
    }

    // =======================================================================
    // LAZY LOADING
    // =======================================================================
    function initLazyLoad() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (!lazyImages.length) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // =======================================================================
    // UTILITIES
    // =======================================================================
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

    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    function handleResize() {
        const resizeHandler = debounce(() => {
            state.isMobile = window.innerWidth <= 768;
            
            // Refresh AOS on resize
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 250);
        
        window.addEventListener('resize', resizeHandler);
    }

    // =======================================================================
    // INITIALIZATION HANDLERS
    // =======================================================================
    
    // Try multiple initialization methods to ensure proper loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already ready
        init();
    }

    // Also initialize on window load as backup
    window.addEventListener('load', function() {
        if (!state.isInitialized) {
            init();
        } else {
            // Even if initialized, force a refresh
            forceInitialLoad();
        }
    });

    // Expose init function globally for debugging
    window.IconicAestheticsInit = init;

})();
