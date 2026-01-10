// TA Quarter Cards - Click to expand/collapse functionality

function initTACards() {
  const taCards = document.querySelectorAll('.ta-card');

  taCards.forEach(card => {
    card.addEventListener('click', () => {
      // Toggle active state
      card.classList.toggle('active');

      // Optional: Close other cards (uncomment if you want accordion behavior)
      // taCards.forEach(otherCard => {
      //   if (otherCard !== card) {
      //     otherCard.classList.remove('active');
      //   }
      // });
    });

    // Make keyboard accessible
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');

    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    // Update aria-expanded when toggled
    const observer = new MutationObserver(() => {
      const isActive = card.classList.contains('active');
      card.setAttribute('aria-expanded', isActive.toString());
    });

    observer.observe(card, { attributes: true, attributeFilter: ['class'] });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTACards);
} else {
  initTACards();
}
