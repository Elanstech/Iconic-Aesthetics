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
    const serviceTabs = document.querySelectorAll('.service-tab');
    const servicePanels = document.querySelectorAll('.service-panel');
    const faqItems = document.querySelectorAll('.faq-item');
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');
    const forms = document.querySelectorAll('form');
    
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
                once: true,
                mirror: false,
                offset: 50
            });
        }
        
        // Initialize Swiper for testimonials
        if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-slider')) {
            const swiper = new Swiper('.testimonials-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    }
                }
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
                // Service tabs
                gsap.from('.service-tab', {
                    scrollTrigger: {
                        trigger: '.services-tabs',
                        start: 'top 80%'
                    },
                    opacity: 0,
                    y: 20,
                    stagger: 0.2,
                    duration: 0.6
                });
                
                // About features
                gsap.from('.feature', {
                    scrollTrigger: {
                        trigger: '.about-features',
                        start: 'top 80%'
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
                        start: 'top 80%'
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
                        start: 'top 80%'
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
                        start: 'top 80%'
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
    // SERVICES AND TABS
    // ------------------------------------------------------------------------
    function initializeServiceTabs() {
        if (!serviceTabs.length || !servicePanels.length) return;
        
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                serviceTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get the service ID from the data attribute
                const serviceId = this.getAttribute('data-service');
                
                // Hide all service panels
                servicePanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                
                // Show the selected service panel
                const targetPanel = document.getElementById(serviceId);
                if (targetPanel) targetPanel.classList.add('active');
            });
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
        if (!galleryFilters.length || !galleryItems.length || typeof gsap === 'undefined') return;
        
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                galleryFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get the category from the data attribute
                const category = this.getAttribute('data-filter');
                
                // Filter gallery items
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
    // LEGACY ABOUT SECTION
    // ------------------------------------------------------------------------
    function initModernAboutSection() {
        // Select elements for animations
        const featureCards = document.querySelectorAll('.feature-card');
        const aboutImages = document.querySelectorAll('.about-image-main, .about-image-accent');
        const experienceTag = document.querySelector('.experience-tag');
        const quoteSection = document.querySelector('.owner-quote');
        
        // Parallax scrolling effect for main image if GSAP is available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // Subtle parallax for main image
            gsap.to('.about-image-main img', {
                scrollTrigger: {
                    trigger: '.about-modern',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: 50,
                ease: 'none'
            });
            
            // Animate the experience tag with a slight rotation on scroll
            gsap.from(experienceTag, {
                scrollTrigger: {
                    trigger: '.about-image-wrapper',
                    start: 'top 80%'
                },
                opacity: 0,
                scale: 0.5,
                rotation: -15,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });
            
            // Animate feature cards
            gsap.from(featureCards, {
                scrollTrigger: {
                    trigger: '.about-features',
                    start: 'top 80%'
                },
                y: 30,
                opacity: 0,
                stagger: 0.15,
                duration: 0.6
            });
            
            // Animate quote section
            gsap.from(quoteSection, {
                scrollTrigger: {
                    trigger: quoteSection,
                    start: 'top 80%'
                },
                x: -50,
                opacity: 0,
                duration: 0.8
            });
        }
        
        // Add hover interactions for feature cards with vanilla JS
        if (featureCards) {
            featureCards.forEach(card => {
                // Add mouse hover effects
                card.addEventListener('mouseenter', function() {
                    // Add subtle scale effect to icon
                    const icon = this.querySelector('.feature-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1.1) rotate(5deg)';
                    }
                });
                
                card.addEventListener('mouseleave', function() {
                    // Reset icon
                    const icon = this.querySelector('.feature-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1) rotate(0deg)';
                    }
                });
            });
        }
        
        // Add scroll-based animations for elements without GSAP
        if (!window.gsap) {
            // Simple intersection observer for fade-in effects
            const fadeInElements = [
                ...featureCards, 
                experienceTag, 
                quoteSection,
                ...aboutImages
            ].filter(el => el); // Filter out null elements
            
            if (fadeInElements.length && 'IntersectionObserver' in window) {
                const fadeInObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in');
                            fadeInObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                fadeInElements.forEach(el => {
                    el.classList.add('will-animate');
                    fadeInObserver.observe(el);
                });
            }
        }
        
        // Add these classes to your CSS for the fallback animations
        const styleSheet = document.styleSheets[0];
        const fadeInRules = `
            .will-animate {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            .fade-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        
        try {
            styleSheet.insertRule(fadeInRules, styleSheet.cssRules.length);
        } catch (e) {
            // If can't modify stylesheet, create a new style tag
            const styleTag = document.createElement('style');
            styleTag.textContent = fadeInRules;
            document.head.appendChild(styleTag);
        }
    }

    // ------------------------------------------------------------------------
    // NEW BUBBLE ABOUT SECTION 
    // ------------------------------------------------------------------------
    function initBubbleAboutSection() {
        // Get elements
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
        
        // Add animated entrance for feature cards
        if (featureCards.length && typeof gsap !== 'undefined') {
            gsap.from(featureCards, {
                scrollTrigger: {
                    trigger: '.feature-cards',
                    start: 'top 80%'
                },
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        }
        
        // Animate testimonial on scroll
        if (testimonial && typeof gsap !== 'undefined') {
            gsap.from(testimonial, {
                scrollTrigger: {
                    trigger: testimonial,
                    start: 'top 75%'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
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
        
        // Optional: Add parallax effect to background bubbles on scroll
        window.addEventListener('scroll', function() {
            if (bubbles.length && aboutSection) {
                // Get scroll position relative to the about section
                const rect = aboutSection.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInView) {
                    const scrollPos = window.scrollY;
                    const sectionTop = scrollPos + rect.top;
                    const relativeScroll = scrollPos - sectionTop;
                    
                    bubbles.forEach((bubble, index) => {
                        // Different parallax speeds for each bubble
                        const speed = 0.05 + (index * 0.02);
                        const yOffset = relativeScroll * speed;
                        
                        // Apply transform - extract existing transform and add parallax
                        const currentTransform = bubble.style.transform;
                        
                        // If bubble has GSAP transform, we don't want to overwrite it completely
                        if (currentTransform && !currentTransform.includes('translateY')) {
                            bubble.style.transform = `${currentTransform} translateY(${yOffset}px)`;
                        } else {
                            // Just update the Y transform
                            const regex = /translateY\([^)]+\)/;
                            const newTransform = currentTransform.replace(regex, `translateY(${yOffset}px)`);
                            
                            if (newTransform === currentTransform) {
                                bubble.style.transform = `${currentTransform} translateY(${yOffset}px)`;
                            } else {
                                bubble.style.transform = newTransform;
                            }
                        }
                    });
                }
            }
        });
        
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
        
        // Fallback animations using Intersection Observer if GSAP is not available
        if (typeof gsap === 'undefined' && 'IntersectionObserver' in window) {
            const fadeItems = [
                ...featureCards,
                testimonial,
                showcaseMain,
                showcaseAccent,
                experienceBadge
            ].filter(item => item); // Filter out null/undefined
            
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px'
            });
            
            fadeItems.forEach(item => {
                item.classList.add('will-animate');
                fadeObserver.observe(item);
            });
            
            // Add necessary CSS classes for fallback animations
            const styleSheet = document.styleSheets[0];
            const fallbackRules = `
                .will-animate {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;
            
            try {
                styleSheet.insertRule(fallbackRules, styleSheet.cssRules.length);
            } catch (e) {
                // If can't modify stylesheet, create a new style tag
                const styleTag = document.createElement('style');
                styleTag.textContent = fallbackRules;
                document.head.appendChild(styleTag);
            }
        }
    }
    
    // ------------------------------------------------------------------------
    // INITIALIZE ALL COMPONENTS
    // ------------------------------------------------------------------------
    function initAll() {
        initializePreloader();
        initializeHeroVideo();
        initializeAnimations();
        initializeScrollEffects();
        initializeNavigation();
        initializeServiceTabs();
        initializeFAQ();
        initializeGallery();
        initializeBeforeAfterSlider();
        initializeFormValidation();
        initializeCookieConsent();
        initModernAboutSection();
        initBubbleAboutSection(); // Initialize new bubble about section
    }
    
    // Start initialization
    initAll();
});
