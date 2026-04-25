/**
 * InputManager.js
 * Centralizes DOM events and updates camera/state.
 */
class InputManager {
  #canvas;
  #camera;
  #onUpdate;
  #onInput; // Callback for generic input events (click, hover)
  #dragging = false;
  #lastMouseX = 0;
  #lastMouseY = 0;
  #mouseDownX = 0;
  #mouseDownY = 0;
  #clickThreshold = 5; // Pixels allowed to move to still count as a click

  constructor(canvas, camera, onUpdate, onInput) {
    this.#canvas = canvas;
    this.#camera = camera;
    this.#onUpdate = onUpdate;
    this.#onInput = onInput;

    this.#initEvents();
  }

  #initEvents() {
    this.#canvas.addEventListener("mousedown", this.#onMouseDown.bind(this));
    window.addEventListener("mousemove", this.#onMouseMove.bind(this));
    window.addEventListener("mouseup", this.#onMouseUp.bind(this));
    this.#canvas.addEventListener("wheel", this.#onWheel.bind(this), { passive: false });
    window.addEventListener("resize", this.#onResize.bind(this));
  }

  #onMouseDown(event) {
    this.#dragging = true;
    this.#lastMouseX = event.clientX;
    this.#lastMouseY = event.clientY;
    this.#mouseDownX = event.clientX;
    this.#mouseDownY = event.clientY;
    this.#canvas.classList.add("dragging");
  }

  #onMouseMove(event) {
    const rect = this.#canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Report mouse move for hover effects
    if (this.#onInput) {
      const worldX = (mouseX - this.#camera.x) / this.#camera.zoom;
      const worldY = (mouseY - this.#camera.y) / this.#camera.zoom;
      this.#onInput({ type: "hover", x: worldX, y: worldY });
    }

    if (!this.#dragging) return;

    const dx = event.clientX - this.#lastMouseX;
    const dy = event.clientY - this.#lastMouseY;

    this.#camera.x += dx;
    this.#camera.y += dy;

    this.#lastMouseX = event.clientX;
    this.#lastMouseY = event.clientY;

    if (this.#onUpdate) this.#onUpdate();
  }

  #onMouseUp(event) {
    if (this.#dragging) {
      const dist = Math.sqrt(
        Math.pow(event.clientX - this.#mouseDownX, 2) + 
        Math.pow(event.clientY - this.#mouseDownY, 2)
      );

      if (dist < this.#clickThreshold) {
        const rect = this.#canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        const worldX = (mouseX - this.#camera.x) / this.#camera.zoom;
        const worldY = (mouseY - this.#camera.y) / this.#camera.zoom;

        if (this.#onInput) {
          this.#onInput({ type: "click", x: worldX, y: worldY });
        }
      }
    }

    this.#dragging = false;
    this.#canvas.classList.remove("dragging");
  }

  #onWheel(event) {
    event.preventDefault();

    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    const worldX = (mouseX - this.#camera.x) / this.#camera.zoom;
    const worldY = (mouseY - this.#camera.y) / this.#camera.zoom;

    this.#camera.zoom *= zoomFactor;

    this.#camera.x = mouseX - worldX * this.#camera.zoom;
    this.#camera.y = mouseY - worldY * this.#camera.zoom;

    if (this.#onUpdate) this.#onUpdate();
  }

  #onResize() {
    if (this.#onUpdate) this.#onUpdate({ type: "resize" });
  }
}

export default InputManager;
