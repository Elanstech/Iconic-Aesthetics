/**
 * Iconic Aesthetics - Main JavaScript File
 * 
 * Enhanced with improved scroll animations and performance optimizations
 * Uses GSAP as the primary animation system for consistency
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
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ------------------------------------------------------------------------
    // PRELOADER WITH ENHANCED ANIMATION
    // ------------------------------------------------------------------------
    function initializePreloader() {
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            if (typeof gsap !== 'undefined') {
                // GSAP animation for smoother preloader exit
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: function() {
                        preloader.style.display = 'none';
                        
                        // Animate hero section once preloader is gone
                        animateHeroSection();
                    }
                });
            } else {
                // Fallback to basic animation
                setTimeout(function() {
                    preloader.style.opacity = '0';
                    setTimeout(function() {
                        preloader.style.display = 'none';
                        animateHeroSection();
                    }, 600);
                }, 1000);
            }
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
        
        // Replace AOS with GSAP for hero parallax effect
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && typeof gsap !== 'undefined') {
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
        } else if (heroContent) {
            // Fallback to basic scroll effect
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
                    // Use GSAP for smoother scrolling if available
                    if (typeof gsap !== 'undefined') {
                        gsap.to(window, {
                            duration: 1.2, 
                            scrollTo: {
                                y: nextSection,
                                offsetY: header.offsetHeight
                            },
                            ease: "power3.inOut"
                        });
                    } else {
                        // Fallback to native smooth scroll
                        nextSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }
    }
    
    // ------------------------------------------------------------------------
    // ANIMATION ENHANCEMENT - HERO SECTION
    // ------------------------------------------------------------------------
    function animateHeroSection() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        if (typeof gsap !== 'undefined') {
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
    
    // ------------------------------------------------------------------------
    // UNIFIED SCROLL ANIMATION SYSTEM
    // ------------------------------------------------------------------------
    function initializeScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not found - falling back to basic animations');
            return;
        }
        
        // Register ScrollTrigger plugin if necessary
        if (gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
            
            // Also register ScrollToPlugin if available
            if (typeof ScrollToPlugin !== 'undefined') {
                gsap.registerPlugin(ScrollToPlugin);
            }
        }
        
        // ---- About Section Animations ----
        // About info text animation - more reliable
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
                once: prefersReducedMotion,
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
                once: prefersReducedMotion,
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

        // ---- Services Section Animations ----
        // Services header animation
        const servicesHeader = document.querySelector('.services-header');
        if (servicesHeader) {
            gsap.set(servicesHeader, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.ultra-services',
                start: "top 80%",
                once: prefersReducedMotion,
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
                once: prefersReducedMotion,
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
                once: prefersReducedMotion,
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
        
        // ---- Gallery Section Animations ----
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
                once: prefersReducedMotion,
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
                    once: prefersReducedMotion,
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
        
        // ---- Testimonials Section Animations ----
        const reviewsElements = [
            document.querySelector('.reviews .section-header'),
            document.querySelector('.reviews-container'),
        ].filter(el => el !== null);
        
        if (reviewsElements.length) {
            gsap.set(reviewsElements, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.reviews',
                start: "top 75%",
                once: prefersReducedMotion,
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
        
        // ---- FAQ Section Animations ----
        const faqElements = [
            document.querySelector('.faq .section-header'),
            document.querySelector('.faq-content')
        ].filter(el => el !== null);
        
        if (faqElements.length) {
            gsap.set(faqElements, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.faq',
                start: "top 75%",
                once: prefersReducedMotion,
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
                    once: prefersReducedMotion,
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
        
        // ---- Booking Section Animations ----
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
                once: prefersReducedMotion,
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
                    once: prefersReducedMotion,
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
        
        // ---- Instagram Feed Section Animations ----
        const instagramElements = [
            document.querySelector('.instagram .section-header'),
            document.querySelector('.instagram-content')
        ].filter(el => el !== null);
        
        if (instagramElements.length) {
            gsap.set(instagramElements, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.instagram',
                start: "top 75%",
                once: prefersReducedMotion,
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
        
        // ---- Contact/Map Section Animations ----
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            gsap.set(mapContainer, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.contact',
                start: "top 80%",
                once: prefersReducedMotion,
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
        
        // ---- Newsletter Section Animations ----
        const newsletterContent = document.querySelector('.newsletter-content');
        if (newsletterContent) {
            gsap.set(newsletterContent, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.newsletter',
                start: "top 80%",
                once: prefersReducedMotion,
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
        
        // ---- Footer Animations ----
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            gsap.set(footerContent, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: '.footer',
                start: "top 90%",
                once: prefersReducedMotion,
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

        // Refresh all ScrollTriggers after animations are set up
        ScrollTrigger.refresh();
    }
    
    // ------------------------------------------------------------------------
    // SCROLL EFFECTS
    // ------------------------------------------------------------------------
    function initializeScrollEffects() {
        if (!header) return;
        
        // Header scroll effect - optimized to use transform for better performance
        window.addEventListener('scroll', function() {
            requestAnimationFrame(function() {
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
        });
        
        // Back to top button with smooth scrolling
        if (backToTop) {
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Use GSAP for smoother scrolling if available
                if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
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
            });
        }
        
        // Smooth scroll for anchor links - improved with GSAP if available
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    
                    // Use GSAP for smoother scrolling if available
                    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
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
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        mobileNav.classList.remove('active');
                        body.style.overflow = '';
                    }
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
        
        // Enhanced active nav state using Intersection Observer
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length && navLinks.length) {
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
    // SERVICES FUNCTIONALITY - WITH HOVER FLIP EFFECT
    // ------------------------------------------------------------------------
    function initializeServices() {
        // Initialize all services components
        const filterButtons = document.querySelectorAll('.service-filter');
        const serviceCards = document.querySelectorAll('.service-card');
        
        // Make sure elements exist
        if (!filterButtons.length || !serviceCards.length) {
            console.error('Filter buttons or service cards not found');
            return;
        }
        
        // Initialize filter system
        setupFilterButtons(filterButtons, serviceCards);
        
        // Set initial state - show only main services
        filterServiceCards('all', serviceCards);
        
        // Initialize booking buttons
        initializeBookingButtons();
        
        console.log('✅ Services section initialized successfully');
    }

    function setupFilterButtons(filterButtons, serviceCards) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                filterServiceCards(filter, serviceCards);
                
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
    }

    function filterServiceCards(filter, serviceCards) {
        // Use GSAP for smoother animations if available
        if (typeof gsap !== 'undefined') {
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
    }

    function initializeBookingButtons() {
        const bookServiceButtons = document.querySelectorAll('.book-service');
        const mainCTAButton = document.querySelector('.main-cta-btn');
        
        // Setup booking buttons
        bookServiceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card hover effect
                handleBookingClick(this);
            });
        });
        
        // Setup main CTA button
        if (mainCTAButton) {
            mainCTAButton.addEventListener('click', function() {
                handleBookingClick(this);
            });
        }
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
            const headerOffset = 100;
            
            // Use GSAP if available
            if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
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
                    // Use GSAP for smoother animations
                    galleryItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        
                        if (category === 'all' || itemCategory === category) {
                            gsap.to(item, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.4,
                                ease: "power2.out",
                                onStart: () => {
                                    item.style.display = 'block';
                                }
                            });
                        } else {
                            gsap.to(item, {
                                opacity: 0,
                                scale: 0.8,
                                duration: 0.3,
                                ease: "power2.in",
                                onComplete: () => {
                                    item.style.display = 'none';
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
    // BEFORE-AFTER SLIDER - WITH OPTIMIZED TOUCH HANDLING
    // ------------------------------------------------------------------------
    function initializeBeforeAfterSlider() {
        const beforeAfterContainers = document.querySelectorAll('.before-after-container');
        
        if (!beforeAfterContainers.length) return;
        
        beforeAfterContainers.forEach(container => {
            const sliderHandle = container.querySelector('.slider-handle');
            const beforeImage = container.querySelector('.before-image');
            
            if (!sliderHandle || !beforeImage) return;
            
            let isDragging = false;
            let startX, containerWidth;
            
            // Set initial position - centered
            function setPosition(x) {
                if (!containerWidth) {
                    containerWidth = container.offsetWidth;
                }
                
                let position = (x / containerWidth) * 100;
                
                // Constrain position between 0 and 100
                position = Math.max(0, Math.min(100, position));
                
                // Use transform for better performance
                sliderHandle.style.transform = `translateX(${position}%)`;
                sliderHandle.style.left = '0';  // Reset left since we're using transform
                
                // Update clip path
                beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
            }
            
            // More efficient event handling with throttling
            function handleMove(clientX) {
                if (!isDragging) return;
                
                // Use requestAnimationFrame for smoother animation
                requestAnimationFrame(() => {
                    if (!containerWidth) {
                        containerWidth = container.offsetWidth;
                    }
                    
                    const rect = container.getBoundingClientRect();
                    const x = clientX - rect.left;
                    setPosition(x);
                });
            }
            
            // Mouse events
            container.addEventListener('mousedown', function(e) {
                isDragging = true;
                containerWidth = container.offsetWidth;
                setPosition(e.clientX - container.getBoundingClientRect().left);
                e.preventDefault(); // Prevent text selection during drag
            });
            
            // Use passive listeners for better performance
            window.addEventListener('mousemove', function(e) {
                handleMove(e.clientX);
            }, { passive: true });
            
            window.addEventListener('mouseup', function() {
                isDragging = false;
            });
            
            // Improved touch events
            container.addEventListener('touchstart', function(e) {
                isDragging = true;
                containerWidth = container.offsetWidth;
                setPosition(e.touches[0].clientX - container.getBoundingClientRect().left);
            }, { passive: true });
            
            window.addEventListener('touchmove', function(e) {
                handleMove(e.touches[0].clientX);
            }, { passive: true });
            
            window.addEventListener('touchend', function() {
                isDragging = false;
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                containerWidth = container.offsetWidth;
                
                // Re-center the slider
                setPosition(containerWidth / 2);
            });
            
            // Set initial position to 50%
            setPosition(container.offsetWidth / 2);
            
            // Add animated hint to show interactivity
            setTimeout(() => {
                // Animated hint showing the slider can be moved
                if (typeof gsap !== 'undefined') {
                    const timeline = gsap.timeline({repeat: 0});
                    timeline.to(sliderHandle, {
                        left: '60%', 
                        duration: 1.5, 
                        ease: "power2.inOut"
                    });
                    timeline.to(sliderHandle, {
                        left: '40%', 
                        duration: 1.5, 
                        ease: "power2.inOut"
                    });
                    timeline.to(sliderHandle, {
                        left: '50%', 
                        duration: 1, 
                        ease: "power2.inOut"
                    });
                }
            }, 1000);
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
                        
                        // Add shake animation for invalid fields
                        if (typeof gsap !== 'undefined') {
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
                const existingMessage = form.querySelector('.form-message');
                if (existingMessage) existingMessage.remove();
                
                if (isValid) {
                    // Show success message
                    const formMessage = document.createElement('div');
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Your message has been sent successfully!';
                    
                    form.reset();
                    form.appendChild(formMessage);
                    
                    // Animate success message
                    if (typeof gsap !== 'undefined') {
                        gsap.from(formMessage, {
                            y: -20,
                            opacity: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                } else {
                    // Show error message
                    const formMessage = document.createElement('div');
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'Please fill in all required fields.';
                    
                    form.appendChild(formMessage);
                    
                    // Animate error message
                    if (typeof gsap !== 'undefined') {
                        gsap.from(formMessage, {
                            y: -20,
                            opacity: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                }
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    const message = form.querySelector('.form-message');
                    if (message) {
                        if (typeof gsap !== 'undefined') {
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
                
                // Animate entry if GSAP is available
                if (typeof gsap !== 'undefined') {
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
            cookieAccept.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                
                if (typeof gsap !== 'undefined') {
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
            });
        }
        
        // Handle decline button
        if (cookieDecline) {
            cookieDecline.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'declined');
                
                if (typeof gsap !== 'undefined') {
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
            });
        }
    }

    // ------------------------------------------------------------------------
    // ENHANCED FLOATING ELEMENTS - ABOUT BUBBLE SECTION
    // ------------------------------------------------------------------------
    function initializeFloatingElements() {
        // Bubbles animation
        const bubbles = document.querySelectorAll('.bubble');
        
        if (bubbles.length && typeof gsap !== 'undefined') {
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
        
        // Orbs animation in services section
        const orbs = document.querySelectorAll('.orb');
        
        if (orbs.length && typeof gsap !== 'undefined') {
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
        
        // About section showcase hover effects
        const showcase = document.querySelector('.about-showcase');
        
        if (showcase && window.innerWidth > 992) {
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
        
        // Feature card hover effects
        const featureCards = document.querySelectorAll('.feature-card');
        
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
            
            // Make before/after sliders work better on touch devices
            document.querySelectorAll('.before-after-container').forEach(container => {
                container.classList.add('touch-device');
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
        initializeScrollEffects();
        initializeNavigation();
        
        // Move to unified GSAP animation system and remove AOS
        if (typeof AOS !== 'undefined') {
            // If AOS is loaded, initialize with minimal settings to avoid conflicts
            AOS.init({
                disable: true // Disable AOS to prevent conflicts with GSAP
            });
        }
        
        // Use GSAP for all animations
        initializeScrollAnimations();
        
        // Interactive sections
        initializeServices();
        initializeFAQ();
        initializeGallery();
        initializeBeforeAfterSlider();
        initializeFormValidation();
        initializeCookieConsent();
        initializeFloatingElements();
        
        // Touch device support
        setupTouchDeviceSupport();
    }
    
    // Start initialization
    initAll();
});

// -----------------------------------------------------------------------------
// ERROR HANDLING & PERFORMANCE MONITORING
// -----------------------------------------------------------------------------
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Error:', {
        message: message,
        source: source,
        line: lineno,
        column: colno,
        error: error
    });
    
    // Continue execution even if there's an error
    return true;
};

// Performance monitoring
if ('performance' in window && 'mark' in window.performance) {
    performance.mark('js-execution-end');
    
    window.addEventListener('load', function() {
        performance.mark('page-fully-loaded');
        
        performance.measure('js-execution', 'navigationStart', 'js-execution-end');
        performance.measure('page-load', 'navigationStart', 'page-fully-loaded');
        
        console.log('JS Execution Time:', performance.getEntriesByName('js-execution')[0].duration.toFixed(2) + 'ms');
        console.log('Page Load Time:', performance.getEntriesByName('page-load')[0].duration.toFixed(2) + 'ms');
    });
}
