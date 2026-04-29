/**
 * ImageLoader.js
 * Utility for preloading and caching images for use on canvas.
 * Images are cached globally so repeated calls with the same URL return instantly.
 */
class ImageLoader {
  /** @type {Map<string, HTMLImageElement>} */
  static #cache = new Map();

  /** @type {Map<string, Promise<HTMLImageElement|null>>} */
  static #pending = new Map();

  /**
   * Loads a single image by URL. Returns the cached version if available.
   * @param {string} url - The image URL to load.
   * @returns {Promise<HTMLImageElement|null>} Resolves to the Image or null on error.
   */
  static load(url) {
    if (this.#cache.has(url)) {
      return Promise.resolve(this.#cache.get(url));
    }

    if (this.#pending.has(url)) {
      return this.#pending.get(url);
    }

    const promise = new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        this.#cache.set(url, img);
        this.#pending.delete(url);
        resolve(img);
      };
      img.onerror = () => {
        console.warn(`ImageLoader: Failed to load image: ${url}`);
        this.#pending.delete(url);
        resolve(null);
      };
      img.src = url;
    });

    this.#pending.set(url, promise);
    return promise;
  }

  /**
   * Loads multiple images in parallel.
   * @param {string[]} urls - Array of image URLs.
   * @returns {Promise<Map<string, HTMLImageElement>>} Map of url -> loaded Image (excludes failures).
   */
  static async loadAll(urls) {
    const uniqueUrls = [...new Set(urls)];
    await Promise.all(uniqueUrls.map(url => this.load(url)));
    return this.#cache;
  }

  /**
   * Gets a cached image by URL (synchronous).
   * @param {string} url - The image URL.
   * @returns {HTMLImageElement|null} The cached image or null if not loaded.
   */
  static get(url) {
    return this.#cache.get(url) || null;
  }

  /**
   * Clears the image cache.
   */
  static clear() {
    this.#cache.clear();
    this.#pending.clear();
  }
}

export default ImageLoader;
