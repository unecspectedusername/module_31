export class AppStorageManager {
  constructor() {
  }

  getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  };

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  addToStorage(key, obj) {
    const storageData = this.getFromStorage(key);
    storageData.push(obj);
    this.setItem(key, storageData);
  };

  clear() {
    localStorage.clear();
  }
}