// TA Quarter Cards - Click to expand/collapse functionality

function initTACards() {
  const taCards = document.querySelectorAll('.ta-card');
  const cardGrid = document.querySelector('.card-grid');
  console.log('Found', taCards.length, 'TA cards');

  // Helper to update grid state based on active cards
  const updateGridState = () => {
    if (!cardGrid) return;
    const hasActiveCard = document.querySelector('.ta-card.active') !== null;
    if (hasActiveCard) {
      cardGrid.classList.add('has-active-card');
    } else {
      cardGrid.classList.remove('has-active-card');
    }
  };

  // Helper to collapse all other cards
  const collapseOtherCards = (activeCard) => {
    taCards.forEach(otherCard => {
      if (otherCard !== activeCard && otherCard.classList.contains('active')) {
        otherCard.classList.remove('active');
        const otherHint = otherCard.querySelector('.expand-hint');
        if (otherHint) {
          otherHint.textContent = 'Click to read reflection →';
          otherHint.setAttribute('aria-expanded', 'false');
        }
      }
    });
  };

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
        const wasActive = card.classList.contains('active');

        // Collapse other cards first if we're opening this one
        if (!wasActive) {
          collapseOtherCards(card);
        }

        card.classList.toggle('active');
        updateText();
        updateGridState();
      });

      // Make keyboard accessible
      expandHint.setAttribute('tabindex', '0');
      expandHint.setAttribute('role', 'button');
      expandHint.setAttribute('aria-expanded', 'false');
      expandHint.style.cursor = 'pointer';

      expandHint.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const wasActive = card.classList.contains('active');

          // Collapse other cards first if we're opening this one
          if (!wasActive) {
            collapseOtherCards(card);
          }

          card.classList.toggle('active');
          updateText();
          updateGridState();
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
