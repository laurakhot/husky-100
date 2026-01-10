# Husky 100 E-Portfolio

A personal e-portfolio showcasing experiences that embody the Husky 100 criteria: leadership, innovation, connecting the dots, and making an impact.

## Project Structure

```
husky100/
├── index.html         # Homepage with blossom animation
├── ta.html            # Teaching & Mentorship experience
├── web-impact.html    # Web Impact projects
├── equity.html        # Equity & Access initiatives
├── ambiguity.html     # Embracing ambiguity & growth
├── next.html          # Future plans
├── styles.css         # Global styles with UW color palette
├── main.js            # Main JS entry point
├── leaves.js          # Blossom leaves animation
└── ta-cards.js        # Interactive TA quarter cards
```

## Features

### Interactive Elements
- **Blossom Leaves Animation**: Subtle falling cherry blossom petals on the homepage
- **TA Quarter Cards**: Click to expand/collapse reflections for each quarter
- **Responsive Design**: Mobile-friendly layout that adapts to all screen sizes
- **Accessible**: Keyboard navigation, ARIA labels, semantic HTML

### Design
- **Color Palette**: UW Purple (#4b2e83), UW Gold (#85754d), soft cherry blossom pink
- **Typography**: Clean, readable fonts with proper spacing
- **Navigation**: Sticky navbar with active page highlighting

## Running the Project

### Development
```bash
npm install
npm run dev
```

Visit http://localhost:5173 (or the port shown in terminal)

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Pages Overview

1. **Home**: Introduction to Husky 100 criteria with blossom animation
2. **Teaching & Mentorship**: Interactive cards showcasing 6 quarters of TA experience
3. **Web Impact**: Project cards highlighting client work and leadership
4. **Equity & Access**: Service work, accessibility projects, and inclusive design
5. **Ambiguity & Growth**: Stories of resilience, problem-solving, and innovation
6. **What's Next**: Future goals and reflections on the UW journey

## Customization Tips

### Update Content
- Edit the HTML files to replace placeholder content with your own experiences
- Modify reflections in the TA cards to match your quarters
- Update Web Impact projects with your actual work

### Adjust Colors
- Edit CSS variables in `styles.css` under `:root`
- Change `--primary-color`, `--secondary-color`, and accent colors

### Modify Animation
- Adjust leaf count, speed, and colors in `leaves.js`
- Change animation behavior by modifying the `BlossomLeaf` class

## Technologies Used

- **Vite**: Fast build tool and dev server
- **Vanilla JavaScript**: No framework dependencies for simplicity
- **CSS Grid & Flexbox**: Responsive layouts
- **Canvas API**: Blossom leaves animation

## Accessibility Features

- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color choices
- Readable font sizes and spacing

## License

This project is personal portfolio content. Feel free to use the code structure as inspiration for your own portfolio.
