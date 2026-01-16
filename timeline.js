// Interactive Timeline - Vertical with expandable cards

function initTimeline() {
  // Check for expandable timeline items (timeline page)
  const expandableItems = document.querySelectorAll('.timeline-expandable');
  const huskyMascot = document.getElementById('husky-mascot');

  if (expandableItems.length > 0) {
    console.log('Found', expandableItems.length, 'expandable timeline items');

    // Initialize Husky mascot position tracker
    if (huskyMascot) {
      initHuskyMascot(expandableItems, huskyMascot);
    }

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

// Husky Mascot Scroll Indicator
function initHuskyMascot(timelineItems, huskyMascot) {
  if (!huskyMascot || timelineItems.length === 0) return;

  let currentActiveIndex = 0;

  // Function to move husky to a specific timeline dot
  function moveHuskyToDot(index) {
    const item = timelineItems[index];
    if (!item) return;

    const dot = item.querySelector('.timeline-dot');
    if (!dot) return;

    // Remove husky-active class from all items
    timelineItems.forEach(item => item.classList.remove('husky-active'));

    // Add husky-active class to current item
    item.classList.add('husky-active');

    // Get the position of the dot relative to the timeline container
    const timeline = document.querySelector('.timeline');
    const timelineRect = timeline.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();

    // Calculate position relative to timeline
    const topPosition = dotRect.top - timelineRect.top + timeline.scrollTop - 20; // Offset to center on dot

    huskyMascot.style.top = `${topPosition}px`;
    currentActiveIndex = index;
  }

  // Move husky based on scroll position
  function updateHuskyOnScroll() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    timelineItems.forEach((item, index) => {
      const dot = item.querySelector('.timeline-dot');
      if (!dot) return;

      const dotRect = dot.getBoundingClientRect();
      const dotCenter = dotRect.top + window.scrollY + dotRect.height / 2;
      const distance = Math.abs(scrollPosition - dotCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentActiveIndex) {
      moveHuskyToDot(closestIndex);
    }
  }

  // Listen for scroll events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateHuskyOnScroll, 50); // Throttle scroll events
  });

  // Listen for expand/collapse events - move husky when item is clicked
  timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      setTimeout(() => moveHuskyToDot(index), 20); // Very fast response
    });
  });

  // Initialize husky position at first dot
  moveHuskyToDot(0);

  console.log('Husky mascot scroll indicator initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimeline);
} else {
  initTimeline();
}
