// TA Quarter Cards - Click to expand/collapse functionality

function initTACards() {
  const taCards = document.querySelectorAll('.ta-card');
  console.log('Found', taCards.length, 'TA cards');

  taCards.forEach(card => {
    const expandHint = card.querySelector('.expand-hint');

    // Only expand when clicking on the expand hint text
    if (expandHint) {
      const updateText = () => {
        const isActive = card.classList.contains('active');
        console.log('Updating text, isActive:', isActive);
        expandHint.textContent = isActive ? 'Click to collapse ↑' : 'Click to read reflection →';
        console.log('New text:', expandHint.textContent);
      };

      expandHint.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        card.classList.toggle('active');
        updateText();
      });

      // Make keyboard accessible
      expandHint.setAttribute('tabindex', '0');
      expandHint.setAttribute('role', 'button');
      expandHint.setAttribute('aria-expanded', 'false');
      expandHint.style.cursor = 'pointer';

      expandHint.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('active');
          updateText();
        }
      });

      // Update aria-expanded when toggled
      const observer = new MutationObserver(() => {
        const isActive = card.classList.contains('active');
        expandHint.setAttribute('aria-expanded', isActive.toString());
        // Don't update text here - let updateText() handle it
      });

      observer.observe(card, { attributes: true, attributeFilter: ['class'] });
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTACards);
} else {
  initTACards();
}
