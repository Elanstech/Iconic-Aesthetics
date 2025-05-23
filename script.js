/**
 * Iconic Aesthetics - Main JavaScript File
 */

// Wait for window load to ensure all resources are available
window.onload = function() {
    console.log('Window loaded - initializing scripts');
    
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initHeroVideo();
    initServices();
    initBeforeAfterSlider();
    initFAQ();
    initGallery();
    initForms();
    
    // Initialize AOS animations if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    console.log('✅ All scripts initialized successfully');
};

// =======================================================================
// NAVIGATION
// =======================================================================
function initNavigation() {
    var body = document.body;
    var header = document.querySelector('.site-header');
    var menuToggle = document.querySelector('.menu-toggle');
    var mobileNav = document.querySelector('.mobile-nav');
    var mobileNavClose = document.querySelector('.mobile-nav-close');
    var mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    var navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            if (mobileNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
                
                // Animate menu items with delay
                mobileNavLinks.forEach(function(link, index) {
                    link.parentElement.style.transitionDelay = index * 0.1 + 's';
                });
            } else {
                body.style.overflow = '';
                
                // Reset transition delay
                mobileNavLinks.forEach(function(link) {
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
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            var targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav link based on scroll position
    function updateActiveNavLink() {
        var scrollPosition = window.scrollY;
        
        // Find all sections with IDs
        document.querySelectorAll('section[id]').forEach(function(section) {
            var sectionTop = section.offsetTop - 200; // Offset for better UX
            var sectionBottom = sectionTop + section.offsetHeight;
            var sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                var activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Update on load
    updateActiveNavLink();
}

// =======================================================================
// SCROLL EFFECTS
// =======================================================================
function initScrollEffects() {
    var header = document.querySelector('.site-header');
    var backToTop = document.getElementById('back-to-top');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
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
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Simple parallax for hero content
    var heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', function() {
            var scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroContent.style.transform = 'translateY(' + (scrollPosition * 0.2) + 'px)';
                heroContent.style.opacity = 1 - (scrollPosition * 0.003);
            }
        });
    }
    
    // Scroll indicator
    var scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            var nextSection = document.querySelector('#about') || document.querySelector('section:nth-child(2)');
            if (nextSection) {
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// =======================================================================
// HERO VIDEO
// =======================================================================
function initHeroVideo() {
    var heroVideo = document.querySelector('.hero-background-video');
    
    if (!heroVideo) return;
    
    // Function to check if video can play
    function checkVideoPlayback() {
        var playPromise = heroVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.then(function() {
                console.log('Video playback started');
            })
            .catch(function(error) {
                console.error('Video playback failed:', error);
                
                // Add poster image as fallback
                heroVideo.poster = 'https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg';
                
                // Add play button for manual play
                var playButton = document.createElement('button');
                playButton.className = 'video-play-btn';
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.setAttribute('aria-label', 'Play video');
                
                var videoWrapper = document.querySelector('.hero-video-wrapper');
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
}

// =======================================================================
// SERVICES SECTION
// =======================================================================
function initServices() {
    var filterButtons = document.querySelectorAll('.service-filter');
    var serviceCards = document.querySelectorAll('.service-card');
    
    if (!filterButtons.length || !serviceCards.length) return;
    
    // Setup filter buttons
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter cards
            filterServiceCards(filter);
        });
    });
    
    // Set initial state - show only main services
    filterServiceCards('all');
    
    // Filter service cards
    function filterServiceCards(filter) {
        serviceCards.forEach(function(card) {
            var category = card.getAttribute('data-category');
            var isMain = card.getAttribute('data-main') === 'true';
            
            if (filter === 'all') {
                // For "all" filter, only show main services
                if (isMain) {
                    card.style.display = 'block';
                    setTimeout(function() {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        card.style.display = 'none';
                    }, 300);
                }
            } else {
                // For specific category filters
                if (category === filter) {
                    card.style.display = 'block';
                    setTimeout(function() {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
    
    // Booking buttons
    var bookButtons = document.querySelectorAll('.book-service, .main-cta-btn');
    
    bookButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var bookingSection = document.querySelector('#booking');
            if (bookingSection) {
                var headerHeight = document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight : 0;
                var targetPosition = bookingSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =======================================================================
// BEFORE-AFTER SLIDER
// =======================================================================
function initBeforeAfterSlider() {
    var containers = document.querySelectorAll('.ba-container');
    
    if (!containers.length) return;
    
    containers.forEach(function(container) {
        var slider = container.querySelector('.ba-slider');
        var beforeImage = container.querySelector('.before-image');
        var divider = container.querySelector('.ba-divider');
        
        if (!slider || !beforeImage || !divider) return;
        
        var isDragging = false;
        
        // Set initial position (50%)
        setPosition(50);
        
        // Mouse events
        slider.addEventListener('mousedown', function(e) {
            e.preventDefault();
            isDragging = true;
            container.classList.add('dragging');
            updatePosition(e.clientX);
        });
        
        window.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            updatePosition(e.clientX);
        });
        
        window.addEventListener('mouseup', function() {
            isDragging = false;
            container.classList.remove('dragging');
        });
        
        // Touch events
        slider.addEventListener('touchstart', function(e) {
            isDragging = true;
            container.classList.add('dragging');
            updatePosition(e.touches[0].clientX);
        });
        
        window.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            updatePosition(e.touches[0].clientX);
        });
        
        window.addEventListener('touchend', function() {
            isDragging = false;
            container.classList.remove('dragging');
        });
        
        // Update slider position
        function updatePosition(clientX) {
            var rect = container.getBoundingClientRect();
            var position = ((clientX - rect.left) / rect.width) * 100;
            setPosition(position);
        }
        
        // Set position (percentage)
        function setPosition(percentage) {
            // Limit percentage between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            slider.style.left = percentage + '%';
            divider.style.left = percentage + '%';
            beforeImage.style.clipPath = 'polygon(0 0, ' + percentage + '% 0, ' + percentage + '% 100%, 0 100%)';
            
            // Update labels if they exist
            var beforeLabel = container.querySelector('.before-label');
            var afterLabel = container.querySelector('.after-label');
            
            if (beforeLabel && afterLabel) {
                beforeLabel.style.opacity = percentage < 20 ? (percentage / 20) : 1;
                afterLabel.style.opacity = percentage > 80 ? ((100 - percentage) / 20) : 1;
            }
        }
        
        // Add initial animation
        setTimeout(function() {
            // Animate from center to right
            var startTime = Date.now();
            var duration = 600;
            var startPos = 50;
            var endPos = 65;
            
            function step() {
                var elapsed = Date.now() - startTime;
                var progress = Math.min(elapsed / duration, 1);
                var currentPos = startPos + (endPos - startPos) * progress;
                
                setPosition(currentPos);
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    // Animate from right to left
                    startTime = Date.now();
                    startPos = endPos;
                    endPos = 35;
                    
                    function step2() {
                        var elapsed = Date.now() - startTime;
                        var progress = Math.min(elapsed / duration, 1);
                        var currentPos = startPos + (endPos - startPos) * progress;
                        
                        setPosition(currentPos);
                        
                        if (progress < 1) {
                            requestAnimationFrame(step2);
                        } else {
                            // Animate back to center
                            startTime = Date.now();
                            startPos = endPos;
                            endPos = 50;
                            
                            function step3() {
                                var elapsed = Date.now() - startTime;
                                var progress = Math.min(elapsed / 400, 1);
                                var currentPos = startPos + (endPos - startPos) * progress;
                                
                                setPosition(currentPos);
                                
                                if (progress < 1) {
                                    requestAnimationFrame(step3);
                                }
                            }
                            
                            requestAnimationFrame(step3);
                        }
                    }
                    
                    requestAnimationFrame(step2);
                }
            }
            
            requestAnimationFrame(step);
        }, 1000);
    });
}

// =======================================================================
// FAQ SECTION
// =======================================================================
function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        
        if (!question) return;
        
        question.addEventListener('click', function() {
            var isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(function(faq) {
                faq.classList.remove('active');
                var icon = faq.querySelector('.faq-icon i');
                if (icon) icon.className = 'fas fa-plus';
            });
            
            // If the clicked item was not active, open it
            if (!isActive) {
                item.classList.add('active');
                var icon = item.querySelector('.faq-icon i');
                if (icon) icon.className = 'fas fa-minus';
            }
        });
    });
}

// =======================================================================
// GALLERY SECTION
// =======================================================================
function initGallery() {
    var filters = document.querySelectorAll('.gallery-filter');
    var items = document.querySelectorAll('.gallery-item');
    
    if (!filters.length || !items.length) return;
    
    filters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            var category = this.getAttribute('data-filter');
            
            // Update active filter
            filters.forEach(function(f) {
                f.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter items
            items.forEach(function(item) {
                var itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(function() {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// =======================================================================
// FORMS
// =======================================================================
function initForms() {
    var forms = document.querySelectorAll('form');
    
    if (!forms.length) return;
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var isValid = true;
            var requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Remove any existing message
            var existingMessage = form.querySelector('.form-message');
            if (existingMessage) existingMessage.remove();
            
            if (isValid) {
                // Show success message
                var formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Your message has been sent successfully!';
                
                form.reset();
                form.appendChild(formMessage);
            } else {
                // Show error message
                var formMessage = document.createElement('div');
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill in all required fields.';
                
                form.appendChild(formMessage);
            }
            
            // Remove message after 5 seconds
            setTimeout(function() {
                var message = form.querySelector('.form-message');
                if (message) message.remove();
            }, 5000);
        });
    });
}
