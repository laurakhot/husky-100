// Web Impact page - Collapsible year sections

function initCollapsibleSections() {
  const collapsibleHeadings = document.querySelectorAll('.collapsible-heading');

  if (collapsibleHeadings.length === 0) {
    return;
  }

  console.log('Found', collapsibleHeadings.length, 'collapsible sections');

  collapsibleHeadings.forEach((heading) => {
    const content = heading.nextElementSibling;

    if (!content || !content.classList.contains('collapsible-content')) {
      return;
    }

    // Start collapsed by default
    heading.classList.add('collapsed');
    content.classList.add('collapsed');

    const toggleSection = (e) => {
      e.stopPropagation();
      heading.classList.toggle('collapsed');
      content.classList.toggle('collapsed');
    };

    heading.addEventListener('click', toggleSection);

    // Keyboard accessibility
    heading.setAttribute('tabindex', '0');
    heading.setAttribute('role', 'button');
    heading.setAttribute('aria-expanded', 'false');

    heading.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSection(e);
      }
    });

    // Update aria-expanded when toggled
    const observer = new MutationObserver(() => {
      const isCollapsed = heading.classList.contains('collapsed');
      heading.setAttribute('aria-expanded', (!isCollapsed).toString());
    });

    observer.observe(heading, { attributes: true, attributeFilter: ['class'] });
  });

  console.log('Collapsible sections initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCollapsibleSections);
} else {
  initCollapsibleSections();
}
