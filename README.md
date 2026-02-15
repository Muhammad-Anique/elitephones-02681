# 🍊 Elitephones - iPhone 17 Pro Liquid Glass Experience

[![Live Demo](https://img.shields.io/badge/demo-live-orange)](https://elitephones.vercel.app)
[![Version](https://img.shields.io/badge/version-2.0-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

A premium, long-form interactive landing page showcasing the iPhone 17 Pro with cutting-edge **Liquid Glass** design system. Built with pure HTML5, CSS3, and Vanilla JavaScript.

## ✨ Features

### 🎨 Liquid Glass Design System
- **Glassmorphism** UI with `backdrop-filter` effects
- Premium blur effects and alpha-transparency
- **Cosmic Orange** & **Liquid Silver** color themes
- Responsive glass cards with smooth hover animations

### 🛒 Interactive Commerce Features
- **PTA Tax Toggle** - Switch between Passport and PTA-approved pricing
- **Multi-year Installments** - 12, 24, and 36-month payment plans
- **Dynamic Pricing Calculator** - Real-time price updates
- **Color Selector** - Interactive titanium finish selector
- **WhatsApp Integration** - Direct order placement via WhatsApp Business

### 📱 Long-Form Product Journey
1. **Immersive Hero** - Full-screen cinematic introduction
2. **Feature Showcase** - Liquid Lens Optics & A19 Chip highlights
3. **Tech Specs Grid** - Display, Titanium, and Tactile Finish details
4. **Color Selector** - Interactive product visualization
5. **Pricing Calculator** - PTA toggle and installment options
6. **FAQ Accordion** - Common customer queries
7. **Retail Footer** - Store information and contact details

### 🎯 Technical Highlights
- **Zero Dependencies** - Pure vanilla JavaScript, no frameworks
- **Performance Optimized** - Lazy loading, optimized images via Unsplash
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- **Mobile First** - Fully responsive across all devices
- **SEO Ready** - Semantic markup, meta tags, proper heading hierarchy

## 🚀 Live Demo

Visit the live website: **[elitephones.vercel.app](https://elitephones.vercel.app)**

## 📂 Project Structure

```
elitephones-02681/
├── index.html              # Main HTML structure (8 sections)
├── css/
│   └── main.css           # Complete Liquid Glass CSS system
├── js/
│   └── app.js             # State management & pricing logic
├── .gitignore
└── README.md
```

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Glassmorphism, animations, responsive design |
| **JavaScript (ES6+)** | State management, dynamic pricing |
| **Unsplash API** | High-quality product imagery |
| **Google Fonts** | Inter font family |

## 💻 Installation & Setup

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muhammad-Anique/elitephones-02681.git
   cd elitephones-02681
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   
   # Or use a local server (recommended)
   python -m http.server 8000
   # Visit: http://localhost:8000
   ```

### Development

No build tools required! This is a static website that runs directly in the browser.

**Recommended VS Code Extensions:**
- Live Server
- Prettier
- ESLint

## 📊 Product Configuration

Edit pricing and product details in `js/app.js`:

```javascript
const PRODUCT_DATA = {
    basePrice: 445000,        // Base price in PKR
    ptaTax: 125000,           // PTA tax amount
    variants: {
        orange: { 
            markup: 5000,     // Color variant markup
            name: 'Cosmic Orange Titanium',
            image: 'URL',
            description: 'Text...'
        },
        silver: { 
            markup: 0,
            name: 'Liquid Silver Titanium',
            image: 'URL',
            description: 'Text...'
        }
    },
    bankMarkupRate: 0.15      // 15% bank markup for installments
};
```

## 🎨 Customization

### Colors

CSS variables in `css/main.css`:

```css
:root {
    --cosmic-orange: #FF8C00;
    --liquid-silver: #C0C0C0;
    --glass-bg: rgba(255, 255, 255, 0.15);
    --glass-blur: blur(20px);
}
```

### Sections

Each section in `index.html` has a unique ID:
- `#hero` - Hero section
- `#features` - Features showcase
- `#specs` - Technical specifications
- `#colors` - Color selector
- `#buy` - Pricing calculator
- `#faq` - FAQ accordion

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ 14+ |
| Edge | ✅ Latest |
| Mobile Safari | ✅ iOS 14+ |
| Chrome Mobile | ✅ Latest |

**Note:** Glassmorphism effects require modern browsers with `backdrop-filter` support.

## 🔧 API Reference

The JavaScript exposes a public API via `window.ElitephonesApp`:

```javascript
// Get current state
ElitephonesApp.getState();

// Get current pricing
ElitephonesApp.getPricing();

// Update color
ElitephonesApp.updateColor('silver');

// Toggle PTA
ElitephonesApp.updatePTA(true);

// Change installment term
ElitephonesApp.updateTerm(24);
```

## 📈 Performance

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.0s
- **Cumulative Layout Shift:** < 0.1

Images are optimized via Unsplash CDN with URL parameters (`?w=1200&h=800&fit=crop`).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `update:` - Update existing feature
- `refactor:` - Code refactoring
- `docs:` - Documentation changes

## 📞 Contact & Support

**Elitephones Store**
- 📍 Shop #G-24, Hafiz Center, Gulberg III, Lahore
- 📱 WhatsApp: [+92 320 4589040](https://wa.me/923204589040)
- 🌐 Website: [elitephones.vercel.app](https://elitephones.vercel.app)
- 📷 Instagram: [@elitephones](https://instagram.com/elitephones)

**Developer**
- GitHub: [@Muhammad-Anique](https://github.com/Muhammad-Anique)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Apple Inc. for iPhone design inspiration
- Unsplash photographers for high-quality imagery
- Inter font family by Rasmus Andersson
- Vercel for deployment platform

---

**Built with 🧡 by the Elitephones Team**

*iPhone is a trademark of Apple Inc., registered in the U.S. and other countries.*