'use strict';

/**
 * app.js - State-managed interaction for Elitephones Liquid Glass Theme
 */

const PRODUCT_DATA = {
    basePrice: 445000,
    ptaTax: 125000,
    variants: {
        orange: { markup: 5000, color: 'Cosmic Orange' },
        silver: { markup: 0, color: 'Liquid Silver' }
    }
};

const STATE = {
    color: 'orange',
    pta: false,
    term: 12,
    storageMarkup: 0 
};

function calculatePricing() {
    const variant = PRODUCT_DATA.variants[STATE.color];
    const subtotal = PRODUCT_DATA.basePrice + variant.markup + STATE.storageMarkup;
    const total = STATE.pta ? subtotal + PRODUCT_DATA.ptaTax : subtotal;
    
    const monthly = (total * 1.15) / STATE.term; // 15% estimated bank markup
    
    return {
        total: total.toLocaleString(),
        monthly: Math.round(monthly).toLocaleString()
    };
}

function updateDOM() {
    const prices = calculatePricing();
    
    // Update main total
    const totalEl = document.getElementById('final-price');
    if (totalEl) totalEl.innerText = `Rs. ${prices.total}`;
    
    // Update installment
    const monthlyEl = document.getElementById('installment-price');
    if (monthlyEl) monthlyEl.innerText = `Rs. ${prices.monthly}`;
    
    // Update term display
    const termEl = document.getElementById('selected-term');
    if (termEl) termEl.innerText = `${STATE.term} Months`;

    // Update labels
    document.querySelectorAll('.pta-toggle-label').forEach(label => {
        const isActive = (label.dataset.active === 'true' && STATE.pta) || (label.dataset.active === 'false' && !STATE.pta);
        label.style.color = isActive ? 'var(--cosmic-orange)' : 'var(--apple-grey)';
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // PTA Toggle
    const ptaToggle = document.getElementById('pta-toggle');
    if (ptaToggle) {
        ptaToggle.addEventListener('change', (e) => {
            STATE.pta = e.target.checked;
            updateDOM();
        });
    }

    // Color Swatches
    document.querySelectorAll('.swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.dataset.color;
            STATE.color = color;
            
            // UI Switch
            document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            
            // Image swap (if hero id exists)
            const heroImg = document.getElementById('hero-product-img');
            if (heroImg) {
                heroImg.src = color === 'orange' 
                    ? 'https://images.unsplash.com/photo-1764746049934-69d8beed54b9?w=1200' 
                    : 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=1200';
            }
            
            updateDOM();
        });
    });

    // Installment Sliders/Buttons
    document.querySelectorAll('.installment-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            STATE.term = parseInt(btn.dataset.months);
            document.querySelectorAll('.installment-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateDOM();
        });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });

    // Initial Update
    updateDOM();
});