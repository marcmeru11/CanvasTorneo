class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
    this.minZoom = 0.2;
    this.maxZoom = 4;
  }

  apply(ctx) {
    ctx.setTransform(this.zoom, 0, 0, this.zoom, this.x, this.y);
  }

  reset(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default Camera;
console.log("Camera loaded");