export class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    //removeme логирование подписки на событие
    // console.log(`[on] Subscribed to "${event}"`, this._getCallerInfo());
    if(!this.listeners[event]) this.listeners[event] = new Set();
    this.listeners[event].add(callback);
  }

  emit(event, ...args) {
    // removeme логирование событий
    // const info = { event, args, time: new Date().toISOString() };
    // window.__eventLog = window.__eventLog || [];
    // window.__eventLog.push(info);
    // console.log(`[emit]`, info);
    if(this.listeners[event]) {
      for (const callback of this.listeners[event]) {
        callback(...args);
      }
    }
  }

  // removeme логирование событий
  // _getCallerInfo() {
  //   // removeme Стек вызова: 3-я строка показывает, кто вызвал emit/on
  //   const stack = new Error().stack;
  //   return stack.split('\n')[3]?.trim() || '(unknown)';
  // }

  off(event, callback) {
    if (!this.listeners[event] || !this.listeners[event].has(callback)) return;
    this.listeners[event].delete(callback);
  }

  unsubscribeEveryone() {
    this.listeners = {};
  }
}