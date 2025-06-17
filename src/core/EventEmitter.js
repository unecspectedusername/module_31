export class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = new Set();
    this.listeners[event].add(callback);
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      for (const callback of this.listeners[event]) {
        callback(...args);
      }
    }
  }

  off(event, callback) {
    if (!this.listeners[event] || !this.listeners[event].has(callback)) return;
    this.listeners[event].delete(callback);
  }

  unsubscribeEveryone() {
    this.listeners = {};
  }
}