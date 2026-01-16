// Interactive Timeline - Vertical with expandable cards

function initTimeline() {
  // Check for expandable timeline items (timeline page)
  const expandableItems = document.querySelectorAll('.timeline-expandable');

  if (expandableItems.length > 0) {
    console.log('Found', expandableItems.length, 'expandable timeline items');

    expandableItems.forEach((item) => {
      const content = item.querySelector('.timeline-content');
      const expandHint = item.querySelector('.expand-hint');

      const toggleItem = (e) => {
        e.stopPropagation();
        item.classList.toggle('active');

        // Update expand hint text
        if (expandHint) {
          const isActive = item.classList.contains('active');
          expandHint.textContent = isActive ? 'Click to collapse ↑' : 'Click to read more →';
        }
      };

      if (content) {
        content.addEventListener('click', toggleItem);
      }

      // Keyboard accessibility
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-expanded', 'false');

      item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleItem(e);
        }
      });

      // Update aria-expanded when toggled
      const observer = new MutationObserver(() => {
        const isActive = item.classList.contains('active');
        item.setAttribute('aria-expanded', isActive.toString());
      });

      observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });

    console.log('Timeline expandable items initialized');
    return;
  }

  // Old logic for milestones (kept for backwards compatibility)
  const milestones = document.querySelectorAll('.timeline-milestone');

  if (milestones.length === 0) {
    return;
  }

  console.log('Found', milestones.length, 'timeline milestones');

  function closeAllMilestones() {
    milestones.forEach(m => m.classList.remove('active'));
  }

  milestones.forEach((milestone, index) => {
    const toggleMilestone = (e) => {
      e.stopPropagation();
      const isActive = milestone.classList.contains('active');
      closeAllMilestones();
      if (!isActive) {
        milestone.classList.add('active');
      }
    };

    milestone.addEventListener('click', toggleMilestone);
    milestone.setAttribute('tabindex', '0');
    milestone.setAttribute('role', 'button');
    milestone.setAttribute('aria-expanded', 'false');

    milestone.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMilestone(e);
      }
    });

    const observer = new MutationObserver(() => {
      const isActive = milestone.classList.contains('active');
      milestone.setAttribute('aria-expanded', isActive.toString());
    });

    observer.observe(milestone, { attributes: true, attributeFilter: ['class'] });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.timeline-milestone')) {
      closeAllMilestones();
    }
  });

  console.log('Timeline interactivity initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimeline);
} else {
  initTimeline();
}
