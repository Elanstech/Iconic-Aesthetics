/**
 * Iconic Aesthetics - Main JavaScript File
 * 
 * Enhanced with improved scroll animations and performance optimizations
 */

document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------------------------------------------
    // INITIALIZATION AND GLOBAL VARIABLES
    // ------------------------------------------------------------------------
    const body = document.body;
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
    
    // Services Elements
    const filterButtons = document.querySelectorAll('.service-filter');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Before/After Elements
    const beforeAfterContainers = document.querySelectorAll('.ba-container');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        }
        
        // Check if video is already loaded
        if (heroVideo.readyState >= 2) {
            checkVideoPlayback();
        } else {
            // Wait for video to be loaded
            heroVideo.addEventListener('loadeddata', checkVideoPlayback);
        }
        
        // Basic parallax effect for hero content
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
                    // Use native smooth scroll
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
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
                
                // Use native smooth scroll
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
                    
                    // Manual calculation for smoother scroll
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
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
        // Make sure elements exist
        if (!filterButtons.length || !serviceCards.length) {
            return;
        }
        
        // Initialize filter system
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                filterServiceCards(filter);
                
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
        
        // Set initial state - show only main services
        filterServiceCards('all');
        
        // Initialize booking buttons
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

    function filterServiceCards(filter) {
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
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = bookingSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
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
    }
    
    // ------------------------------------------------------------------------
    // BEFORE-AFTER SLIDER - WITH OPTIMIZED TOUCH HANDLING
    // ------------------------------------------------------------------------
    function initializeBeforeAfterSlider() {
        if (!beforeAfterContainers.length) return;
        
        beforeAfterContainers.forEach((container, index) => {
            const sliderHandle = container.querySelector('.ba-slider');
            const beforeImage = container.querySelector('.before-image');
            const divider = container.querySelector('.ba-divider');
            
            if (!sliderHandle || !beforeImage || !divider) return;
            
            let isDragging = false;
            let containerWidth = container.offsetWidth;
            
            // Set initial position - centered
            setPosition(container, 50);
            
            // More efficient event handling with throttling
            function handleMove(container, clientX) {
                if (!isDragging) return;
                
                // Use requestAnimationFrame for smoother animation
                requestAnimationFrame(() => {
                    if (!containerWidth) {
                        containerWidth = container.offsetWidth;
                    }
                    
                    const rect = container.getBoundingClientRect();
                    const x = clientX - rect.left;
                    setPosition(container, (x / containerWidth) * 100);
                });
            }
            
            // Mouse events
            sliderHandle.addEventListener('mousedown', function(e) {
                isDragging = true;
                containerWidth = container.offsetWidth;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setPosition(container, (x / containerWidth) * 100);
                e.preventDefault(); // Prevent text selection during drag
                container.classList.add('dragging');
            });
            
            // Use passive listeners for better performance
            window.addEventListener('mousemove', function(e) {
                handleMove(container, e.clientX);
            }, { passive: true });
            
            window.addEventListener('mouseup', function() {
                isDragging = false;
                container.classList.remove('dragging');
            });
            
            // Improved touch events
            sliderHandle.addEventListener('touchstart', function(e) {
                isDragging = true;
                containerWidth = container.offsetWidth;
                const rect = container.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                setPosition(container, (x / containerWidth) * 100);
                container.classList.add('dragging');
            }, { passive: true });
            
            window.addEventListener('touchmove', function(e) {
                handleMove(container, e.touches[0].clientX);
            }, { passive: true });
            
            window.addEventListener('touchend', function() {
                isDragging = false;
                container.classList.remove('dragging');
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                containerWidth = container.offsetWidth;
            });
            
            // Add initial hint animation after a delay
            setTimeout(() => {
                animateHint(container);
            }, 1000 + index * 200); // Stagger animations
        });
    }
    
    // Set position for before/after slider
    function setPosition(container, percent) {
        // Constrain position between 0 and 100
        percent = Math.max(0, Math.min(100, percent));
        
        const beforeImage = container.querySelector('.before-image');
        const slider = container.querySelector('.ba-slider');
        const divider = container.querySelector('.ba-divider');
        
        if (!beforeImage || !slider || !divider) return;
        
        // Update position using transforms for better performance
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
    }
    
    // Animate hint to show slider functionality
    function animateHint(container) {
        // Animated hint showing the slider can be moved
        const steps = [
            { position: 50, duration: 0 },    // Start
            { position: 65, duration: 600 },  // Move right
            { position: 35, duration: 600 },  // Move left
            { position: 50, duration: 400 }   // Back to center
        ];
        
        let currentStep = 0;
        
        function animateStep() {
            if (currentStep >= steps.length) return;
            
            const step = steps[currentStep];
            const startTime = performance.now();
            const startPosition = currentStep > 0 ? steps[currentStep - 1].position : 50;
            const endPosition = step.position;
            const duration = step.duration;
            
            function updateFrame(time) {
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easedProgress = progress < 0.5 ? 
                    4 * progress * progress * progress : 
                    1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                // Calculate current position
                const currentPosition = startPosition + (endPosition - startPosition) * easedProgress;
                
                // Update slider position
                setPosition(container, currentPosition);
                
                // Continue animation
                if (progress < 1) {
                    requestAnimationFrame(updateFrame);
                } else {
                    currentStep++;
                    if (currentStep < steps.length) {
                        // Proceed to next step
                        animateStep();
                    }
                }
            }
            
            // Start animation if duration > 0
            if (duration > 0) {
                requestAnimationFrame(updateFrame);
            } else {
                // Immediate update for duration 0
                setPosition(container, endPosition);
                currentStep++;
                animateStep();
            }
        }
        
        // Start the animation sequence
        animateStep();
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
                    if (message) {
                        message.remove();
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
    // ENHANCED FLOATING ELEMENTS - ABOUT BUBBLE SECTION
    // ------------------------------------------------------------------------
    function initializeFloatingElements() {
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
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(15deg)';
                }
                
                // Subtle push-back effect on sibling cards
                siblings.forEach(sibling => {
                    sibling.style.transform = 'scale(0.98)';
                    sibling.style.opacity = '0.8';
                });
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.card-icon');
                const siblings = Array.from(featureCards).filter(item => item !== this);
                
                // Reset icon animation
                if (icon) {
                    icon.style.transform = '';
                }
                
                // Reset sibling cards
                siblings.forEach(sibling => {
                    sibling.style.transform = '';
                    sibling.style.opacity = '';
                });
            });
        });
    }
    
    // ------------------------------------------------------------------------
    // UTILITY FUNCTIONS
    // ------------------------------------------------------------------------
    
    /**
     * Add touch device support for interactive elements
     */
    function setupTouchDeviceSupport() {
        const isTouchDevice = ('ontouchstart' in window) || 
                             (navigator.maxTouchPoints > 0) || 
                             (navigator.msMaxTouchPoints > 0);
        
        if (isTouchDevice) {
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
            document.querySelectorAll('.ba-container').forEach(container => {
                container.classList.add('touch-device');
            });
        }
    }
    
    // ------------------------------------------------------------------------
    // INITIALIZE ALL COMPONENTS
    // ------------------------------------------------------------------------
    function initAll() {
        // Core functionality
        initializeHeroVideo();
        initializeScrollEffects();
        initializeNavigation();
        
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
        
        // Initialize AOS animations (if they exist)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
        
        console.log('✅ Iconic Aesthetics application initialized');
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
