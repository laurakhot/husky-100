# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal e-portfolio web application built with Vite and vanilla JavaScript (no frameworks). It's a multi-page single-page application showcasing University of Washington student experiences aligned with the Husky 100 criteria (leadership, innovation, connecting the dots, and making impact).

## Common Commands

### Development
```bash
npm install           # Install dependencies (Vite only)
npm run dev          # Start dev server at http://localhost:5173
```

### Production
```bash
npm run build        # Build for production → dist/ directory
npm run preview      # Preview production build locally
```

## Architecture

### Technology Stack
- **Build Tool**: Vite 7.2.4 (ES module-based, no config file)
- **Frontend**: Vanilla JavaScript (ES6 modules)
- **Styling**: Pure CSS3 with CSS Grid/Flexbox, CSS custom properties
- **Animation**: HTML5 Canvas API for blossom leaves

### Code Structure

**Multi-page application with 6 HTML pages:**
- `index.html` - Homepage with canvas animation
- `ta.html` - Teaching & Mentorship (interactive cards)
- `web-impact.html`, `equity.html`, `ambiguity.html`, `next.html` - Experience pages

**JavaScript modules (imported by main.js):**
- `main.js` - Entry point that imports all modules
- `leaves.js` - Canvas-based BlossomLeaf class with animation loop
- `ta-cards.js` - Interactive expand/collapse functionality for TA quarter cards

**Key patterns:**
- All JS files check `if (document.readyState === 'loading')` before initializing
- Canvas animation only runs on homepage (checks for `#blossom-canvas`)
- TA cards only initialize on ta.html (checks for `.ta-card` elements)
- Each module is self-contained and checks for required DOM elements before executing

### Styling Architecture

`styles.css` uses CSS custom properties defined in `:root`:
- `--primary-color: #4b2e83` (UW Purple)
- `--secondary-color: #85754d` (UW Gold)
- Pink accent colors for cherry blossom theme
- Mobile-first responsive design with media queries

### Page Navigation

All pages share a consistent navbar structure with active state highlighting. Navigation is handled through standard HTML links (no client-side routing).

### Animation System

The BlossomLeaf class creates falling petal animations:
- Responsive leaf count based on viewport width
- Randomized colors (5 pink shades), sizes, speeds, and rotation
- Canvas resizes on window resize events
- Animation uses `requestAnimationFrame` for smooth rendering

### Interactive Components

TA quarter cards use MutationObserver to track state:
- Click `.expand-hint` element to toggle `.active` class
- ARIA attributes (`aria-expanded`, `role="button"`) for accessibility
- Keyboard navigation support (Enter/Space keys)
- Prevents event bubbling with `stopPropagation()`

## Development Notes

### Accessibility Requirements
This portfolio prioritizes accessibility:
- Use semantic HTML throughout
- Add ARIA labels for all interactive elements
- Ensure keyboard navigation works (tabindex, keypress events)
- Maintain high contrast ratios for colors

### Image Assets
Large images are in `public/` directory:
- TA.png (~16MB), WI_tabling.JPG (~6.8MB), WI_workshop.png (~11.4MB)
- Images are referenced with absolute paths: `/TA.png`

### No Testing Framework
This project has no test suite or testing dependencies. Manual testing only.

### Build Output
Vite builds to `dist/` directory with default settings (no custom vite.config.js).
