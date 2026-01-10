// Blossom leaves animation for homepage
class BlossomLeaf {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 8 + 4; // 4-12px
    this.speedY = Math.random() * 1.5 + 0.5; // 0.5-2 px/frame
    this.speedX = (Math.random() - 0.5) * 1; // slight horizontal drift
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 2;

    // Color variations - pink shades
    const pinkShades = [
      '#FFB7C5', // pastel pink
      '#FFC0CB', // pink
      '#F8B4D9', // light pink
      '#FFD1DC', // very light pink
      '#FFE5EC'  // barely pink
    ];
    this.color = pinkShades[Math.floor(Math.random() * pinkShades.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    // Reset when off screen
    if (this.y > this.canvas.height + 20) {
      this.y = -20;
      this.x = Math.random() * this.canvas.width;
    }

    // Wrap around horizontally
    if (this.x < -20) this.x = this.canvas.width + 20;
    if (this.x > this.canvas.width + 20) this.x = -20;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    // Draw simple petal shape
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

function initBlossomAnimation() {
  const canvas = document.getElementById('blossom-canvas');
  if (!canvas) return; // Only run on homepage

  const ctx = canvas.getContext('2d');

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Create leaves
  const leaves = [];
  const leafCount = Math.min(30, Math.floor(window.innerWidth / 30)); // Responsive count

  for (let i = 0; i < leafCount; i++) {
    leaves.push(new BlossomLeaf(canvas));
    // Stagger initial positions
    leaves[i].y = Math.random() * canvas.height;
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    leaves.forEach(leaf => {
      leaf.update();
      leaf.draw(ctx);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlossomAnimation);
} else {
  initBlossomAnimation();
}
