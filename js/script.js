'use strict';

/**
 * Elitephones - Catalog Interaction Script
 * Handles product selection, WhatsApp link generation, and UI effects.
 */

// 1. DATA LAYER - Product Specifications
const PRODUCT_DATA = {
    'iPhone 17 Pro Max': {
        basePrice: 445000,
        colors: ['Titanium Silver', 'Desert Orange'],
        storageOptions: {
            '256GB': 0,
            '512GB': 45000,
            '1TB': 95000
        }
    },
    'iPhone 17 Pro': {
        basePrice: 395000,
        colors: ['Natural Titanium', 'Space Black'],
        storageOptions: {
            '128GB': 0,
            '256GB': 30000,
            '512GB': 70000,
            '1TB': 120000
        }
    },
    'iPhone 17': {
        basePrice: 285000,
        colors: ['Blue', 'Pink', 'Midnight'],
        storageOptions: {
            '128GB': 0,
            '256GB': 25000,
            '512GB': 60000
        }
    }
};

// 2. STATE MANAGEMENT
let currentSelection = {
    model: 'iPhone 17 Pro',
    storage: '128GB',
    ptaStatus: 'PTA Approved',
    color: 'Default'
};

// 3. WHATSAPP INTEGRATION
/**
 * Constructs a WhatsApp URL based on the user's current selection
 * and redirects the user.
 */
function sendToWhatsApp(modelName) {
    const phoneNumber = '923204589040';
    const message = `I'm interested in the ${modelName}.\n\n` +
                    `• Storage: ${currentSelection.storage}\n` +
                    `• Status: ${currentSelection.ptaStatus}\n\n` +
                    `Please provide current availability and final price.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// 4. UI INTERACTIONS
/**
 * Function called from HTML buttons to initiate a product inquiry
 */
window.selectProduct = function(modelName) {
    // Update local state
    currentSelection.model = modelName;
    
    // In a real app, this could open a modal for storage/color selection.
    // For this catalog, we trigger the primary action immediately.
    console.log(`User selected: ${modelName}`);
    sendToWhatsApp(modelName);
};

// 5. DOM READY HANDLERS
document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 48; // h-12 in Tailwind is 3rem/48px
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar transparency effect on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            nav.classList.remove('shadow-lg');
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // Animation on Intersection (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
});

// 6. ERROR HANDLING / FALLBACKS
window.onerror = function() {
    console.log("Elitephones UI encountered a minor error. Interaction continues.");
    return true; // Prevents the error from showing in browser console
};