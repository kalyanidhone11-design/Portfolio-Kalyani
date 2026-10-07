// Fish Cursor Animation
// Add this to your slide deck to show cute fish following the cursor

class FishCursor {
  constructor() {
    this.fish = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.fishCount = 3; // Number of fish to display

    this.init();
  }

  init() {
    // Hide the default cursor
    document.body.style.cursor = 'none';

    // Create fish elements
    for (let i = 0; i < this.fishCount; i++) {
      const fish = document.createElement('div');
      fish.className = 'fish';
      fish.innerHTML = '🐠';
      fish.style.position = 'fixed';
      fish.style.pointerEvents = 'none';
      fish.style.fontSize = '24px';
      fish.style.zIndex = '10000';
      fish.style.transition = `transform 0.1s ease-out`;
      document.body.appendChild(fish);

      this.fish.push({
        element: fish,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        delay: i * 0.05, // Stagger delay for trailing effect
      });
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.update();
    });

    // Show cursor when leaving window
    document.addEventListener('mouseleave', () => {
      document.body.style.cursor = 'auto';
      this.fish.forEach(f => f.element.style.opacity = '0');
    });

    document.addEventListener('mouseenter', () => {
      document.body.style.cursor = 'none';
      this.fish.forEach(f => f.element.style.opacity = '1');
    });
  }

  update() {
    this.fish.forEach((fish, index) => {
      // Each fish follows the previous one with a slight delay
      const leader = index === 0 ? { x: this.mouseX, y: this.mouseY } : this.fish[index - 1];

      // Smooth follow with easing
      fish.targetX = leader.x - 12;
      fish.targetY = leader.y - 12;

      // Ease towards target
      fish.x += (fish.targetX - fish.x) * 0.3;
      fish.y += (fish.targetY - fish.y) * 0.3;

      // Calculate rotation based on movement direction
      const dx = fish.targetX - fish.x;
      const dy = fish.targetY - fish.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Update position and rotation
      fish.element.style.left = fish.x + 'px';
      fish.element.style.top = fish.y + 'px';
      fish.element.style.transform = `rotate(${angle + 90}deg)`;
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FishCursor();
  });
} else {
  new FishCursor();
}
