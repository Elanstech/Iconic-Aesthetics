/**
 * Iconic Aesthetics - Main JavaScript File
 * 
 * Fixed scrolling animations for all sections
 * Mailto booking functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // GLOBAL VARIABLES
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
    // PRELOADER
    // ============================================
    function initializePreloader() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) {
            // If no preloader, initialize animations immediately
            setTimeout(initializeAllAnimations, 100);
            return;
        }
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Initialize all animations after preloader
                    initializeAllAnimations();
                }, 800);
            }, 1000);
        });
    }
    
    // ============================================
    // INITIALIZE ALL ANIMATIONS
    // ============================================
    function initializeAllAnimations() {
        // Initialize hero immediately
        animateHeroSection();
        
        // Initialize scroll-triggered animations
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
            gsap.registerPlugin(ScrollTrigger);
            
            // Refresh ScrollTrigger to ensure proper measurements
            ScrollTrigger.refresh();
            
            // Initialize all section animations
            initializeAboutAnimations();
            initializeServicesAnimations();
            initializeGalleryAnimations();
            initializeReviewsAnimations();
            initializeFAQAnimations();
            initializeBookingAnimations();
            initializeInstagramAnimations();
            initializeContactAnimations();
            initializeNewsletterAnimations();
            initializeFooterAnimations();
            
            // Refresh ScrollTrigger again after all animations are set up
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        } else {
            // Fallback: Make all elements visible
            makeAllElementsVisible();
        }
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
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 200 + (index * 150));
            }
        });
    }
    
    // ============================================
    // SECTION ANIMATIONS
    // ============================================
    
    // About Section
    function initializeAboutAnimations() {
        // Animate showcase
        const showcase = document.querySelector('.about-showcase');
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
        
        // Animate info elements
        const aboutInfo = document.querySelector('.about-info');
        if (aboutInfo) {
            const elements = aboutInfo.querySelectorAll('.about-heading, .about-intro, .feature-cards, .owner-testimonial, .about-cta');
            
            gsap.fromTo(elements,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: aboutInfo,
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
        
        // Animate bubbles
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
    }
    
    // Services Section
    function initializeServicesAnimations() {
        // Header
        const servicesHeader = document.querySelector('.services-header');
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
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
        
        // Navigation
        const servicesNav = document.querySelector('.services-nav');
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
        
        // Service cards
        const serviceCards = document.querySelectorAll('.service-card[data-main="true"]');
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
                        trigger: '.services-grid',
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
        
        // Orbs
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
    
    // Gallery Section
    function initializeGalleryAnimations() {
        const gallerySection = document.querySelector('.gallery');
        if (!gallerySection) return;
        
        // Header
        const galleryHeader = gallerySection.querySelector('.section-header');
        if (galleryHeader) {
            gsap.fromTo(galleryHeader,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: galleryHeader,
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
        
        // Filters
        const galleryFilters = gallerySection.querySelector('.gallery-filters');
        if (galleryFilters) {
            gsap.fromTo(galleryFilters,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: galleryFilters,
                        start: "top 85%",
                        once: true
                    }
                }
            );
        }
        
        // Gallery items
        const galleryItems = gallerySection.querySelectorAll('.gallery-item');
        if (galleryItems.length) {
            gsap.fromTo(galleryItems,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.gallery-grid',
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
    }
    
    // Reviews Section
    function initializeReviewsAnimations() {
        const reviewsSection = document.querySelector('.reviews');
        if (!reviewsSection) return;
        
        const reviewsElements = reviewsSection.querySelectorAll('.section-header, .reviews-container');
        
        gsap.fromTo(reviewsElements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: reviewsSection,
                    start: "top 80%",
                    once: true
                }
            }
        );
    }
    
    // FAQ Section
    function initializeFAQAnimations() {
        const faqSection = document.querySelector('.faq');
        if (!faqSection) return;
        
        // Header
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
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
        
        // FAQ items
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
                        trigger: '.faq-content',
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
    }
    
    // Booking Section
    function initializeBookingAnimations() {
        const bookingSection = document.querySelector('.booking');
        if (!bookingSection) return;
        
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
        
        // Booking steps animation
        const bookingSteps = bookingSection.querySelectorAll('.booking-step');
        if (bookingSteps.length) {
            gsap.fromTo(bookingSteps,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: '.booking-steps',
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
    }
    
    // Instagram Section
    function initializeInstagramAnimations() {
        const instagramSection = document.querySelector('.instagram');
        if (!instagramSection) return;
        
        const instagramElements = instagramSection.querySelectorAll('.section-header, .instagram-content');
        
        gsap.fromTo(instagramElements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: instagramSection,
                    start: "top 80%",
                    once: true
                }
            }
        );
    }
    
    // Contact Section
    function initializeContactAnimations() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            gsap.fromTo(mapContainer,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: mapContainer,
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
    }
    
    // Newsletter Section
    function initializeNewsletterAnimations() {
        const newsletterContent = document.querySelector('.newsletter-content');
        if (newsletterContent) {
            gsap.fromTo(newsletterContent,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.newsletter',
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
    }
    
    // Footer Section
    function initializeFooterAnimations() {
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            gsap.fromTo(footerContent,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.footer',
                        start: "top 90%",
                        once: true
                    }
                }
            );
        }
    }
    
    // Fallback function to make all elements visible
    function makeAllElementsVisible() {
        const allElements = document.querySelectorAll('.section-header, .about-showcase, .about-info, .service-card, .gallery-item, .faq-item, .booking-info, .booking-form, .reviews-container, .instagram-content, .map-container, .newsletter-content, .footer-content');
        
        allElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
    
    // ============================================
    // HEADER & NAVIGATION
    // ============================================
    function initializeHeader() {
        if (!header) return;
        
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
    // SERVICES SECTION FUNCTIONALITY
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
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
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
    // FAQ FUNCTIONALITY
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
    // GALLERY FUNCTIONALITY
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
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
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
            successMessage.style.cssText = 'background: #4CAF50; color: white; padding: 1rem; border-radius: 5px; margin-top: 1rem;';
            
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
    // INITIALIZE ALL COMPONENTS
    // ============================================
    function initializeAll() {
        // Core initialization
        initializeHeader();
        initializeNavigation();
        initializeSmoothScrolling();
        initializeHeroVideo();
        
        // Section specific
        initializeServices();
        initializeFAQ();
        initializeGallery();
        initializeBookingForm();
        initializeNewsletterForm();
        
        // Start animations
        initializePreloader();
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
