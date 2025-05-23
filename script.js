/**
 * Iconic Aesthetics - Main JavaScript File
 * 
 * This file contains all interactive functionality for the Iconic Aesthetics website.
 * It is structured in modules for better organization and maintainability.
 * 
 * Table of Contents:
 * 1. Core Setup & Initialization
 * 2. UI Components
 *    - Navigation
 *    - Scroll Effects
 *    - Forms & Validation
 * 3. Feature Modules
 *    - Hero Section
 *    - Services Section
 *    - Gallery & Before/After Sliders
 *    - FAQ Accordion
 *    - Animations & Effects
 * 4. Utilities & Helpers
 * 5. Performance Monitoring
 */

/* =========================================
   1. CORE SETUP & INITIALIZATION
   ========================================= */
const IconicApp = {
    // Global settings
    settings: {
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isTouchDevice: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
        isGsapAvailable: typeof gsap !== 'undefined'
    },
    
    // Global references to DOM elements
    elements: {},
    
    // Initialize the application
    init: function() {
        this.cacheElements();
        this.bindEvents();
        this.initializeModules();
        
        console.log('✅ Iconic Aesthetics application initialized');
    },
    
    // Cache DOM elements for better performance
    cacheElements: function() {
        const e = this.elements;
        
        // Core elements
        e.body = document.body;
        e.header = document.querySelector('.site-header');
        e.menuToggle = document.querySelector('.menu-toggle');
        e.mobileNav = document.querySelector('.mobile-nav');
        e.mobileNavClose = document.querySelector('.mobile-nav-close');
        e.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        e.backToTop = document.getElementById('back-to-top');
        
        // Feature elements
        e.preloader = document.querySelector('.preloader');
        e.heroVideo = document.querySelector('.hero-background-video');
        e.faqItems = document.querySelectorAll('.faq-item');
        e.galleryFilters = document.querySelectorAll('.gallery-filter');
        e.galleryItems = document.querySelectorAll('.gallery-item');
        e.beforeAfterContainers = document.querySelectorAll('.ba-container');
        e.serviceFilters = document.querySelectorAll('.service-filter');
        e.serviceCards = document.querySelectorAll('.service-card');
        e.forms = document.querySelectorAll('form');
        e.cookieConsent = document.getElementById('cookie-consent');
        e.cookieAccept = document.getElementById('cookie-accept');
        e.cookieDecline = document.getElementById('cookie-decline');
    },
    
    // Bind global events
    bindEvents: function() {
        // Window events
        window.addEventListener('load', IconicApp.Preloader.hide);
        window.addEventListener('scroll', IconicApp.debounce(IconicApp.ScrollEffects.handleScroll, 10));
        window.addEventListener('resize', IconicApp.debounce(IconicApp.handleResize, 150));
        
        // Error handling
        window.onerror = IconicApp.handleGlobalError;
    },
    
    // Initialize all modules
    initializeModules: function() {
        IconicApp.Preloader.init();
        IconicApp.Navigation.init();
        IconicApp.Hero.init();
        IconicApp.ScrollEffects.init();
        IconicApp.Services.init();
        IconicApp.Gallery.init();
        IconicApp.BeforeAfter.init();
        IconicApp.FAQ.init();
        IconicApp.Forms.init();
        IconicApp.CookieConsent.init();
        IconicApp.FloatingElements.init();
        
        // Initialize animations if GSAP is available
        if (IconicApp.settings.isGsapAvailable) {
            IconicApp.Animations.init();
        }
    },
    
    // Global resize handler
    handleResize: function() {
        // Update any necessary dimensions or recalculations
        IconicApp.BeforeAfter.updateDimensions();
        
        // Refresh ScrollTrigger if available
        if (IconicApp.settings.isGsapAvailable && typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    },
    
    // Global error handler
    handleGlobalError: function(message, source, lineno, colno, error) {
        console.error('Error:', {
            message: message,
            source: source,
            line: lineno,
            column: colno,
            error: error
        });
        
        // Continue execution even if there's an error
        return true;
    }
};

/* =========================================
   2. UI COMPONENTS
   ========================================= */

/**
 * Preloader Module
 * Handles the website preloader animation and dismissal
 */
IconicApp.Preloader = {
    init: function() {
        const preloader = IconicApp.elements.preloader;
        if (!preloader) return;
        
        // Update progress bar in preloader
        const loaderBar = document.querySelector('.loader-bar');
        if (loaderBar) {
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                } else {
                    width += 1;
                    loaderBar.style.width = width + '%';
                }
            }, 10);
        }
    },
    
    hide: function() {
        const preloader = IconicApp.elements.preloader;
        if (!preloader) return;
        
        if (IconicApp.settings.isGsapAvailable) {
            // GSAP animation for smoother preloader exit
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: function() {
                    preloader.style.display = 'none';
                    IconicApp.Hero.animateContent();
                }
            });
        } else {
            // Fallback to basic animation
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                    IconicApp.Hero.animateContent();
                }, 600);
            }, 1000);
        }
    }
};

/**
 * Navigation Module
 * Handles main navigation, mobile menu, and scroll spy
 */
IconicApp.Navigation = {
    init: function() {
        this.setupMobileMenu();
        this.setupScrollSpy();
        this.setupSmoothScroll();
    },
    
    setupMobileMenu: function() {
        const menuToggle = IconicApp.elements.menuToggle;
        const mobileNav = IconicApp.elements.mobileNav;
        const mobileNavClose = IconicApp.elements.mobileNavClose;
        const mobileNavLinks = IconicApp.elements.mobileNavLinks;
        const body = IconicApp.elements.body;
        
        if (!menuToggle || !mobileNav) return;
        
        // Mobile menu toggle
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            if (mobileNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
                
                // Animate menu items with delay
                mobileNavLinks.forEach((link, index) => {
                    link.parentElement.style.transitionDelay = `${index * 0.1}s`;
                });
            } else {
                body.style.overflow = '';
                
                // Reset transition delay
                mobileNavLinks.forEach(link => {
                    link.parentElement.style.transitionDelay = '0s';
                });
            }
        });
        
        // Mobile menu close
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        }
        
        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        });
    },
    
    setupScrollSpy: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!sections.length || !navLinks.length) return;
        
        // Improved observer options for more accurate detection
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to corresponding link
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Set active nav link on page load
        this.setInitialActiveLink(sections, navLinks);
    },
    
    setInitialActiveLink: function(sections, navLinks) {
        let currentSection = '';
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = Math.abs(window.scrollY - sectionTop);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    },
    
    setupSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = IconicApp.elements.header.offsetHeight;
                    
                    // Use GSAP for smoother scrolling if available
                    if (IconicApp.settings.isGsapAvailable && typeof ScrollToPlugin !== 'undefined') {
                        gsap.to(window, {
                            duration: 1.2, 
                            scrollTo: {
                                y: targetElement,
                                offsetY: headerHeight
                            },
                            ease: "power3.inOut"
                        });
                    } else {
                        // Fallback to manual calculation for smoother scroll
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Close mobile menu if open
                    const mobileNav = IconicApp.elements.mobileNav;
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        IconicApp.elements.menuToggle.classList.remove('active');
                        mobileNav.classList.remove('active');
                        IconicApp.elements.body.style.overflow = '';
                    }
                }
            });
        });
    }
};

/**
 * Scroll Effects Module
 * Handles scroll-based effects and animations
 */
IconicApp.ScrollEffects = {
    init: function() {
        const backToTop = IconicApp.elements.backToTop;
        
        if (backToTop) {
            backToTop.addEventListener('click', this.scrollToTop);
        }
        
        // Initial check on page load
        this.handleScroll();
    },
    
    handleScroll: function() {
        requestAnimationFrame(function() {
            const header = IconicApp.elements.header;
            const backToTop = IconicApp.elements.backToTop;
            
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // Back to top button visibility
            if (backToTop) {
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            }
        });
    },
    
    scrollToTop: function(e) {
        if (e) e.preventDefault();
        
        // Use GSAP for smoother scrolling if available
        if (IconicApp.settings.isGsapAvailable && typeof ScrollToPlugin !== 'undefined') {
            gsap.to(window, {
                duration: 1.2, 
                scrollTo: { y: 0 },
                ease: "power3.inOut"
            });
        } else {
            // Fallback to native smooth scroll
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
};

/**
 * Forms Module
 * Handles form validation and submission
 */
IconicApp.Forms = {
    init: function() {
        const forms = IconicApp.elements.forms;
        if (!forms.length) return;
        
        forms.forEach(form => {
            form.addEventListener('submit', this.handleSubmit);
        });
    },
    
    handleSubmit: function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Add shake animation for invalid fields
                if (IconicApp.settings.isGsapAvailable) {
                    gsap.fromTo(field, 
                        {x: -5},
                        {x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)"}
                    );
                }
            } else {
                field.classList.remove('error');
            }
        });
        
        // Remove any existing message
        const existingMessage = this.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        if (isValid) {
            IconicApp.Forms.showSuccessMessage(this);
        } else {
            IconicApp.Forms.showErrorMessage(this);
        }
    },
    
    showSuccessMessage: function(form) {
        // Show success message
        const formMessage = document.createElement('div');
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Your message has been sent successfully!';
        
        form.reset();
        form.appendChild(formMessage);
        
        // Animate success message
        if (IconicApp.settings.isGsapAvailable) {
            gsap.from(formMessage, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }
        
        // Remove message after 5 seconds
        setTimeout(() => {
            IconicApp.Forms.removeMessage(formMessage);
        }, 5000);
    },
    
    showErrorMessage: function(form) {
        // Show error message
        const formMessage = document.createElement('div');
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill in all required fields.';
        
        form.appendChild(formMessage);
        
        // Animate error message
        if (IconicApp.settings.isGsapAvailable) {
            gsap.from(formMessage, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }
        
        // Remove message after 5 seconds
        setTimeout(() => {
            IconicApp.Forms.removeMessage(formMessage);
        }, 5000);
    },
    
    removeMessage: function(message) {
        if (!message) return;
        
        if (IconicApp.settings.isGsapAvailable) {
            gsap.to(message, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => message.remove()
            });
        } else {
            message.remove();
        }
    }
};

/**
 * Cookie Consent Module
 * Handles cookie consent banner
 */
IconicApp.CookieConsent = {
    init: function() {
        const cookieConsent = IconicApp.elements.cookieConsent;
        const cookieAccept = IconicApp.elements.cookieAccept;
        const cookieDecline = IconicApp.elements.cookieDecline;
        
        if (!cookieConsent) return;
        
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('cookieConsent');
        
        if (cookieChoice === null) {
            // Show cookie consent after 2 seconds
            setTimeout(() => {
                cookieConsent.classList.add('active');
                
                // Animate entry if GSAP is available
                if (IconicApp.settings.isGsapAvailable) {
                    gsap.from(cookieConsent, {
                        y: 50,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                }
            }, 2000);
        }
        
        // Handle accept button
        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => this.handleChoice('accepted', cookieConsent));
        }
        
        // Handle decline button
        if (cookieDecline) {
            cookieDecline.addEventListener('click', () => this.handleChoice('declined', cookieConsent));
        }
    },
    
    handleChoice: function(choice, cookieConsent) {
        localStorage.setItem('cookieConsent', choice);
        
        if (IconicApp.settings.isGsapAvailable) {
            gsap.to(cookieConsent, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power3.in",
                onComplete: () => {
                    cookieConsent.classList.remove('active');
                }
            });
        } else {
            cookieConsent.classList.remove('active');
        }
    }
};

/* =========================================
   3. FEATURE MODULES
   ========================================= */

/**
 * Hero Module
 * Handles hero section video and animations
 */
IconicApp.Hero = {
    init: function() {
        this.setupHeroVideo();
        this.setupScrollIndicator();
    },
    
    setupHeroVideo: function() {
        const heroVideo = IconicApp.elements.heroVideo;
        if (!heroVideo) return;
        
        // Function to check if video can play
        const checkVideoPlayback = () => {
            const playPromise = heroVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log('Video playback started');
                })
                .catch(error => {
                    console.error('Video playback failed:', error);
                    
                    // Add poster image as fallback
                    heroVideo.poster = 'https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg';
                    
                    // Add play button for manual play
                    const playButton = document.createElement('button');
                    playButton.className = 'video-play-btn';
                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                    playButton.setAttribute('aria-label', 'Play video');
                    
                    const videoWrapper = document.querySelector('.hero-video-wrapper');
                    if (videoWrapper) {
                        videoWrapper.appendChild(playButton);
                        
                        // Add event listener to play button
                        playButton.addEventListener('click', function() {
                            heroVideo.play();
                            playButton.style.display = 'none';
                        });
                    }
                });
            }
        };
        
        // Check if video is already loaded
        if (heroVideo.readyState >= 2) {
            checkVideoPlayback();
        } else {
            // Wait for video to be loaded
            heroVideo.addEventListener('loadeddata', checkVideoPlayback);
        }
        
        // Setup parallax effect if GSAP available
        this.setupParallaxEffect();
    },
    
    setupParallaxEffect: function() {
        const heroContent = document.querySelector('.hero-content');
        
        if (!heroContent) return;
        
        if (IconicApp.settings.isGsapAvailable && typeof ScrollTrigger !== 'undefined') {
            // Create a smoother parallax effect with GSAP
            gsap.to(heroContent, {
                y: 80,
                opacity: 0.5,
                ease: "none",
                scrollTrigger: {
                    trigger: ".modern-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        } else {
            // Fallback to basic scroll effect
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                if (scrollPosition < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                    heroContent.style.opacity = 1 - (scrollPosition * 0.003);
                }
            });
        }
    },
    
    setupScrollIndicator: function() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', function() {
            // Get the next section
            const nextSection = document.querySelector('#about') || 
                                document.querySelector('section:nth-child(2)');
            
            if (nextSection) {
                const headerHeight = IconicApp.elements.header.offsetHeight;
                
                // Use GSAP for smoother scrolling if available
                if (IconicApp.settings.isGsapAvailable && typeof ScrollToPlugin !== 'undefined') {
                    gsap.to(window, {
                        duration: 1.2, 
                        scrollTo: {
                            y: nextSection,
                            offsetY: headerHeight
                        },
                        ease: "power3.inOut"
                    });
                } else {
                    // Fallback to native smooth scroll
                    const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    },
    
    animateContent: function() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        if (IconicApp.settings.isGsapAvailable) {
            const heroElements = [
                heroContent.querySelector('.hero-subtitle'),
                heroContent.querySelector('.hero-title'),
                heroContent.querySelector('.hero-description'),
                heroContent.querySelector('.hero-cta'),
                document.querySelector('.scroll-indicator')
            ].filter(el => el !== null); // Filter out any null elements
            
            gsap.set(heroElements, { opacity: 0, y: 30 });
            
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            
            tl.to(heroElements[0], { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
              .to(heroElements[1], { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
              .to(heroElements[2], { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
              .to(heroElements[3], { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
              .to(heroElements[4], { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");
        }
    }
};

/**
 * Services Module
 * Handles services section filtering and interactions
 */
IconicApp.Services = {
    init: function() {
        const filterButtons = IconicApp.elements.serviceFilters;
        const serviceCards = IconicApp.elements.serviceCards;
        
        // Make sure elements exist
        if (!filterButtons.length || !serviceCards.length) return;
        
        // Initialize filter system
        this.setupFilterButtons(filterButtons, serviceCards);
        
        // Set initial state - show only main services
        this.filterServiceCards('all', serviceCards);
        
        // Initialize booking buttons
        this.initializeBookingButtons();
    },
    
    setupFilterButtons: function(filterButtons, serviceCards) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                IconicApp.Services.filterServiceCards(filter, serviceCards);
                
                // Animate filter icon
                const icon = this.querySelector('.filter-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.5)';
                    setTimeout(() => {
                        icon.style.transform = '';
                    }, 300);
                }
            });
        });
    },
    
    filterServiceCards: function(filter, serviceCards) {
        // Use GSAP for smoother animations if available
        if (IconicApp.settings.isGsapAvailable) {
            serviceCards.forEach(card => {
                const category = card.dataset.category;
                const isMain = card.dataset.main === 'true';
                let shouldShow = false;
                
                // Determine if card should be shown
                if (filter === 'all') {
                    shouldShow = isMain;
                } else {
                    shouldShow = category === filter;
                }
                
                // Use GSAP timeline for smoother transitions
                if (shouldShow) {
                    gsap.to(card, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                        clearProps: "transform", // Clear transform properties after animation
                        onStart: () => {
                            card.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(card, {
                        autoAlpha: 0,
                        y: 20,
                        scale: 0.9,
                        duration: 0.4,
                        ease: "power2.in",
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        } else {
            // Fallback to basic animation
            serviceCards.forEach((card, index) => {
                const category = card.dataset.category;
                const isMain = card.dataset.main === 'true';
                let shouldShow = false;
                
                // Determine if card should be shown
                if (filter === 'all') {
                    // For "all" filter, only show main services
                    shouldShow = isMain;
                } else {
                    // For specific category filters, show all cards in that category
                    shouldShow = category === filter;
                }
                
                if (shouldShow) {
                    // Show card with staggered animation
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                    
                    // Add entrance animation with delay
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                } else {
                    // Hide card immediately
                    card.classList.add('hidden');
                    card.classList.remove('animate-in');
                    
                    // Delay display: none to allow for animation
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
    },
    
    initializeBookingButtons: function() {
        const bookServiceButtons = document.querySelectorAll('.book-service');
        const mainCTAButton = document.querySelector('.main-cta-btn');
        
        // Setup booking buttons
        bookServiceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card hover effect
                IconicApp.Services.handleBookingClick(this);
            });
        });
        
        // Setup main CTA button
        if (mainCTAButton) {
            mainCTAButton.addEventListener('click', function() {
                IconicApp.Services.handleBookingClick(this);
            });
        }
    },
    
    handleBookingClick: function(button) {
        // Create ripple effect
        this.createRippleEffect(button);
        
        // Navigate to booking section
        setTimeout(() => {
            this.navigateToBooking();
        }, 300);
    },
    
    createRippleEffect: function(button) {
        if (!button) return;
        
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Add ripple animation style if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => ripple.remove(), 600);
    },
    
    navigateToBooking: function() {
        const bookingSection = document.querySelector('#booking');
        if (bookingSection) {
            const headerOffset = 100;
            
            // Use GSAP if available
            if (IconicApp.settings.isGsapAvailable && typeof ScrollToPlugin !== 'undefined') {
                gsap.to(window, {
                    duration: 1.2, 
                    scrollTo: {
                        y: bookingSection,
                        offsetY: headerOffset
                    },
                    ease: "power3.inOut"
                });
            } else {
                // Fallback to native smooth scroll
                const elementPosition = bookingSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Fallback to URL hash
            window.location.href = '#booking';
        }
    }
};

/**
 * Gallery Module
 * Handles gallery filtering
 */
IconicApp.Gallery = {
    init: function() {
        const galleryFilters = IconicApp.elements.galleryFilters;
        const galleryItems = IconicApp.elements.galleryItems;
        
        if (!galleryFilters.length || !galleryItems.length) return;
        
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                galleryFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get the category from the data attribute
                const category = this.getAttribute('data-filter');
                
                // Filter gallery items with GSAP if available
                if (IconicApp.settings.isGsapAvailable) {
                    // Use GSAP for smoother animations
                    galleryItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        
                        if (category === 'all' || itemCategory === category) {
                            gsap.to(item, {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                duration: 0.4,
                                ease: "power2.out",
                                onStart: () => {
                                    item.style.display = 'block';
                                    item.style.visibility = 'visible';
                                }
                            });
                        } else {
                            gsap.to(item, {
                                opacity: 0,
                                scale: 0.9,
                                y: 20,
                                duration: 0.3,
                                ease: "power2.in",
                                onComplete: () => {
                                    item.style.display = 'none';
                                    item.style.visibility = 'hidden';
                                }
                            });
                        }
                    });
                } else {
                    // Fallback without GSAP
                    galleryItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        
                        if (category === 'all' || itemCategory === category) {
                            item.style.display = 'block';
                            item.style.visibility = 'visible';
                            
                            // Use setTimeout to create a simple animation effect
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1) translateY(0)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.9) translateY(20px)';
                            
                            // Delay hiding the element until the transition completes
                            setTimeout(() => {
                                item.style.display = 'none';
                                item.style.visibility = 'hidden';
                            }, 300);
                        }
                    });
                }
            });
        });
    }
};

/**
 * Before/After Module
 * Handles the interactive before/after sliders
 */
IconicApp.BeforeAfter = {
    containerWidths: {},
    
    init: function() {
        const baContainers = IconicApp.elements.beforeAfterContainers;
        
        if (!baContainers.length) return;
        
        baContainers.forEach((container, index) => {
            const beforeImage = container.querySelector('.before-image');
            const slider = container.querySelector('.ba-slider');
            const divider = container.querySelector('.ba-divider');
            
            if (!beforeImage || !slider || !divider) return;
            
            // Store unique ID for each container
            const containerId = `ba-container-${index}`;
            container.dataset.containerId = containerId;
            
            // Store container width
            this.containerWidths[containerId] = container.offsetWidth;
            
            // Set initial position to 50%
            this.setSliderPosition(container, 50);
            
            // Setup event listeners
            this.setupEventListeners(container, containerId);
            
            // Add initial hint animation after a delay
            setTimeout(() => {
                this.animateHint(container);
            }, 1000);
        });
    },
    
    setupEventListeners: function(container, containerId) {
        const slider = container.querySelector('.ba-slider');
        
        if (!slider) return;
        
        let isDragging = false;
        let startX, startPercent;
        
        // Handle mouse/touch events
        const handleStart = (e) => {
            isDragging = true;
            
            // Get container dimensions
            this.containerWidths[containerId] = container.offsetWidth;
            const rect = container.getBoundingClientRect();
            
            // Get starting X position (works for both mouse and touch)
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            
            // Calculate starting percentage
            startPercent = ((startX - rect.left) / this.containerWidths[containerId]) * 100;
            
            // Add active class for styling
            container.classList.add('dragging');
            
            // Prevent default behaviors
            e.preventDefault();
            e.stopPropagation();
        };
        
        const handleMove = (e) => {
            if (!isDragging) return;
            
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                // Get current X position (works for both mouse and touch)
                const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                
                // Calculate the container's position and dimensions
                const rect = container.getBoundingClientRect();
                
                // Calculate new percentage
                const newPercent = ((currentX - rect.left) / this.containerWidths[containerId]) * 100;
                
                // Update position
                this.setSliderPosition(container, newPercent);
            });
            
            // Prevent default behaviors
            e.preventDefault();
            e.stopPropagation();
        };
        
        const handleEnd = () => {
            isDragging = false;
            container.classList.remove('dragging');
        };
        
        // Add event listeners for both mouse and touch events
        // Mouse events
        slider.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
        
        // Touch events
        slider.addEventListener('touchstart', handleStart, { passive: false });
        window.addEventListener('touchmove', handleMove, { passive: false });
        window.addEventListener('touchend', handleEnd);
    },
    
    setSliderPosition: function(container, percent) {
        const beforeImage = container.querySelector('.before-image');
        const slider = container.querySelector('.ba-slider');
        const divider = container.querySelector('.ba-divider');
        
        if (!beforeImage || !slider || !divider) return;
        
        // Constrain percentage between 0 and 100
        percent = Math.max(0, Math.min(100, percent));
        
        // Use translate3d for better performance
        const xPos = `${percent}%`;
        slider.style.transform = `translateX(-50%) translateX(${xPos})`;
        divider.style.transform = `translateX(-50%) translateX(${xPos})`;
        
        // Update clip path for before image
        beforeImage.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
        
        // Adjust label opacity based on slider position
        const beforeLabel = container.querySelector('.before-label');
        const afterLabel = container.querySelector('.after-label');
        
        if (beforeLabel && afterLabel) {
            // Make labels fade when slider approaches them
            const beforeOpacity = percent < 20 ? (percent / 20) : 1;
            const afterOpacity = percent > 80 ? (100 - percent) / 20 : 1;
            
            beforeLabel.style.opacity = beforeOpacity;
            afterLabel.style.opacity = afterOpacity;
        }
    },
    
    animateHint: function(container) {
        // Animated hint showing the slider can be moved
        const animationDuration = 1500;
        const startTime = performance.now();
        
        // Current position is 50%
        const startPosition = 50;
        // Target positions for animation
        const positions = [65, 35, 50]; // right, left, center
        const durations = [0.4, 0.4, 0.2]; // portion of total time for each step
        
        // Calculate cumulative durations for animation steps
        const cumulativeDurations = durations.map((d, i) => {
            return durations.slice(0, i + 1).reduce((a, b) => a + b, 0);
        });
        
        const animateStep = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            let targetPosition;
            
            // Determine which step of the animation we're in
            if (progress <= cumulativeDurations[0]) {
                // First step: move right
                const stepProgress = progress / cumulativeDurations[0];
                targetPosition = startPosition + (positions[0] - startPosition) * this.easeInOutCubic(stepProgress);
            } else if (progress <= cumulativeDurations[1]) {
                // Second step: move left
                const stepProgress = (progress - cumulativeDurations[0]) / (cumulativeDurations[1] - cumulativeDurations[0]);
                targetPosition = positions[0] + (positions[1] - positions[0]) * this.easeInOutCubic(stepProgress);
            } else {
                // Third step: back to center
                const stepProgress = (progress - cumulativeDurations[1]) / (cumulativeDurations[2] - cumulativeDurations[1]);
                targetPosition = positions[1] + (positions[2] - positions[1]) * this.easeInOutCubic(stepProgress);
            }
            
            this.setSliderPosition(container, targetPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animateStep);
            }
        };
        
        // Start animation
        requestAnimationFrame(animateStep);
    },
    
    // Easing function for smoother animation
    easeInOutCubic: function(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    
    // Update dimensions when window resizes
    updateDimensions: function() {
        const baContainers = IconicApp.elements.beforeAfterContainers;
        if (!baContainers.length) return;
        
        baContainers.forEach(container => {
            const containerId = container.dataset.containerId;
            if (containerId) {
                this.containerWidths[containerId] = container.offsetWidth;
            }
        });
    }
};

/**
 * FAQ Module
 * Handles FAQ accordion functionality
 */
IconicApp.FAQ = {
    init: function() {
        const faqItems = IconicApp.elements.faqItems;
        if (!faqItems.length) return;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (!question) return;
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const icon = faq.querySelector('.faq-icon i');
                    if (icon) icon.className = 'fas fa-plus';
                });
                
                // If the clicked item was not active, open it
                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('.faq-icon i');
                    if (icon) icon.className = 'fas fa-minus';
                }
            });
        });
    }
};

/**
 * Floating Elements Module
 * Handles decorative floating elements and hover effects
 */
IconicApp.FloatingElements = {
    init: function() {
        if (!IconicApp.settings.prefersReducedMotion) {
            this.initBubbleAnimation();
            this.initOrbsAnimation();
            this.initShowcaseHoverEffects();
            this.initFeatureCardEffects();
        }
    },
    
    initBubbleAnimation: function() {
        // Bubbles animation
        const bubbles = document.querySelectorAll('.bubble');
        
        if (bubbles.length && IconicApp.settings.isGsapAvailable) {
            bubbles.forEach((bubble, index) => {
                // Random initial position within bounds
                const xPos = gsap.utils.random(-30, 30);
                const yPos = gsap.utils.random(-30, 30);
                const rotation = gsap.utils.random(-15, 15);
                const duration = gsap.utils.random(20, 40);
                const delay = index * 2; // Staggered delay for more natural movement
                
                // Set initial position
                gsap.set(bubble, {
                    x: xPos,
                    y: yPos,
                    rotation: rotation
                });
                
                // Create floating animation
                gsap.to(bubble, {
                    x: xPos + gsap.utils.random(-40, 40),
                    y: yPos + gsap.utils.random(-40, 40),
                    rotation: rotation + gsap.utils.random(-20, 20),
                    repeat: -1,
                    yoyo: true,
                    duration: duration,
                    delay: delay,
                    ease: "sine.inOut"
                });
            });
        }
    },
    
    initOrbsAnimation: function() {
        // Orbs animation in services section
        const orbs = document.querySelectorAll('.orb');
        
        if (orbs.length && IconicApp.settings.isGsapAvailable) {
            orbs.forEach((orb, index) => {
                const duration = gsap.utils.random(30, 60);
                const delay = index * 5;
                const path = [{x: 0, y: 0}, {x: 50, y: -100}, {x: -50, y: -200}, {x: 0, y: -300}, {x: 0, y: 0}];
                
                // Create a more complex, natural floating path
                gsap.to(orb, {
                    motionPath: {
                        path: path,
                        autoRotate: true,
                        curviness: 1.25
                    },
                    duration: duration,
                    delay: delay,
                    repeat: -1,
                    ease: "none"
                });
            });
        }
    },
    
    initShowcaseHoverEffects: function() {
        // About section showcase hover effects
        const showcase = document.querySelector('.about-showcase');
        
        if (showcase && !IconicApp.settings.isTouchDevice && window.innerWidth > 992) {
            const showcaseMain = document.querySelector('.showcase-main');
            const showcaseAccent = document.querySelector('.showcase-accent');
            const experienceBadge = document.querySelector('.experience-badge');
            
            showcase.addEventListener('mousemove', function(e) {
                // Performance optimization - use requestAnimationFrame
                requestAnimationFrame(() => {
                    // Get mouse position relative to the showcase
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left; // x position within the element
                    const y = e.clientY - rect.top;  // y position within the element
                    
                    // Calculate mouse position percentage
                    const xPercent = x / rect.width;
                    const yPercent = y / rect.height;
                    
                    // Calculate rotation and transform values (limited range of motion)
                    const rotateY = (xPercent - 0.5) * 10; // -5 to 5 degrees
                    const rotateX = (yPercent - 0.5) * -10; // -5 to 5 degrees
                    const translateZ = 20; // px
                    
                    // Apply 3D transforms to main image
                    if (showcaseMain) {
                        showcaseMain.style.transform = `
                            perspective(1000px) 
                            rotateX(${rotateX}deg) 
                            rotateY(${rotateY}deg)
                            translateZ(${translateZ}px)
                        `;
                    }
                    
                    // Subtle parallax for accent image (moves opposite to mouse)
                    if (showcaseAccent) {
                        const moveX = (xPercent - 0.5) * -20; // -10 to 10 px
                        const moveY = (yPercent - 0.5) * -20; // -10 to 10 px
                        
                        showcaseAccent.style.transform = `
                            rotate(5deg)
                            translate(${moveX}px, ${moveY}px)
                        `;
                    }
                    
                    // Badge follows mouse slightly
                    if (experienceBadge) {
                        const badgeMoveX = (xPercent - 0.5) * 15; // -7.5 to 7.5 px
                        const badgeMoveY = (yPercent - 0.5) * 15; // -7.5 to 7.5 px
                        
                        experienceBadge.style.transform = `
                            translate(${badgeMoveX}px, ${badgeMoveY}px)
                            rotate(${-badgeMoveX / 2}deg)
                            scale(1.1)
                        `;
                    }
                });
            });
            
            // Reset transforms when mouse leaves
            showcase.addEventListener('mouseleave', function() {
                if (showcaseMain) {
                    showcaseMain.style.transform = 'perspective(1000px) rotateY(5deg)';
                }
                
                if (showcaseAccent) {
                    showcaseAccent.style.transform = 'rotate(5deg)';
                }
                
                if (experienceBadge) {
                    experienceBadge.style.transform = '';
                }
            });
        }
    },
    
    initFeatureCardEffects: function() {
        // Feature card hover effects
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.card-icon');
                const siblings = Array.from(featureCards).filter(item => item !== this);
                
                // Bounce animation for icon
                if (icon && IconicApp.settings.isGsapAvailable) {
                    gsap.to(icon, {
                        scale: 1.2,
                        rotation: 15,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    });
                }
                
                // Subtle push-back effect on sibling cards
                if (siblings.length && IconicApp.settings.isGsapAvailable) {
                    gsap.to(siblings, {
                        scale: 0.98,
                        opacity: 0.8,
                        duration: 0.3
                    });
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.card-icon');
                const siblings = Array.from(featureCards).filter(item => item !== this);
                
                // Reset icon animation
                if (icon && IconicApp.settings.isGsapAvailable) {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3
                    });
                }
                
                // Reset sibling cards
                if (siblings.length && IconicApp.settings.isGsapAvailable) {
                    gsap.to(siblings, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3
                    });
                }
            });
        });
    }
};

/**
 * Animations Module
 * Handles GSAP-based scroll animations when available
 */
IconicApp.Animations = {
    init: function() {
        if (!IconicApp.settings.isGsapAvailable) return;
        
        // Register ScrollTrigger plugin if necessary
        if (gsap.registerPlugin) {
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
            }
            
            // Also register ScrollToPlugin if available
            if (typeof ScrollToPlugin !== 'undefined') {
                gsap.registerPlugin(ScrollToPlugin);
            }
        }
        
        // Initialize section animations
        this.setupAboutAnimations();
        this.setupServicesAnimations();
        this.setupGalleryAnimations();
        this.setupReviewsAnimations();
        this.setupFAQAnimations();
        this.setupBookingAnimations();
        this.setupInstagramAnimations();
        this.setupContactAnimations();
        this.setupNewsletterAnimations();
        this.setupFooterAnimations();
        
        // Refresh all ScrollTriggers after animations are set up
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    },
    
    setupAboutAnimations: function() {
        // About info text animation
        const aboutContent = document.querySelector('.about-info');
        if (aboutContent) {
            const aboutElements = [
                aboutContent.querySelector('.about-heading'),
                aboutContent.querySelector('.about-intro'),
                aboutContent.querySelector('.feature-cards'),
                aboutContent.querySelector('.owner-testimonial'),
                aboutContent.querySelector('.about-cta')
            ].filter(el => el !== null);
            
            gsap.set(aboutElements, { opacity: 0, y: 40 });
            
            ScrollTrigger.create({
                trigger: '.about-bubble',
                start: "top 70%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(aboutElements, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out"
                    });
                }
            });
        }
        
        // About showcase animation
        const aboutShowcase = document.querySelector('.about-showcase');
        if (aboutShowcase) {
            gsap.set(aboutShowcase, { opacity: 0, x: -50 });
            
            ScrollTrigger.create({
                trigger: '.about-bubble',
                start: "top 70%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(aboutShowcase, {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power2.out"
                    });
                }
            });
        }
    },
    
    setupServicesAnimations: function() {
        // Services header animation
        const servicesHeader = document.querySelector('.services-header');
        if (servicesHeader) {
            gsap.set(servicesHeader, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.ultra-services',
                start: "top 80%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(servicesHeader, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        }
        
        // Services navigation animation
        const servicesNav = document.querySelector('.services-nav');
        if (servicesNav) {
            gsap.set(servicesNav, { opacity: 0, y: 20 });
            
            ScrollTrigger.create({
                trigger: '.services-header',
                start: "top 70%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(servicesNav, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        }

        // Enhanced service cards animation
        const serviceCards = document.querySelectorAll('.service-card[data-main="true"]');
        if (serviceCards.length) {
            gsap.set(serviceCards, { opacity: 0, y: 50 });
            
            ScrollTrigger.create({
                trigger: '.services-grid',
                start: "top 75%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(serviceCards, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out"
                    });
                }
            });
        }
    },
    
    setupGalleryAnimations: function() {
        const galleryElements = [
            document.querySelector('.gallery .section-header'),
            document.querySelector('.gallery-filters'),
            document.querySelector('.gallery-grid')
        ].filter(el => el !== null);
        
        if (galleryElements.length) {
            gsap.set(galleryElements, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.gallery',
                start: "top 75%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(galleryElements, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out"
                    });
                }
            });
            
            // Individual gallery items
            const galleryItems = document.querySelectorAll('.gallery-item');
            if (galleryItems.length) {
                gsap.set(galleryItems, { opacity: 0, y: 30 });
                
                ScrollTrigger.create({
                    trigger: '.gallery-grid',
                    start: "top 80%",
                    once: IconicApp.settings.prefersReducedMotion,
                    onEnter: () => {
                        gsap.to(galleryItems, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power2.out"
                        });
                    }
                });
            }
        }
    },
    
    setupReviewsAnimations: function() {
        const reviewsElements = [
            document.querySelector('.reviews .section-header'),
            document.querySelector('.reviews-container'),
        ].filter(el => el !== null);
        
        if (reviewsElements.length) {
            gsap.set(reviewsElements, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.reviews',
                start: "top 75%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(reviewsElements, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        }
    },
    
    setupFAQAnimations: function() {
        const faqElements = [
            document.querySelector('.faq .section-header'),
            document.querySelector('.faq-content')
        ].filter(el => el !== null);
        
        if (faqElements.length) {
            gsap.set(faqElements, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.faq',
                start: "top 75%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(faqElements, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out"
                    });
                }
            });
            
            // Individual FAQ items
            const faqItems = document.querySelectorAll('.faq-item');
            if (faqItems.length) {
                gsap.set(faqItems, { opacity: 0, y: 20 });
                
                ScrollTrigger.create({
                    trigger: '.faq-content',
                    start: "top 80%",
                    once: IconicApp.settings.prefersReducedMotion,
                    onEnter: () => {
                        gsap.to(faqItems, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "power2.out"
                        });
                    }
                });
            }
        }
    },
    
    setupBookingAnimations: function() {
        const bookingElements = [
            document.querySelector('.booking .section-header'),
            document.querySelector('.booking-info'),
            document.querySelector('.booking-form')
        ].filter(el => el !== null);
        
        if (bookingElements.length) {
            gsap.set(bookingElements, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.booking',
                start: "top 75%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(bookingElements, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out"
                    });
                }
            });
            
            // Booking steps animation
            const bookingSteps = document.querySelectorAll('.booking-step');
            if (bookingSteps.length) {
                gsap.set(bookingSteps, { opacity: 0, x: -30 });
                
                ScrollTrigger.create({
                    trigger: '.booking-steps',
                    start: "top 80%",
                    once: IconicApp.settings.prefersReducedMotion,
                    onEnter: () => {
                        gsap.to(bookingSteps, {
                            opacity: 1,
                            x: 0,
                            duration: 0.5,
                            stagger: 0.15,
                            ease: "back.out(1.2)"
                        });
                    }
                });
            }
        }
    },
    
    setupInstagramAnimations: function() {
        const instagramElements = [
            document.querySelector('.instagram .section-header'),
            document.querySelector('.instagram-content')
        ].filter(el => el !== null);
        
        if (instagramElements.length) {
            gsap.set(instagramElements, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.instagram',
                start: "top 75%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(instagramElements, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        }
    },
    
    setupContactAnimations: function() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            gsap.set(mapContainer, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.contact',
                start: "top 80%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(mapContainer, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        }
    },
    
    setupNewsletterAnimations: function() {
        const newsletterContent = document.querySelector('.newsletter-content');
        if (newsletterContent) {
            gsap.set(newsletterContent, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.newsletter',
                start: "top 80%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(newsletterContent, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        }
    },
    
    setupFooterAnimations: function() {
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            gsap.set(footerContent, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.footer',
                start: "top 90%",
                once: IconicApp.settings.prefersReducedMotion,
                onEnter: () => {
                    gsap.to(footerContent, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        }
    }
};

/* =========================================
   4. UTILITIES & HELPERS
   ========================================= */

/**
 * Debounce helper function
 * Limits how often a function can be called
 */
IconicApp.debounce = function(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

/* =========================================
   5. PERFORMANCE MONITORING
   ========================================= */
if ('performance' in window && 'mark' in window.performance) {
    performance.mark('js-execution-start');
    
    window.addEventListener('load', function() {
        performance.mark('page-fully-loaded');
        
        performance.measure('js-execution', 'js-execution-start', 'page-fully-loaded');
        
        console.log('Page Load Time:', performance.getEntriesByName('js-execution')[0].duration.toFixed(2) + 'ms');
    });
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    IconicApp.init();
});
