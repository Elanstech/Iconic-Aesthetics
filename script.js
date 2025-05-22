/**
 * Iconic Aesthetics - Main JavaScript File
 * 
 * Simplified version with Intersection Observer for reliable scroll animations
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
    
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    function initializeScrollAnimations() {
        // Add initial hidden state to elements
        const animatedElements = document.querySelectorAll(
            '.section-header, ' +
            '.about-showcase, ' +
            '.about-info > *, ' +
            '.feature-card, ' +
            '.owner-testimonial, ' +
            '.service-card, ' +
            '.gallery-item, ' +
            '.faq-item, ' +
            '.booking-info, ' +
            '.booking-form, ' +
            '.booking-step, ' +
            '.reviews-container, ' +
            '.instagram-content, ' +
            '.map-container, ' +
            '.newsletter-content, ' +
            '.footer-content'
        );
        
        // Set initial state
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add delay for stagger effect
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay * 100);
                    
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all elements
        animatedElements.forEach((el, index) => {
            // Add stagger delay based on element position
            if (el.closest('.feature-cards')) {
                el.dataset.delay = index % 4;
            } else if (el.closest('.services-grid')) {
                el.dataset.delay = index % 3;
            } else if (el.closest('.gallery-grid')) {
                el.dataset.delay = index % 3;
            } else if (el.closest('.faq-content')) {
                el.dataset.delay = index % 6;
            } else {
                el.dataset.delay = 0;
            }
            
            observer.observe(el);
        });
        
        // Special handling for service cards visibility
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            if (card.dataset.main === 'true') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // ============================================
    // PRELOADER
    // ============================================
    function initializePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        // Initialize animations after preloader
                        initializeHeroAnimations();
                        initializeScrollAnimations();
                    }, 600);
                }, 1000);
            });
        } else {
            // No preloader, initialize immediately
            initializeHeroAnimations();
            initializeScrollAnimations();
        }
    }
    
    // ============================================
    // HERO SECTION
    // ============================================
    function initializeHeroAnimations() {
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
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 200 + (index * 150));
            }
        });
    }
    
    function initializeHeroVideo() {
        const heroVideo = document.querySelector('.hero-background-video');
        if (heroVideo) {
            heroVideo.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }
        
        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    // ============================================
    // HEADER & NAVIGATION
    // ============================================
    function initializeHeader() {
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
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
        // Mobile menu
        if (menuToggle && mobileNav) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileNav.classList.toggle('active');
                body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        }
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Active nav state
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
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                
                // Filter cards with simple fade
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
                        // Force reflow
                        void card.offsetWidth;
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Book service buttons
        document.querySelectorAll('.book-service, .main-cta-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const bookingSection = document.querySelector('#booking');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // ============================================
    // FAQ SECTION
    // ============================================
    function initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const icon = faq.querySelector('.faq-icon i');
                    if (icon) icon.className = 'fas fa-plus';
                });
                
                // Open clicked if wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('.faq-icon i');
                    if (icon) icon.className = 'fas fa-minus';
                }
            });
        });
    }
    
    // ============================================
    // GALLERY SECTION
    // ============================================
    function initializeGallery() {
        const galleryFilters = document.querySelectorAll('.gallery-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (!galleryFilters.length || !galleryItems.length) return;
        
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
        
        // Before/After sliders
        initializeBeforeAfterSliders();
    }
    
    function initializeBeforeAfterSliders() {
        const containers = document.querySelectorAll('.before-after-container');
        
        containers.forEach(container => {
            const sliderHandle = container.querySelector('.slider-handle');
            const beforeImage = container.querySelector('.before-image');
            
            if (!sliderHandle || !beforeImage) return;
            
            let isDragging = false;
            
            function updatePosition(x) {
                const rect = container.getBoundingClientRect();
                let position = ((x - rect.left) / rect.width) * 100;
                position = Math.max(0, Math.min(100, position));
                
                sliderHandle.style.left = position + '%';
                beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
            }
            
            // Mouse events
            container.addEventListener('mousedown', e => {
                isDragging = true;
                updatePosition(e.clientX);
            });
            
            window.addEventListener('mousemove', e => {
                if (isDragging) updatePosition(e.clientX);
            });
            
            window.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            // Touch events
            container.addEventListener('touchstart', e => {
                isDragging = true;
                updatePosition(e.touches[0].clientX);
            });
            
            window.addEventListener('touchmove', e => {
                if (isDragging) updatePosition(e.touches[0].clientX);
            });
            
            window.addEventListener('touchend', () => {
                isDragging = false;
            });
        });
    }
    
    // ============================================
    // FLOATING ANIMATIONS (SIMPLE)
    // ============================================
    function initializeFloatingElements() {
        // Simple CSS animations for bubbles and orbs
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach((bubble, index) => {
            bubble.style.animationDelay = `${index * 3}s`;
        });
        
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            orb.style.animationDelay = `${index * 5}s`;
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
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                date: formData.get('date'),
                time: formData.get('time'),
                message: formData.get('message') || 'No special requests'
            };
            
            const subject = encodeURIComponent('New Appointment Request - Iconic Aesthetics');
            const body = encodeURIComponent(
                `New appointment request from ${data.name}\n\n` +
                `Contact Information:\n` +
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone}\n\n` +
                `Appointment Details:\n` +
                `Service: ${data.service}\n` +
                `Preferred Date: ${data.date}\n` +
                `Preferred Time: ${data.time}\n\n` +
                `Special Requests:\n${data.message}`
            );
            
            window.location.href = `mailto:iconicastheicsis@gmail.com?subject=${subject}&body=${body}`;
            
            // Success message
            const msg = document.createElement('div');
            msg.className = 'form-message success';
            msg.textContent = 'Opening your email client...';
            msg.style.cssText = 'background: #4CAF50; color: white; padding: 1rem; border-radius: 5px; margin-top: 1rem;';
            
            const existing = bookingForm.querySelector('.form-message');
            if (existing) existing.remove();
            
            bookingForm.appendChild(msg);
            setTimeout(() => msg.remove(), 5000);
        });
    }
    
    // ============================================
    // NEWSLETTER FORM
    // ============================================
    function initializeNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const subject = encodeURIComponent('Newsletter Subscription');
            const body = encodeURIComponent(`Please add this email to the newsletter: ${email}`);
            
            window.location.href = `mailto:iconicastheicsis@gmail.com?subject=${subject}&body=${body}`;
            
            this.querySelector('input[type="email"]').value = '';
        });
    }
    
    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    
    // Initialize core functionality
    initializeHeader();
    initializeNavigation();
    initializeSmoothScrolling();
    initializeHeroVideo();
    
    // Initialize sections
    initializeServices();
    initializeFAQ();
    initializeGallery();
    initializeBookingForm();
    initializeNewsletterForm();
    initializeFloatingElements();
    
    // Start animations
    initializePreloader();
    
    // Log initialization
    console.log('Iconic Aesthetics site initialized');
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', function() {
    console.log('Page fully loaded');
});
