export class AppStorageManager {
  constructor() {
  }

  getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  };

  setItem(data, key) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  addToStorage(obj, key) {
    const storageData = this.getFromStorage(key);
    storageData.push(obj);
    this.setItem(storageData, key)
  };

  clear() {
    localStorage.clear();
  }
}