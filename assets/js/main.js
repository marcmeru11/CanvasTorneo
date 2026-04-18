import Camera from "./camera.js";
import Torneo from "./torneo.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const camera = new Camera();
const torneo = new Torneo(ctx, camera);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

function render() {
  torneo.render(canvas);
}

function loadDemo() {
  torneo.addRound(["Equipo A", "Equipo B", "Equipo C", "Equipo D", "E"]);
  torneo.addRound(["Equipo A", "Equipo C","E"]);
  torneo.addRound([ "Equipo A", "E"]);
  torneo.addRound(["Equipo A"]);
}

let dragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

canvas.addEventListener("mousedown", (event) => {
  dragging = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
  canvas.classList.add("dragging");
});

window.addEventListener("mousemove", (event) => {
  if (!dragging) return;

  const dx = event.clientX - lastMouseX;
  const dy = event.clientY - lastMouseY;

  camera.x += dx;
  camera.y += dy;

  lastMouseX = event.clientX;
  lastMouseY = event.clientY;

  render();
});

window.addEventListener("mouseup", () => {
  dragging = false;
  canvas.classList.remove("dragging");
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();

  const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;

  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const worldX = (mouseX - camera.x) / camera.zoom;
  const worldY = (mouseY - camera.y) / camera.zoom;

  camera.zoom *= zoomFactor;
  camera.zoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.zoom));

  camera.x = mouseX - worldX * camera.zoom;
  camera.y = mouseY - worldY * camera.zoom;

  render();
}, { passive: false });

window.addEventListener("resize", resizeCanvas);

loadDemo();
resizeCanvas();