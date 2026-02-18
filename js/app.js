/**
 * app.js - State Management for Elitephones Apple-Style Light Mode Theme
 * Handles dynamic pricing, PTA tax toggling, color selection, and installment calculations
 */

'use strict';

/* ========================================
   CONFIGURATION & STATE
   ======================================== */

const PRODUCT_DATA = {
    basePrice: 445000,
    ptaTax: 125000,
    variants: {
        orange: { 
            markup: 5000, 
            name: 'Cosmic Orange Titanium',
            image: 'https://images.unsplash.com/photo-1764746049934-69d8beed54b9?w=1200&h=800&fit=crop',
            description: 'A bold statement of innovation. The signature orange hue is achieved through a precision anodization process, creating a vibrant, durable finish that captures light beautifully.'
        },
        silver: { 
            markup: 0, 
            name: 'Liquid Silver Titanium',
            image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=1200&h=800&fit=crop',
            description: 'Timeless elegance meets modern engineering. The liquid silver finish showcases the natural beauty of Grade 5 titanium with a refined, professional aesthetic.'
        }
    },
    bankMarkupRate: 0.15 // 15% estimated bank markup for installments
};

const STATE = {
    color: 'orange',
    pta: false,
    term: 12
};

/* ========================================
   PRICING CALCULATION ENGINE
   ======================================== */

/**
 * Calculate final pricing based on current state
 * @returns {Object} Object containing formatted total and monthly prices
 */
function calculatePricing() {
    const variant = PRODUCT_DATA.variants[STATE.color];
    const subtotal = PRODUCT_DATA.basePrice + variant.markup;
    const total = STATE.pta ? subtotal + PRODUCT_DATA.ptaTax : subtotal;
    
    // Calculate monthly with bank markup
    const totalWithMarkup = total * (1 + PRODUCT_DATA.bankMarkupRate);
    const monthly = totalWithMarkup / STATE.term;
    
    return {
        total: total.toLocaleString('en-PK'),
        monthly: Math.round(monthly).toLocaleString('en-PK')
    };
}

/* ========================================
   DOM UPDATE FUNCTIONS
   ======================================== */

/**
 * Update all price displays throughout the page
 */
function updatePriceDisplays() {
    const prices = calculatePricing();
    
    // Update hero price
    const heroPrice = document.getElementById('hero-price');
    if (heroPrice) {
        heroPrice.textContent = `Rs. ${prices.total}`;
    }
    
    // Update final price in pricing section
    const finalPrice = document.getElementById('final-price');
    if (finalPrice) {
        finalPrice.textContent = `Rs. ${prices.total}`;
    }
    
    // Update monthly installment price
    const monthlyPrice = document.getElementById('monthly-price');
    if (monthlyPrice) {
        monthlyPrice.textContent = `Rs. ${prices.monthly} / month`;
    }
}

/**
 * Update PTA toggle label styling
 * @param {NodeList} labels - All PTA label elements
 */
function updatePTALabels(labels) {
    labels.forEach(label => {
        const isActive = (label.dataset.active === 'true' && STATE.pta) || 
                        (label.dataset.active === 'false' && !STATE.pta);
        
        if (isActive) {
            label.style.color = 'var(--cosmic-orange)';
            label.style.fontWeight = 'var(--font-weight-bold)';
        } else {
            label.style.color = 'var(--text-secondary)';
            label.style.fontWeight = 'var(--font-weight-semibold)';
        }
    });
}

/**
 * Update product image and details when color changes
 */
function updateColorDisplay() {
    const variant = PRODUCT_DATA.variants[STATE.color];
    
    // Update main product image
    const productImg = document.getElementById('product-display-img');
    if (productImg) {
        productImg.src = variant.image;
        productImg.alt = `iPhone 17 Pro in ${variant.name}`;
    }
    
    // Update color details
    const colorTitle = document.querySelector('.color-detail-title');
    const colorText = document.querySelector('.color-detail-text');
    
    if (colorTitle) {
        colorTitle.textContent = variant.name;
    }
    
    if (colorText) {
        colorText.textContent = variant.description;
    }
}

/**
 * Synchronize all PTA toggles across the page
 * @param {boolean} checked - New toggle state
 */
function syncPTAToggles(checked) {
    const heroToggle = document.getElementById('pta-toggle-hero');
    const mainToggle = document.getElementById('pta-toggle-main');
    
    if (heroToggle) heroToggle.checked = checked;
    if (mainToggle) mainToggle.checked = checked;
    
    // Update all labels
    const allLabels = document.querySelectorAll('.pta-label, .pta-label-main');
    updatePTALabels(allLabels);
}

/**
 * Master update function - updates all DOM elements
 */
function updateDOM() {
    updatePriceDisplays();
    updateColorDisplay();
}

/* ========================================
   EVENT HANDLERS
   ======================================== */

/**
 * Handle PTA toggle change
 * @param {Event} e - Change event
 */
function handlePTAToggle(e) {
    STATE.pta = e.target.checked;
    syncPTAToggles(STATE.pta);
    updatePriceDisplays();
}

/**
 * Handle color swatch selection
 * @param {HTMLElement} swatch - Clicked swatch element
 */
function handleColorSelection(swatch) {
    const color = swatch.dataset.color;
    if (!color || STATE.color === color) return;
    
    STATE.color = color;
    
    // Update active state on swatches
    document.querySelectorAll('.color-swatch').forEach(s => {
        s.classList.remove('active');
    });
    swatch.classList.add('active');
    
    // Update display
    updateDOM();
}

/**
 * Handle installment term selection
 * @param {HTMLElement} btn - Clicked button element
 */
function handleInstallmentSelection(btn) {
    const months = parseInt(btn.dataset.months);
    if (!months || STATE.term === months) return;
    
    STATE.term = months;
    
    // Update active state on buttons
    document.querySelectorAll('.installment-btn').forEach(b => {
        b.classList.remove('active');
    });
    btn.classList.add('active');
    
    // Update price display
    updatePriceDisplays();
}

/**
 * Handle FAQ accordion toggle
 * @param {HTMLElement} question - Clicked question element
 */
function handleFAQToggle(question) {
    const item = question.closest('.faq-item');
    const isActive = item.classList.contains('active');
    
    // Close all other items
    document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
    } else {
        question.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Handle smooth scroll navigation
 * @param {Event} e - Click event
 */
function handleSmoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.glass-nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

/* ========================================
   INITIALIZATION
   ======================================== */

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    
    // PTA Toggles (Hero & Main)
    const heroToggle = document.getElementById('pta-toggle-hero');
    const mainToggle = document.getElementById('pta-toggle-main');
    
    if (heroToggle) {
        heroToggle.addEventListener('change', handlePTAToggle);
    }
    
    if (mainToggle) {
        mainToggle.addEventListener('change', handlePTAToggle);
    }
    
    // Color Swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => handleColorSelection(swatch));
    });
    
    // Installment Buttons
    document.querySelectorAll('.installment-btn').forEach(btn => {
        btn.addEventListener('click', () => handleInstallmentSelection(btn));
    });
    
    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => handleFAQToggle(question));
    });
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

/**
 * Initialize navigation blur effect on scroll
 * Apple-style light mode navigation enhancement
 */
function initializeNavEffects() {
    const nav = document.querySelector('.glass-nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            // Apple-style scrolled navigation - more opaque white
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
        } else {
            // Default glass effect
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Initialize AOS (Animate On Scroll) alternative
 * Simple intersection observer for fade-in animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Main initialization function
 */
function init() {
    // Initial DOM update
    updateDOM();
    
    // Initialize all features
    initializeEventListeners();
    initializeNavEffects();
    initializeScrollAnimations();
    
    // Log initialization
    console.log('%c✓ Elitephones Apple-Style Light Mode Theme Initialized', 'color: #FF4500; font-weight: bold; font-size: 14px;');
    console.log(`%cCurrent State:`, 'color: #86868B; font-weight: bold;');
    console.log(`  Color: ${STATE.color}`);
    console.log(`  PTA: ${STATE.pta}`);
    console.log(`  Term: ${STATE.term} months`);
}

/* ========================================
   START APPLICATION
   ======================================== */

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/* ========================================
   UTILITY FUNCTIONS (PUBLIC API)
   ======================================== */

// Expose functions for external use or testing
window.ElitephonesApp = {
    getState: () => ({ ...STATE }),
    getPricing: calculatePricing,
    updateColor: (color) => {
        if (PRODUCT_DATA.variants[color]) {
            STATE.color = color;
            updateDOM();
        }
    },
    updatePTA: (enabled) => {
        STATE.pta = Boolean(enabled);
        syncPTAToggles(STATE.pta);
        updatePriceDisplays();
    },
    updateTerm: (months) => {
        if ([12, 24, 36].includes(months)) {
            STATE.term = months;
            updatePriceDisplays();
        }
    }
};