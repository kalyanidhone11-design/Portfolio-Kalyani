// Teddy Bear Cursor Animation
// Shows a cute teddy bear following your cursor

class TeddyCursor {
  constructor() {
    this.teddy = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.teddyX = 0;
    this.teddyY = 0;

    this.init();
  }

  init() {
    // Hide the default cursor
    document.body.style.cursor = 'none';

    // Create teddy element
    this.teddy = document.createElement('img');
    this.teddy.src = './scripts/teddy.png';
    this.teddy.style.position = 'fixed';
    this.teddy.style.pointerEvents = 'none';
    this.teddy.style.width = '24px';
    this.teddy.style.height = '24px';
    this.teddy.style.zIndex = '10000';
    this.teddy.style.top = '0';
    this.teddy.style.left = '0';
    this.teddy.style.imageRendering = 'pixelated'; // Keep pixel art crisp
    document.body.appendChild(this.teddy);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.update();
    });

    // Show cursor when leaving window
    document.addEventListener('mouseleave', () => {
      document.body.style.cursor = 'auto';
      this.teddy.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      document.body.style.cursor = 'none';
      this.teddy.style.opacity = '1';
    });
  }

  update() {
    // Smooth follow with easing
    this.teddyX += (this.mouseX - this.teddyX) * 0.5;
    this.teddyY += (this.mouseY - this.teddyY) * 0.5;

    // Update position (center the teddy on cursor)
    this.teddy.style.left = (this.teddyX - 12) + 'px';
    this.teddy.style.top = (this.teddyY - 12) + 'px';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TeddyCursor();
  });
} else {
  new TeddyCursor();
}
