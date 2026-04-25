import { describe, it, expect, vi } from 'vitest';
import Renderer from '../../assets/js/core/Renderer.js';
import Camera from '../../assets/js/core/Camera.js';

describe('Renderer', () => {
  it('should initialize and get canvas and ctx', () => {
    const canvas = document.createElement('canvas');
    const camera = new Camera();
    const renderer = new Renderer(canvas, camera);
    
    expect(renderer.canvas).toBe(canvas);
    expect(renderer.ctx).toBeDefined();
  });

  it('should clear with transparent background', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const camera = new Camera();
    const renderer = new Renderer(canvas, camera);
    
    vi.spyOn(renderer.ctx, 'clearRect');
    
    renderer.clear();
    
    expect(renderer.ctx.clearRect).toHaveBeenCalledWith(0, 0, 100, 100);
  });

  it('should clear with custom background color', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const camera = new Camera();
    const renderer = new Renderer(canvas, camera, '#ff0000');
    
    vi.spyOn(renderer.ctx, 'fillRect');
    
    renderer.clear();
    
    expect(renderer.ctx.fillStyle).toBe('#ff0000');
    expect(renderer.ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100);
  });

  it('should prepare context in begin()', () => {
    const canvas = document.createElement('canvas');
    const camera = new Camera();
    const renderer = new Renderer(canvas, camera);
    
    vi.spyOn(renderer, 'clear');
    vi.spyOn(camera, 'apply');
    
    renderer.begin();
    
    expect(renderer.clear).toHaveBeenCalled();
    expect(camera.apply).toHaveBeenCalledWith(renderer.ctx);
  });

  it('should resize canvas', () => {
    const canvas = document.createElement('canvas');
    const camera = new Camera();
    const renderer = new Renderer(canvas, camera);
    
    renderer.resize(800, 600);
    
    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
  });
});
