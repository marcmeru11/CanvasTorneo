/**
 * ImageShape.js
 * Draws a preloaded HTMLImageElement on the canvas with optional clipping (circle or rounded rect).
 */
class ImageShape {
  /**
   * @param {number} x - X position in world coordinates.
   * @param {number} y - Y position in world coordinates.
   * @param {number} width - Render width.
   * @param {number} height - Render height.
   * @param {HTMLImageElement} image - A fully loaded Image object.
   * @param {Object} [options] - Additional options.
   * @param {string} [options.clipShape="circle"] - "circle" or "rect".
   * @param {number} [options.borderRadius=4] - Border radius when clipShape is "rect".
   */
  constructor(x, y, width, height, image, options = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.clipShape = options.clipShape || "circle";
    this.borderRadius = options.borderRadius ?? 4;

    // Shared shape interface
    this.metadata = null;
    this.cursor = "default";
    this.isHovered = false;
    this.hoverGroupId = null;
    this.ignoreInBounds = false;
  }

  draw(ctx, camera) {
    if (!this.image || !this.image.complete) return;

    ctx.save();

    // Apply clip path
    ctx.beginPath();
    if (this.clipShape === "circle") {
      const cx = this.x + this.width / 2;
      const cy = this.y + this.height / 2;
      const r = Math.min(this.width, this.height) / 2;
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    } else {
      // Rounded rectangle clip
      if (ctx.roundRect) {
        ctx.roundRect(this.x, this.y, this.width, this.height, this.borderRadius);
      } else {
        ctx.rect(this.x, this.y, this.width, this.height);
      }
    }
    ctx.clip();

    // Draw image
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    ctx.restore();
  }

  /**
   * Checks if a point (in world coordinates) is inside the image bounds.
   */
  isPointInside(px, py) {
    return px >= this.x && px <= this.x + this.width &&
           py >= this.y && py <= this.y + this.height;
  }
}

export default ImageShape;
