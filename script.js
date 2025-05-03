/**
 * Iconic Aesthetics - Main JavaScript File
 * 
 * Organized and optimized JavaScript for the website functionality
 * Includes animations, navigation, video handling, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------------------------------------------
    // INITIALIZATION AND GLOBAL VARIABLES
    // ------------------------------------------------------------------------
    const body = document.body;
    const preloader = document.querySelector('.preloader');
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const backToTop = document.getElementById('back-to-top');
    const faqItems = document.querySelectorAll('.faq-item');
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');
    const forms = document.querySelectorAll('form');
    
    // Services Carousel Elements
    const servicesCarousel = document.querySelector('.services-carousel');
    const filterButtons = document.querySelectorAll('.services-filter .filter-btn, .service-filter');
    const serviceCards = document.querySelectorAll('.service-card');
    const detailButtons = document.querySelectorAll('.service-details-btn');
    const closeButtons = document.querySelectorAll('.service-close');
    
    // ------------------------------------------------------------------------
    // HERO VIDEO FUNCTIONALITY
    // ------------------------------------------------------------------------
    function initializeHeroVideo() {
        const heroVideo = document.querySelector('.hero-background-video');
        
        if (!heroVideo) return;
        
        // Function to check if video can play
        function checkVideoPlayback() {
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
                    videoWrapper.appendChild(playButton);
                    
                    // Add event listener to play button
                    playButton.addEventListener('click', function() {
                        heroVideo.play();
                        playButton.style.display = 'none';
                    });
                });
            }
        }
        
        // Check if video is already loaded
        if (heroVideo.readyState >= 2) {
            checkVideoPlayback();
        } else {
            // Wait for video to be loaded
            heroVideo.addEventListener('loadeddata', checkVideoPlayback);
        }
        
        // Parallax effect for hero content on scroll
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                if (scrollPosition < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                    heroContent.style.opacity = 1 - (scrollPosition * 0.003);
                }
            });
        }
        
        // Smooth scroll for scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                // Get the next section
                const nextSection = document.querySelector('#about') || 
                                    document.querySelector('section:nth-child(2)');
                
                if (nextSection) {
                    nextSection.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            });
        }
    }
    
    // ------------------------------------------------------------------------
    // PRELOADER
    // ------------------------------------------------------------------------
    function initializePreloader() {
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                    // Trigger AOS refresh
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                }, 600);
            }, 1000);
        });
        
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
    }
    
    // ------------------------------------------------------------------------
    // ANIMATION LIBRARIES INITIALIZATION
    // ------------------------------------------------------------------------
    function initializeAnimations() {
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: false,
                mirror: true,
                offset: 50
            });
        }
        
        // GSAP animations
        if (typeof gsap !== 'undefined') {
            // Hero animations for both new and old hero sections
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                gsap.from('.hero-tagline, .hero-subtitle', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.5
                });
                
                gsap.from('.hero-title', {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: 0.7
                });
                
                gsap.from('.hero-description', {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: 0.9
                });
                
                gsap.from('.hero-buttons, .hero-cta', {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: 1.1
                });
            }
            
            // Scroll trigger animations
            if (typeof ScrollTrigger !== 'undefined') {
                // About features
                gsap.from('.feature', {
                    scrollTrigger: {
                        trigger: '.about-features',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    x: -30,
                    stagger: 0.2,
                    duration: 0.6
                });
                
                // Gallery items
                gsap.from('.gallery-item', {
                    scrollTrigger: {
                        trigger: '.gallery-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.6
                });
                
                // Booking steps
                gsap.from('.booking-step', {
                    scrollTrigger: {
                        trigger: '.booking-steps',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    x: -30,
                    stagger: 0.2,
                    duration: 0.6
                });
                
                // Contact cards
                gsap.from('.contact-card', {
                    scrollTrigger: {
                        trigger: '.contact-info',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.6
                });
            }
        }
    }
    
    // ------------------------------------------------------------------------
    // SCROLL EFFECTS
    // ------------------------------------------------------------------------
    function initializeScrollEffects() {
        if (!header) return;
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
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
        
        // Back to top button
        if (backToTop) {
            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ------------------------------------------------------------------------
    // NAVIGATION
    // ------------------------------------------------------------------------
    function initializeNavigation() {
        // Mobile menu toggle
        if (menuToggle && mobileNav) {
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
        }
        
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
        
        // Initialize intersection observer for navbar active state
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length && navLinks.length) {
            const observerOptions = {
                rootMargin: '-100px 0px -85% 0px',
                threshold: 0
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
            function setInitialActiveLink() {
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
            }
            
            setInitialActiveLink();
        }
    }

    // ------------------------------------------------------------------------
    // SERVICES FUNCTIONALITY (Integrated from services.js)
    // ------------------------------------------------------------------------
    function initializeServices() {
        // Initialize all services components
        initializeServiceCards();
        initializeFilterSystem();
        initializeBookingButtons();
        initializeImageLoading();
        initializeAdvancedInteractions();
        initializeResponsiveFeatures();
        initializeOptimizations();
        
        // Initialize AOS for scroll animations if available
        if (typeof AOS !== 'undefined') {
            initializeAOS();
        }
        
        console.log('✅ Services section initialized successfully');
    }
    
    function initializeServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!serviceCards.length) return;
        
        setupCardFlips(serviceCards);
        setupCardHoverEffects(serviceCards);
        setupKeyboardAccessibility(serviceCards);
        
        console.log(`✅ Initialized ${serviceCards.length} service cards`);
    }
    
    function setupCardFlips(serviceCards) {
        serviceCards.forEach(card => {
            // Click handler
            card.addEventListener('click', function(e) {
                if (e.target.closest('button')) return; // Ignore button clicks
                handleCardFlip(this, serviceCards);
            });
            
            // Touch support for mobile
            let touchTime = 0;
            card.addEventListener('touchend', function(e) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - touchTime;
                
                // Double tap detection
                if (tapLength < 500 && tapLength > 0) {
                    handleCardFlip(this, serviceCards);
                }
                touchTime = currentTime;
            });
        });
    }
    
    function handleCardFlip(card, allCards) {
        card.classList.toggle('flipped');
        
        // Close other flipped cards
        allCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('flipped')) {
                otherCard.classList.remove('flipped');
            }
        });
        
        // Add animation class
        card.classList.add('animate-in');
    }
    
    function setupCardHoverEffects(serviceCards) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '';
            });
        });
    }
    
    function setupKeyboardAccessibility(serviceCards) {
        serviceCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'Service details');
            
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardFlip(this, serviceCards);
                }
            });
        });
    }
    
    function initializeFilterSystem() {
        const filterButtons = document.querySelectorAll('.service-filter');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!filterButtons.length || !serviceCards.length) return;
        
        setupFilterButtons(filterButtons, serviceCards);
        makeFilterNavigationAccessible(filterButtons);
        
        console.log('✅ Filter system initialized');
    }
    
    function setupFilterButtons(filterButtons, serviceCards) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active state
                updateActiveFilter(filterButtons, this);
                
                // Filter cards based on the new logic
                filterServiceCards(filter, serviceCards);
                
                // Animate filter icon
                animateFilterIcon(this);
            });
        });
    }
    
    function updateActiveFilter(filterButtons, activeButton) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
    
    function filterServiceCards(filter, serviceCards) {
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
                card.classList.remove('hidden');
                
                // Add entrance animation with delay
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 100);
            } else {
                // Hide card immediately
                card.classList.add('hidden');
                card.classList.remove('animate-in');
            }
            
            // Reset flip state
            card.classList.remove('flipped');
        });
    }
    
    function animateFilterIcon(button) {
        const icon = button.querySelector('.filter-icon');
        if (!icon) return;
        
        icon.style.transform = 'scale(1.5)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 300);
    }
    
    function makeFilterNavigationAccessible(filterButtons) {
        filterButtons.forEach(button => {
            button.setAttribute('role', 'button');
            button.setAttribute('aria-pressed', button.classList.contains('active'));
            
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
                this.setAttribute('aria-pressed', 'true');
            });
        });
    }
    
    function initializeBookingButtons() {
        const bookServiceButtons = document.querySelectorAll('.book-service');
        const mainCTAButton = document.querySelector('.main-cta-btn');
        
        setupBookingButtons(bookServiceButtons);
        
        if (mainCTAButton) {
            setupMainCTAButton(mainCTAButton);
        }
        
        console.log('✅ Booking buttons initialized');
    }
    
    function setupBookingButtons(bookServiceButtons) {
        bookServiceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card flip
                handleBookingClick(this);
            });
        });
    }
    
    function setupMainCTAButton(mainCTAButton) {
        mainCTAButton.addEventListener('click', function() {
            handleBookingClick(this);
        });
    }
    
    function handleBookingClick(button) {
        // Create ripple effect
        createRippleEffect(button);
        
        // Navigate to booking section
        setTimeout(() => {
            navigateToBooking();
        }, 300);
    }
    
    function createRippleEffect(button) {
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
    }
    
    function navigateToBooking() {
        const bookingSection = document.querySelector('#booking');
        if (bookingSection) {
            smoothScrollTo(bookingSection);
        } else {
            // Fallback to URL hash
            window.location.href = '#booking';
        }
    }
    
    function initializeImageLoading() {
        const serviceImages = document.querySelectorAll('.service-front[style*="background-image"]');
        
        if (!serviceImages.length) return;
        
        setupLazyLoading(serviceImages);
        optimizeImageLoading(serviceImages);
        
        console.log('✅ Image loading optimization initialized');
    }
    
    function setupLazyLoading(serviceImages) {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            serviceImages.forEach(image => imageObserver.observe(image));
        } else {
            // Fallback for older browsers
            serviceImages.forEach(image => loadImage(image));
        }
    }
    
    function loadImage(element) {
        const backgroundImage = element.style.backgroundImage;
        const url = backgroundImage.slice(4, -1).replace(/["']/g, "");
        
        const img = new Image();
        img.onload = () => {
            element.style.backgroundImage = `url(${url})`;
            element.classList.add('image-loaded');
        };
        img.src = url;
    }
    
    function optimizeImageLoading(serviceImages) {
        // Add loading placeholder
        serviceImages.forEach(element => {
            element.classList.add('loading-placeholder');
        });
    }
    
    function initializeAdvancedInteractions() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!serviceCards.length) return;
        
        setupParallaxEffects(serviceCards);
        setupScrollAnimations(serviceCards);
        
        console.log('✅ Advanced interactions initialized');
    }
    
    function setupParallaxEffects(serviceCards) {
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', handleParallax);
            card.addEventListener('mouseleave', resetParallax);
        });
    }
    
    function handleParallax(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        requestAnimationFrame(() => {
            card.style.transform = `translateY(-10px) perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
    
    function resetParallax() {
        const card = this;
        requestAnimationFrame(() => {
            card.style.transform = '';
        });
    }
    
    function setupScrollAnimations(serviceCards) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        serviceCards.forEach(card => observer.observe(card));
    }
    
    function initializeResponsiveFeatures() {
        setupMobileFilters();
        setupTouchOptimizations();
        setupResizeHandler();
        
        console.log('✅ Responsive features initialized');
    }
    
    function setupMobileFilters() {
        const filterNav = document.querySelector('.services-nav');
        if (!filterNav) return;
        
        // Add touch scroll support
        filterNav.style.webkitOverflowScrolling = 'touch';
        
        // Add scroll indicator for mobile
        if (window.innerWidth <= 768) {
            addScrollIndicator(filterNav);
        }
    }
    
    function addScrollIndicator(filterNav) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.textContent = '← Scroll for more →';
        filterNav.appendChild(scrollIndicator);
        
        // Hide indicator when scrolled
        filterNav.addEventListener('scroll', () => {
            if (filterNav.scrollLeft > 0) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    function setupTouchOptimizations() {
        // Check if touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
            
            // Add touch-specific styles
            addTouchStyles();
            
            // Optimize animations for touch devices
            optimizeForTouch();
        }
    }
    
    function addTouchStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .service-card {
                transition: transform 0.3s ease !important;
            }
            .touch-device .service-inner {
                transition: transform 0.5s ease !important;
            }
            .touch-device .service-card:hover {
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    function optimizeForTouch() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            // Ensure tap targets are large enough
            card.style.minWidth = '44px';
            card.style.minHeight = '44px';
        });
    }
    
    function setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                handleResize();
            }, 250);
        });
    }
    
    function handleResize() {
        // Update filter navigation for mobile
        setupMobileFilters();
        
        // Recalculate parallax effects
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.style.transform = '';
        });
    }
    
    function initializeOptimizations() {
        optimizeAnimations();
        setupPerformanceMonitoring();
        
        console.log('✅ Performance optimizations applied');
    }
    
    function optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
            
            // Add reduced motion styles
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function setupPerformanceMonitoring() {
        // Monitor long tasks
        if ('performance' in window && 'PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 50) { // Tasks longer than 50ms
                        console.warn(`Long task detected: ${entry.duration}ms`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['longtask'] });
        }
    }
    
    function initializeAOS() {
        if (typeof AOS === 'undefined') return;
        
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: false,
            mirror: true,
            offset: 100,
            anchorPlacement: 'top-bottom'
        });
        
        console.log('✅ AOS initialized');
    }
    
    // Utility function from services.js
    function smoothScrollTo(element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // ------------------------------------------------------------------------
    // FAQ ACCORDIONS
    // ------------------------------------------------------------------------
    function initializeFAQ() {
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
    
    // ------------------------------------------------------------------------
    // GALLERY
    // ------------------------------------------------------------------------
    function initializeGallery() {
        if (!galleryFilters.length || !galleryItems.length) return;
        
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                galleryFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get the category from the data attribute
                const category = this.getAttribute('data-filter');
                
                // Filter gallery items
                if (typeof gsap !== 'undefined') {
                    galleryItems.forEach(item => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            gsap.to(item, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.3,
                                onComplete: function() {
                                    item.style.display = 'block';
                                }
                            });
                        } else {
                            gsap.to(item, {
                                opacity: 0,
                                scale: 0.8,
                                duration: 0.3,
                                onComplete: function() {
                                    item.style.display = 'none';
                                }
                            });
                        }
                    });
                } else {
                    // Fallback without GSAP
                    galleryItems.forEach(item => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
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
                }
            });
        });
    }
    
    // ------------------------------------------------------------------------
    // BEFORE-AFTER SLIDER
    // ------------------------------------------------------------------------
    function initializeBeforeAfterSlider() {
        const beforeAfterContainers = document.querySelectorAll('.before-after-container');
        
        if (!beforeAfterContainers.length) return;
        
        beforeAfterContainers.forEach(container => {
            const sliderHandle = container.querySelector('.slider-handle');
            const beforeImage = container.querySelector('.before-image');
            
            if (!sliderHandle || !beforeImage) return;
            
            let isDragging = false;
            
            // Set initial position
            function setPosition(x) {
                const containerWidth = container.offsetWidth;
                let position = (x / containerWidth) * 100;
                
                // Constrain position between 0 and 100
                position = Math.max(0, Math.min(100, position));
                
                // Update slider position
                sliderHandle.style.left = `${position}%`;
                
                // Update clip path
                beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
            }
            
            // Mouse events
            container.addEventListener('mousedown', function(e) {
                isDragging = true;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setPosition(x);
            });
            
            window.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setPosition(x);
            });
            
            window.addEventListener('mouseup', function() {
                isDragging = false;
            });
            
            // Touch events
            container.addEventListener('touchstart', function(e) {
                isDragging = true;
                const rect = container.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                setPosition(x);
            });
            
            window.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                
                const rect = container.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                setPosition(x);
            });
            
            window.addEventListener('touchend', function() {
                isDragging = false;
            });
            
            // Set initial position to 50%
            setPosition(container.offsetWidth / 2);
        });
    }
    
    // ------------------------------------------------------------------------
    // FORM VALIDATION
    // ------------------------------------------------------------------------
    function initializeFormValidation() {
        if (!forms.length) return;
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate form
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                // Remove any existing message
                const existingMessage = form.querySelector('.form-message');
                if (existingMessage) existingMessage.remove();
                
                if (isValid) {
                    // Show success message
                    const formMessage = document.createElement('div');
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Your message has been sent successfully!';
                    
                    form.reset();
                    form.appendChild(formMessage);
                } else {
                    // Show error message
                    const formMessage = document.createElement('div');
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'Please fill in all required fields.';
                    
                    form.appendChild(formMessage);
                }
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    const message = form.querySelector('.form-message');
                    if (message) message.remove();
                }, 5000);
            });
        });
    }
    
    // ------------------------------------------------------------------------
    // COOKIE CONSENT
    // ------------------------------------------------------------------------
    function initializeCookieConsent() {
        if (!cookieConsent) return;
        
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('cookieConsent');
        
        if (cookieChoice === null) {
            // Show cookie consent after 2 seconds
            setTimeout(() => {
                cookieConsent.classList.add('active');
            }, 2000);
        }
        
        // Handle accept button
        if (cookieAccept) {
            cookieAccept.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieConsent.classList.remove('active');
            });
        }
        
        // Handle decline button
        if (cookieDecline) {
            cookieDecline.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'declined');
                cookieConsent.classList.remove('active');
            });
        }
    }

    // ------------------------------------------------------------------------
    // ABOUT BUBBLE SECTION
    // ------------------------------------------------------------------------
    function initBubbleAboutSection() {
        // Select elements
        const aboutSection = document.querySelector('.about-bubble');
        if (!aboutSection) return;

        const showcase = document.querySelector('.about-showcase');
        const showcaseMain = document.querySelector('.showcase-main');
        const showcaseAccent = document.querySelector('.showcase-accent');
        const experienceBadge = document.querySelector('.experience-badge');
        const featureCards = document.querySelectorAll('.feature-card');
        const testimonial = document.querySelector('.owner-testimonial');
        const bubbles = document.querySelectorAll('.bubble');

        // Advanced mouse movement effects for image showcase
        if (showcase && window.innerWidth > 992) {
            showcase.addEventListener('mousemove', function(e) {
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
        
        // IMPROVED FEATURE CARDS ANIMATION
        if (featureCards.length && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // First ensure all cards are initially at their final state for a clean animation setup
            gsap.set(featureCards, { opacity: 0, y: 50 });
            
            // Create a ScrollTrigger that properly handles bidirectional scrolling
            ScrollTrigger.create({
                trigger: '.feature-cards',
                start: 'top 80%',
                end: 'bottom 20%',
                markers: false, // Set to true for debugging
                toggleActions: 'play reverse restart reverse', // This handles forward and backward scrolling
                onEnter: () => {
                    gsap.to(featureCards, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.15,
                        duration: 0.6,
                        ease: "back.out(1.7)"
                    });
                },
                onLeave: () => {
                    gsap.to(featureCards, {
                        opacity: 0,
                        y: 50,
                        stagger: 0.1,
                        duration: 0.4
                    });
                },
                onEnterBack: () => {
                    gsap.to(featureCards, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.15,
                        duration: 0.6,
                        ease: "back.out(1.7)"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(featureCards, {
                        opacity: 0,
                        y: 50,
                        stagger: 0.1,
                        duration: 0.4
                    });
                }
            });
        }
        
        // Animate testimonial on scroll - Updated with proper bidirectional animation
        if (testimonial && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.set(testimonial, { opacity: 0, y: 40 });
            
            ScrollTrigger.create({
                trigger: testimonial,
                start: 'top 75%',
                end: 'bottom 25%',
                toggleActions: 'play reverse restart reverse',
                onEnter: () => {
                    gsap.to(testimonial, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                },
                onLeave: () => {
                    gsap.to(testimonial, {
                        opacity: 0,
                        y: 40,
                        duration: 0.4
                    });
                },
                onEnterBack: () => {
                    gsap.to(testimonial, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(testimonial, {
                        opacity: 0,
                        y: 40,
                        duration: 0.4
                    });
                }
            });
        }
        
        // Advanced bubble animations
        if (bubbles.length && typeof gsap !== 'undefined') {
            bubbles.forEach(bubble => {
                // Random initial position within bounds
                const xPos = gsap.utils.random(-30, 30);
                const yPos = gsap.utils.random(-30, 30);
                const rotation = gsap.utils.random(-15, 15);
                const duration = gsap.utils.random(20, 40);
                const delay = gsap.utils.random(0, 10);
                
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
        
        // Feature card hover animations
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.card-icon');
                const siblings = Array.from(featureCards).filter(item => item !== this);
                
                // Bounce animation for icon
                if (icon && typeof gsap !== 'undefined') {
                    gsap.to(icon, {
                        scale: 1.2,
                        rotation: 15,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    });
                }
                
                // Subtle push-back effect on sibling cards
                if (siblings.length && typeof gsap !== 'undefined') {
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
                if (icon && typeof gsap !== 'undefined') {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3
                    });
                }
                
                // Reset sibling cards
                if (siblings.length && typeof gsap !== 'undefined') {
                    gsap.to(siblings, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3
                    });
                }
            });
        });
    }
    
    // ------------------------------------------------------------------------
    // UTILITY FUNCTIONS
    // ------------------------------------------------------------------------
    
    /**
     * Detect if device is touch-enabled
     * @returns {boolean} - True if touch device, false otherwise
     */
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }
    
    /**
     * Add touch device support for interactive elements
     */
    function setupTouchDeviceSupport() {
        if (isTouchDevice()) {
            // Add special handling for service cards on touch devices
            serviceCards.forEach(card => {
                // Ensure flip works on touch (except when touching buttons)
                const cardFront = card.querySelector('.service-front');
                if (cardFront) {
                    cardFront.addEventListener('touchend', function(e) {
                        if (!e.target.closest('.service-details-btn')) {
                            e.preventDefault();
                            
                            // Reset other cards
                            serviceCards.forEach(c => {
                                if (c !== card && c.classList.contains('flipped')) {
                                    c.classList.remove('flipped');
                                }
                            });
                            
                            // Flip this card
                            if (!card.classList.contains('flipped')) {
                                card.classList.add('flipped');
                            }
                        }
                    });
                }
            });
        }
    }
    
    // ------------------------------------------------------------------------
    // INITIALIZE ALL COMPONENTS
    // ------------------------------------------------------------------------
    function initAll() {
        // Core functionality
        initializePreloader();
        initializeHeroVideo();
        initializeAnimations();
        initializeScrollEffects();
        initializeNavigation();
        
        // Interactive sections
        initializeServices(); // Initialize services section instead of carousel
        initializeFAQ();
        initializeGallery();
        initializeBeforeAfterSlider();
        initializeFormValidation();
        initializeCookieConsent();
        initBubbleAboutSection();
        
        // Touch device support
        setupTouchDeviceSupport();
    }
    
    // Start initialization
    initAll();
});

// -----------------------------------------------------------------------------
// ERROR HANDLING
// -----------------------------------------------------------------------------
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Services Section Error:', {
    message: message,
    source: source,
    line: lineno,
    column: colno,
    error: error
  });
};
