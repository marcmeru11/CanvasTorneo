import { describe, it, expect, vi, beforeEach } from 'vitest';
import InputManager from '../../assets/js/core/InputManager.js';
import Camera from '../../assets/js/core/Camera.js';

describe('InputManager', () => {
  let canvas;
  let camera;
  let onUpdate;
  let onInput;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    camera = new Camera();
    onUpdate = vi.fn();
    onInput = vi.fn();
  });

  afterEach(() => {
    document.body.removeChild(canvas);
  });

  it('should initialize and attach events', () => {
    const manager = new InputManager(canvas, camera, onUpdate, onInput);
    expect(manager).toBeDefined();
  });

  it('should handle mouse drag for panning', () => {
    new InputManager(canvas, camera, onUpdate, onInput);
    
    // mousedown
    canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 }));
    expect(canvas.classList.contains('dragging')).toBe(true);

    // mousemove (dragging)
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 120 }));
    expect(camera.x).toBe(50);
    expect(camera.y).toBe(20);
    expect(onUpdate).toHaveBeenCalled();

    // mouseup
    window.dispatchEvent(new MouseEvent('mouseup', { clientX: 150, clientY: 120 }));
    expect(canvas.classList.contains('dragging')).toBe(false);
  });

  it('should handle mouse hover without dragging', () => {
    new InputManager(canvas, camera, onUpdate, onInput);
    
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 50 }));
    expect(onInput).toHaveBeenCalledWith(expect.objectContaining({ type: 'hover' }));
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it('should detect clicks', () => {
    new InputManager(canvas, camera, onUpdate, onInput);
    
    canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 }));
    window.dispatchEvent(new MouseEvent('mouseup', { clientX: 102, clientY: 102 })); // within threshold
    
    expect(onInput).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
  });

  it('should not fire click if dragged beyond threshold', () => {
    new InputManager(canvas, camera, onUpdate, onInput);
    
    canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 }));
    window.dispatchEvent(new MouseEvent('mouseup', { clientX: 200, clientY: 200 })); // beyond threshold
    
    expect(onInput).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
  });

  it('should handle wheel for zooming in and out', () => {
    new InputManager(canvas, camera, onUpdate, onInput);
    const initialZoom = camera.zoom;
    
    // Zoom in
    canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, offsetX: 50, offsetY: 50 }));
    expect(camera.zoom).toBeGreaterThan(initialZoom);
    expect(onUpdate).toHaveBeenCalled();
    
    // Zoom out
    const zoomedIn = camera.zoom;
    canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, offsetX: 50, offsetY: 50 }));
    expect(camera.zoom).toBeLessThan(zoomedIn);
  });

  it('should handle resize event', () => {
    new InputManager(canvas, camera, onUpdate, onInput);
    window.dispatchEvent(new Event('resize'));
    expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({ type: 'resize' }));
  });
});
