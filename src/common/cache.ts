export default class Cache {
  static #cache = new Map();

  static set(key: string, value: any) {
    this.#cache.set(key, value);
  }

  static get(key: string) {
    return this.#cache.get(key);
  }

  static delete(key: string) {
    this.#cache.delete(key);
  }
}
