/**
 * =====================================================
 * ICONIC AESTHETICS - SERVICES SECTION SCRIPT
 * =====================================================
 * 
 * This file handles all functionality for the services section including:
 * - Service filtering (Main services for "All" category)
 * - Card animations
 * - Booking interactions
 * - Mobile optimizations
 * - Image loading
 * 
 * Author: Iconic Aesthetics
 * Version: 1.0.0
 */

// -----------------------------------------------------------------------------
// INITIALIZATION
// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  initializeServices();
});

// -----------------------------------------------------------------------------
// MAIN INITIALIZATION FUNCTION
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// SERVICE CARD FUNCTIONALITY
// -----------------------------------------------------------------------------

function initializeServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (!serviceCards.length) return;
  
  setupCardFlips(serviceCards);
  setupCardHoverEffects(serviceCards);
  setupKeyboardAccessibility(serviceCards);
  
  console.log(`✅ Initialized ${serviceCards.length} service cards`);
}

/**
 * Setup card flip interactions
 */
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

/**
 * Handle card flip animation
 */
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

/**
 * Setup hover effects for cards
 */
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

/**
 * Add keyboard accessibility
 */
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

// -----------------------------------------------------------------------------
// FILTER SYSTEM
// -----------------------------------------------------------------------------

function initializeFilterSystem() {
  const filterButtons = document.querySelectorAll('.service-filter');
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (!filterButtons.length || !serviceCards.length) return;
  
  setupFilterButtons(filterButtons, serviceCards);
  makeFilterNavigationAccessible(filterButtons);
  
  console.log('✅ Filter system initialized');
}

/**
 * Setup filter button functionality
 */
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

/**
 * Update active filter button
 */
function updateActiveFilter(filterButtons, activeButton) {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
}

/**
 * Filter service cards based on category
 * UPDATED: "all" filter shows only main services
 */
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

/**
 * Animate filter icon on selection
 */
function animateFilterIcon(button) {
  const icon = button.querySelector('.filter-icon');
  if (!icon) return;
  
  icon.style.transform = 'scale(1.5)';
  setTimeout(() => {
    icon.style.transform = '';
  }, 300);
}

/**
 * Make filter navigation accessible
 */
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

// -----------------------------------------------------------------------------
// BOOKING FUNCTIONALITY
// -----------------------------------------------------------------------------

function initializeBookingButtons() {
  const bookServiceButtons = document.querySelectorAll('.book-service');
  const mainCTAButton = document.querySelector('.main-cta-btn');
  
  setupBookingButtons(bookServiceButtons);
  
  if (mainCTAButton) {
    setupMainCTAButton(mainCTAButton);
  }
  
  console.log('✅ Booking buttons initialized');
}

/**
 * Setup individual booking buttons
 */
function setupBookingButtons(bookServiceButtons) {
  bookServiceButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent card flip
      handleBookingClick(this);
    });
  });
}

/**
 * Setup main CTA button
 */
function setupMainCTAButton(mainCTAButton) {
  mainCTAButton.addEventListener('click', function() {
    handleBookingClick(this);
  });
}

/**
 * Handle booking button clicks
 */
function handleBookingClick(button) {
  // Create ripple effect
  createRippleEffect(button);
  
  // Navigate to booking section
  setTimeout(() => {
    navigateToBooking();
  }, 300);
}

/**
 * Create ripple effect on button click
 */
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

/**
 * Navigate to booking section
 */
function navigateToBooking() {
  const bookingSection = document.querySelector('#booking');
  if (bookingSection) {
    smoothScrollTo(bookingSection);
  } else {
    // Fallback to URL hash
    window.location.href = '#booking';
  }
}

// -----------------------------------------------------------------------------
// IMAGE LOADING AND OPTIMIZATION
// -----------------------------------------------------------------------------

function initializeImageLoading() {
  const serviceImages = document.querySelectorAll('.service-front[style*="background-image"]');
  
  if (!serviceImages.length) return;
  
  setupLazyLoading(serviceImages);
  optimizeImageLoading(serviceImages);
  
  console.log('✅ Image loading optimization initialized');
}

/**
 * Setup lazy loading for images
 */
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

/**
 * Load background image
 */
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

/**
 * Optimize image loading
 */
function optimizeImageLoading(serviceImages) {
  // Add loading placeholder
  serviceImages.forEach(element => {
    element.classList.add('loading-placeholder');
  });
}

// -----------------------------------------------------------------------------
// ADVANCED INTERACTIONS
// -----------------------------------------------------------------------------

function initializeAdvancedInteractions() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (!serviceCards.length) return;
  
  setupParallaxEffects(serviceCards);
  setupScrollAnimations(serviceCards);
  
  console.log('✅ Advanced interactions initialized');
}

/**
 * Setup parallax effects for cards
 */
function setupParallaxEffects(serviceCards) {
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', handleParallax);
    card.addEventListener('mouseleave', resetParallax);
  });
}

/**
 * Handle parallax effect on mouse move
 */
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

/**
 * Reset parallax effect
 */
function resetParallax() {
  const card = this;
  requestAnimationFrame(() => {
    card.style.transform = '';
  });
}

/**
 * Setup scroll animations
 */
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

// -----------------------------------------------------------------------------
// RESPONSIVE FEATURES
// -----------------------------------------------------------------------------

function initializeResponsiveFeatures() {
  setupMobileFilters();
  setupTouchOptimizations();
  setupResizeHandler();
  
  console.log('✅ Responsive features initialized');
}

/**
 * Setup mobile-friendly filters
 */
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

/**
 * Add scroll indicator for filter navigation
 */
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

/**
 * Setup touch optimizations
 */
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

/**
 * Add touch-specific styles
 */
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

/**
 * Optimize animations for touch devices
 */
function optimizeForTouch() {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    // Remove hover effects on touch devices
    card.removeEventListener('mouseenter', null);
    card.removeEventListener('mouseleave', null);
    
    // Ensure tap targets are large enough
    card.style.minWidth = '44px';
    card.style.minHeight = '44px';
  });
}

/**
 * Setup resize handler
 */
function setupResizeHandler() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      handleResize();
    }, 250);
  });
}

/**
 * Handle window resize
 */
function handleResize() {
  // Update filter navigation for mobile
  setupMobileFilters();
  
  // Recalculate parallax effects
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.style.transform = '';
  });
}

// -----------------------------------------------------------------------------
// PERFORMANCE OPTIMIZATIONS
// -----------------------------------------------------------------------------

function initializeOptimizations() {
  optimizeAnimations();
  setupPerformanceMonitoring();
  
  console.log('✅ Performance optimizations applied');
}

/**
 * Optimize animations
 */
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

/**
 * Setup performance monitoring
 */
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

// -----------------------------------------------------------------------------
// AOS INITIALIZATION
// -----------------------------------------------------------------------------

function initializeAOS() {
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

// -----------------------------------------------------------------------------
// UTILITY FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
  const headerOffset = 100;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

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

// -----------------------------------------------------------------------------
// EXPORTS (if using module system)
// -----------------------------------------------------------------------------

// Uncomment if using ES modules
/*
export {
  initializeServices,
  filterServiceCards,
  handleCardFlip,
  smoothScrollTo
};
*/
