class LineShape {
  constructor(x1, y1, x2, y2, color = "#000", lineWidth = 2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.stroke = color;
    this.lineWidth = lineWidth;
  }

  draw(ctx, camera) {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lineWidth / camera.zoom;
    ctx.stroke();
  }
}

export default LineShape;
console.log("LineShape loaded");