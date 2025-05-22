/**
 * Iconic Aesthetics - Main JavaScript File
 * 
 * Fixed scrolling animations and mailto booking functionality
 * Organized and optimized for better performance
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // GLOBAL VARIABLES & INITIALIZATION
    // ============================================
    const body = document.body;
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // ============================================
    // GSAP & SCROLLTRIGGER SETUP
    // ============================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Kill all existing ScrollTriggers to prevent conflicts
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Configure ScrollTrigger defaults
        ScrollTrigger.config({
            limitCallbacks: true,
            syncInterval: 40
        });
        
        // Refresh ScrollTrigger after page load
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    }
    
    // ============================================
    // PRELOADER
    // ============================================
    function initializePreloader() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(preloader, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        onComplete: function() {
                            preloader.style.display = 'none';
                            // Start animations after preloader
                            initializeScrollAnimations();
                            animateHeroSection();
                        }
                    });
                } else {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        initializeScrollAnimations();
                        animateHeroSection();
                    }, 800);
                }
            }, 1000);
        });
    }
    
    // ============================================
    // HERO SECTION
    // ============================================
    function initializeHeroVideo() {
        const heroVideo = document.querySelector('.hero-background-video');
        if (!heroVideo) return;
        
        // Try to play video
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }
        
        // Scroll indicator functionality
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = aboutSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    function animateHeroSection() {
        if (typeof gsap === 'undefined' || prefersReducedMotion) return;
        
        const heroElements = [
            '.hero-subtitle',
            '.hero-title',
            '.hero-description',
            '.hero-cta',
            '.scroll-indicator'
        ];
        
        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                gsap.fromTo(element,
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8, 
                        delay: 0.2 + (index * 0.15),
                        ease: "power3.out"
                    }
                );
            }
        });
    }
    
    // ============================================
    // SCROLL ANIMATIONS (FIXED)
    // ============================================
    function initializeScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) {
            // Fallback: Make all elements visible if GSAP not available
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }
        
        // Set default animation state for all animated elements
        const animatedElements = document.querySelectorAll('.section-header, .about-showcase, .about-info, .service-card, .gallery-item, .faq-item, .booking-info, .booking-form');
        gsap.set(animatedElements, { opacity: 1, y: 0 });
        
        // About Section Animations
        const aboutSection = document.querySelector('.about-bubble');
        if (aboutSection) {
            // Animate showcase
            const showcase = aboutSection.querySelector('.about-showcase');
            if (showcase) {
                gsap.fromTo(showcase,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: showcase,
                            start: "top 80%",
                            once: true
                        }
                    }
                );
            }
            
            // Animate info content
            const infoElements = aboutSection.querySelectorAll('.about-heading, .about-intro, .feature-cards, .owner-testimonial, .about-cta');
            if (infoElements.length) {
                gsap.fromTo(infoElements,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: aboutSection.querySelector('.about-info'),
                            start: "top 80%",
                            once: true
                        }
                    }
                );
            }
        }
        
        // Services Section Animations
        const servicesSection = document.querySelector('.ultra-services');
        if (servicesSection) {
            // Header animation
            const servicesHeader = servicesSection.querySelector('.services-header');
            if (servicesHeader) {
                gsap.fromTo(servicesHeader,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: servicesHeader,
                            start: "top 85%",
                            once: true
                        }
                    }
                );
            }
            
            // Navigation animation
            const servicesNav = servicesSection.querySelector('.services-nav');
            if (servicesNav) {
                gsap.fromTo(servicesNav,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: servicesNav,
                            start: "top 85%",
                            once: true
                        }
                    }
                );
            }
            
            // Service cards animation
            const serviceCards = servicesSection.querySelectorAll('.service-card[data-main="true"]');
            if (serviceCards.length) {
                gsap.fromTo(serviceCards,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: servicesSection.querySelector('.services-grid'),
                            start: "top 80%",
                            once: true
                        }
                    }
                );
            }
        }
        
        // Gallery Section Animations
        const gallerySection = document.querySelector('.gallery');
        if (gallerySection) {
            const galleryElements = [
                gallerySection.querySelector('.section-header'),
                gallerySection.querySelector('.gallery-filters'),
                ...gallerySection.querySelectorAll('.gallery-item')
            ].filter(el => el !== null);
            
            galleryElements.forEach((element, index) => {
                gsap.fromTo(element,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            once: true
                        }
                    }
                );
            });
        }
        
        // FAQ Section Animations
        const faqSection = document.querySelector('.faq');
        if (faqSection) {
            const faqHeader = faqSection.querySelector('.section-header');
            if (faqHeader) {
                gsap.fromTo(faqHeader,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: faqHeader,
                            start: "top 85%",
                            once: true
                        }
                    }
                );
            }
            
            const faqItems = faqSection.querySelectorAll('.faq-item');
            if (faqItems.length) {
                gsap.fromTo(faqItems,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: faqSection.querySelector('.faq-content'),
                            start: "top 80%",
                            once: true
                        }
                    }
                );
            }
        }
        
        // Booking Section Animations
        const bookingSection = document.querySelector('.booking');
        if (bookingSection) {
            const bookingElements = [
                bookingSection.querySelector('.section-header'),
                bookingSection.querySelector('.booking-info'),
                bookingSection.querySelector('.booking-form')
            ].filter(el => el !== null);
            
            bookingElements.forEach((element, index) => {
                gsap.fromTo(element,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            once: true
                        }
                    }
                );
            });
        }
        
        // Other Sections
        const genericSections = ['.reviews', '.instagram', '.contact', '.newsletter'];
        genericSections.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                const elements = section.querySelectorAll('.section-header, .reviews-container, .instagram-content, .map-container, .newsletter-content');
                
                elements.forEach(element => {
                    gsap.fromTo(element,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 85%",
                                once: true
                            }
                        }
                    );
                });
            }
        });
    }
    
    // ============================================
    // HEADER & NAVIGATION
    // ============================================
    function initializeHeader() {
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Back to top button
            if (backToTop) {
                if (currentScroll > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            }
            
            lastScroll = currentScroll;
        });
    }
    
    function initializeNavigation() {
        // Mobile menu toggle
        if (menuToggle && mobileNav) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileNav.classList.toggle('active');
                body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Mobile menu close
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        }
        
        // Mobile nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Active nav state with Intersection Observer
        if (sections.length && navLinks.length) {
            const observerOptions = {
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);
            
            sections.forEach(section => observer.observe(section));
        }
        
        // Back to top
        if (backToTop) {
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#' || targetId === '') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ============================================
    // SERVICES SECTION
    // ============================================
    function initializeServices() {
        const filterButtons = document.querySelectorAll('.service-filter');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!filterButtons.length || !serviceCards.length) return;
        
        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                serviceCards.forEach((card, index) => {
                    const category = card.dataset.category;
                    const isMain = card.dataset.main === 'true';
                    
                    let shouldShow = false;
                    if (filter === 'all') {
                        shouldShow = isMain;
                    } else {
                        shouldShow = category === filter;
                    }
                    
                    if (shouldShow) {
                        card.style.display = 'block';
                        if (typeof gsap !== 'undefined') {
                            gsap.to(card, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.5,
                                delay: index * 0.05,
                                ease: "power2.out"
                            });
                        } else {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }
                    } else {
                        if (typeof gsap !== 'undefined') {
                            gsap.to(card, {
                                opacity: 0,
                                scale: 0.9,
                                duration: 0.3,
                                ease: "power2.in",
                                onComplete: () => {
                                    card.style.display = 'none';
                                }
                            });
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
        
        // Initialize with "all" filter
        const allButton = document.querySelector('[data-filter="all"]');
        if (allButton) allButton.click();
        
        // Book service buttons
        const bookButtons = document.querySelectorAll('.book-service');
        bookButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const bookingSection = document.querySelector('#booking');
                if (bookingSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = bookingSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Main CTA button
        const mainCTA = document.querySelector('.main-cta-btn');
        if (mainCTA) {
            mainCTA.addEventListener('click', function() {
                const bookingSection = document.querySelector('#booking');
                if (bookingSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = bookingSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    // ============================================
    // FAQ SECTION
    // ============================================
    function initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // Close all FAQ items
                    faqItems.forEach(faq => {
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
                });
            }
        });
    }
    
    // ============================================
    // GALLERY SECTION
    // ============================================
    function initializeGallery() {
        const galleryFilters = document.querySelectorAll('.gallery-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (!galleryFilters.length || !galleryItems.length) return;
        
        // Gallery filter functionality
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                galleryFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        if (typeof gsap !== 'undefined') {
                            gsap.to(item, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        }
                    } else {
                        if (typeof gsap !== 'undefined') {
                            gsap.to(item, {
                                opacity: 0,
                                scale: 0.8,
                                duration: 0.3,
                                ease: "power2.in",
                                onComplete: () => {
                                    item.style.display = 'none';
                                }
                            });
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
        
        // Initialize before/after sliders
        initializeBeforeAfterSliders();
    }
    
    function initializeBeforeAfterSliders() {
        const beforeAfterContainers = document.querySelectorAll('.before-after-container');
        
        beforeAfterContainers.forEach(container => {
            const sliderHandle = container.querySelector('.slider-handle');
            const beforeImage = container.querySelector('.before-image');
            
            if (!sliderHandle || !beforeImage) return;
            
            let isDragging = false;
            
            function updateSliderPosition(x) {
                const containerRect = container.getBoundingClientRect();
                const containerWidth = containerRect.width;
                let position = ((x - containerRect.left) / containerWidth) * 100;
                
                position = Math.max(0, Math.min(100, position));
                
                sliderHandle.style.left = position + '%';
                beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
            }
            
            // Mouse events
            container.addEventListener('mousedown', function(e) {
                isDragging = true;
                updateSliderPosition(e.clientX);
            });
            
            window.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    updateSliderPosition(e.clientX);
                }
            });
            
            window.addEventListener('mouseup', function() {
                isDragging = false;
            });
            
            // Touch events
            container.addEventListener('touchstart', function(e) {
                isDragging = true;
                updateSliderPosition(e.touches[0].clientX);
            });
            
            window.addEventListener('touchmove', function(e) {
                if (isDragging) {
                    updateSliderPosition(e.touches[0].clientX);
                }
            });
            
            window.addEventListener('touchend', function() {
                isDragging = false;
            });
        });
    }
    
    // ============================================
    // BOOKING FORM WITH MAILTO
    // ============================================
    function initializeBookingForm() {
        const bookingForm = document.getElementById('booking-form');
        if (!bookingForm) return;
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const date = formData.get('date');
            const time = formData.get('time');
            const message = formData.get('message') || 'No special requests';
            
            // Format the email body
            const subject = encodeURIComponent('New Appointment Request - Iconic Aesthetics');
            const body = encodeURIComponent(
                `New appointment request from ${name}\n\n` +
                `Contact Information:\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n\n` +
                `Appointment Details:\n` +
                `Service: ${service}\n` +
                `Preferred Date: ${date}\n` +
                `Preferred Time: ${time}\n\n` +
                `Special Requests:\n${message}\n\n` +
                `Please respond to this request as soon as possible.`
            );
            
            // Create mailto link
            const mailtoLink = `mailto:iconicastheicsis@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-message success';
            successMessage.textContent = 'Opening your email client to send the appointment request...';
            
            // Remove any existing messages
            const existingMessage = bookingForm.querySelector('.form-message');
            if (existingMessage) existingMessage.remove();
            
            bookingForm.appendChild(successMessage);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // ============================================
    // NEWSLETTER FORM WITH MAILTO
    // ============================================
    function initializeNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Create mailto link for newsletter subscription
            const subject = encodeURIComponent('Newsletter Subscription - Iconic Aesthetics');
            const body = encodeURIComponent(
                `New newsletter subscription request:\n\n` +
                `Email: ${email}\n\n` +
                `Please add this email to the newsletter mailing list.`
            );
            
            const mailtoLink = `mailto:iconicastheicsis@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Clear the form
            emailInput.value = '';
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = 'margin-top: 1rem; color: white; font-size: 1.4rem;';
            successMessage.textContent = 'Opening your email client to complete subscription...';
            
            newsletterForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // ============================================
    // FLOATING ELEMENTS & ANIMATIONS
    // ============================================
    function initializeFloatingElements() {
        if (typeof gsap === 'undefined' || prefersReducedMotion) return;
        
        // Bubble animations
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach((bubble, index) => {
            gsap.to(bubble, {
                x: "random(-30, 30)",
                y: "random(-30, 30)",
                rotation: "random(-15, 15)",
                duration: "random(20, 40)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 2
            });
        });
        
        // Orb animations
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            gsap.to(orb, {
                y: -100,
                rotation: 360,
                duration: "random(30, 60)",
                repeat: -1,
                ease: "none",
                delay: index * 5
            });
        });
    }
    
    // ============================================
    // INITIALIZE ALL COMPONENTS
    // ============================================
    function initializeAll() {
        // Core initialization
        initializePreloader();
        initializeHeroVideo();
        initializeHeader();
        initializeNavigation();
        initializeSmoothScrolling();
        
        // Section specific
        initializeServices();
        initializeFAQ();
        initializeGallery();
        initializeBookingForm();
        initializeNewsletterForm();
        initializeFloatingElements();
        
        // Note: Scroll animations are initialized after preloader in initializePreloader()
    }
    
    // Start initialization
    initializeAll();
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Performance:', {
            'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            'Total Load Time': perfData.loadEventEnd - perfData.fetchStart,
            'DOM Interactive': perfData.domInteractive - perfData.fetchStart
        });
    }
});
