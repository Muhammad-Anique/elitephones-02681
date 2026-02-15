'use strict';

/**
 * theme.js - Handles visual state and PTA toggling
 */

const UI_STATE = {
    isPTA: localStorage.getItem('isPTA') === 'true',
    ptaTax: 120000 // Average PTA tax for iPhone 17 series
};

const PRODUCTS = {
    'pro-max': { base: 445000, name: 'iPhone 17 Pro Max' },
    'pro': { base: 395000, name: 'iPhone 17 Pro' },
    'standard': { base: 285000, name: 'iPhone 17' }
};

function formatPrice(amount) {
    return 'Rs. ' + amount.toLocaleString();
}

/**
 * Updates all price displays based on PTA status
 */
function updateAllPrices() {
    const ptaToggle = document.getElementById('pta-toggle');
    UI_STATE.isPTA = ptaToggle.checked;
    localStorage.setItem('isPTA', UI_STATE.isPTA);

    // Update toggles visual state if needed
    const ptaLabels = document.querySelectorAll('.pta-toggle-label');
    ptaLabels.forEach(label => {
        if (label.dataset.active === String(UI_STATE.isPTA)) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });

    // Update Product Cards
    document.querySelectorAll('[data-product-id]').forEach(card => {
        const id = card.dataset.productId;
        const product = PRODUCTS[id];
        if (!product) return;

        const finalPrice = UI_STATE.isPTA ? product.base + UI_STATE.ptaTax : product.base;
        const priceDisplay = card.querySelector('.price-display');
        if (priceDisplay) {
            priceDisplay.innerText = formatPrice(finalPrice);
            // Re-trigger installment calculation if any
            updateInstallmentPreview(card, finalPrice);
        }
    });
}

function updateInstallmentPreview(card, totalPrice) {
    const installmentDisplay = card.querySelector('.installment-display');
    if (installmentDisplay) {
        // Simple 12-month installment with 15% markup as per architecture doc
        const monthly = Math.round((totalPrice * 1.15) / 12);
        installmentDisplay.innerText = formatPrice(monthly);
    }
}

/**
 * Swaps images based on color swatch selection
 */
window.swapColor = function(productId, colorName, imageUrl) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    if (!card) return;

    const img = card.querySelector('.product-image');
    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = imageUrl;
            img.style.opacity = '1';
        }, 300);
    }

    // Update active swatch state
    card.querySelectorAll('.swatch').forEach(s => {
        s.classList.remove('active');
        if (s.dataset.color === colorName) s.classList.add('active');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const ptaToggle = document.getElementById('pta-toggle');
    if (ptaToggle) {
        ptaToggle.checked = UI_STATE.isPTA;
        ptaToggle.addEventListener('change', updateAllPrices);
    }
    
    // Initial Price Update
    updateAllPrices();

    // Event Delegation for Swatches (Alternative to inline onclick)
});