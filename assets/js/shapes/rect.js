class RectShape {
  constructor(x, y, width, height, color, filled = false, stroke = "#000", lineWidth = 2) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.filled = filled;
    this.stroke = stroke;
    this.lineWidth = lineWidth;
  }

  draw(ctx, camera) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);

    if (this.filled) {
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lineWidth / camera.zoom;
    ctx.stroke();
  }
}
export default RectShape;
console.log("RectShape loaded");